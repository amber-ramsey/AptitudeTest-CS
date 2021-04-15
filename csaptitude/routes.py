from flask import render_template, url_for, flash, redirect, request, make_response, send_from_directory
from os import path
from csaptitude import app, db, bcrypt
from csaptitude.forms import TestResultsForm, TestRegistrationForm, TestLoginForm
from csaptitude.models import User, TestResult, QuestionResponse
from flask_login import login_user, current_user, logout_user, login_required
from sqlalchemy import desc

# Indexes of correct answers to test questions
correctAnswers = [2, 0, 5, 1, 4, 5, 2, 2, 1, 3, 4, 0, 4, 2, 5, 3, 0, 2, 1, 5, 0, 1, 5, 4, 0, 1, 5, 2, 1, 3, 4, 2, 1, 4]

@app.route('/')
def home():
	return render_template('home.html')

@app.route('/about')
def about():
	return render_template('about.html', title='About the Test')

@app.route("/register", methods=['GET', 'POST'])
def register():
	if current_user.is_authenticated:
		return redirect(url_for('home'))
	form = TestRegistrationForm();
	if form.validate_on_submit():
		hashed_password = bcrypt.generate_password_hash(form.password.data).decode('utf-8')
		user = User(student_id=form.studentId.data, email=form.email.data, password=hashed_password)
		db.session.add(user)
		db.session.commit()
		flash('Your account has been created!', 'success')
		login_user(user)

		next = request.args.get('next')

		return redirect(next or url_for('test'))

	return render_template('register.html', title='Register', form=form)

@app.route("/login", methods=['GET', 'POST'])
def login():
	if current_user.is_authenticated:
		return redirect(url_for('test'))
	form = TestLoginForm()
	if form.validate_on_submit():
		user = User.query.filter_by(student_id=form.studentId.data).first()
		if user and bcrypt.check_password_hash(user.password, form.password.data):
			login_user(user, remember=form.remember.data)
			next_page = request.args.get('next')
			return redirect(next_page) if next_page else redirect(url_for('test'))
		else:
			flash('Login Unsuccessful. Please check the Student ID and password', 'danger')
	return render_template('login.html', title='Login', form=form)


@app.route("/logout")
def logout():
	logout_user()
	return redirect(url_for('home'))

@app.route('/test', methods = ['GET', 'POST'])
@login_required
def test():
	form = TestResultsForm()
	if form.validate_on_submit():
		#print (request.user_agent.version)
		score = 0
		answers = form.answers.data.split(',')
		elapsedTimes = form.questionTimes.data.split(',')
		test = TestResult(
			user_id=current_user.id,
			elapsed_time_ms=int(form.elapsedTime.data),
			platform=request.user_agent.platform,
			browser=request.user_agent.browser,
			browser_version=request.user_agent.version,
			language=request.user_agent.language)
		db.session.add(test)
		db.session.flush()

		for index, ans in enumerate(answers):
			if not not ans:
				correct = correctAnswers[index]==int(ans)
				quest = QuestionResponse(
					test_result_id=test.id,
					is_example=index < 3,
					question_num=index - 3,
					response=int(ans),
					correct=correct,
					elapsed_time_ms = (0 if elapsedTimes[index] == "NaN" else int(elapsedTimes[index])))
				db.session.add(quest)
				if correct and index >= 3:
					score += 1

		db.session.commit()

		flash(f'Test Submitted! Your score is {score}', 'success')

		return redirect(url_for('test_results'))

	return render_template('test.html', form=form)

@app.route("/account")
@login_required
def account():
	testResult = TestResult.query.filter_by(user_id=current_user.id).order_by(desc(TestResult.id)).first()
	score = (QuestionResponse.query
		.filter_by(test_result_id=testResult.id)
		.filter_by(is_example=False)
		.filter_by(correct=True)
		.order_by('question_num')
		.count()
		if testResult else None)
	date = testResult.created_at.strftime("%B %d, %Y at %H:%M UTC") if testResult else None
	return render_template('account.html', title='Account', score=score, date=date)

@app.route("/results")
@login_required
def test_results():
	testResult = TestResult.query.filter_by(user_id=current_user.id).order_by(desc(TestResult.id)).first()
	score = None
	answered = None
	correct = None
	if testResult:
		answered = (QuestionResponse.query
			.filter_by(test_result_id=testResult.id)
			.filter_by(is_example=False)
			.order_by('question_num').all())
		answered = [a.question_num + 1 for a in answered]
		correct = (QuestionResponse.query
			.filter_by(test_result_id=testResult.id)
			.filter_by(is_example=False)
			.filter_by(correct=True)
			.order_by('question_num').all())
		score = len(correct)
		correct = [a.question_num + 1 for a in correct]
		correct = [c in correct for c in list(range(1, 32))]  #the second numbers were 27
		[c in correct for c in list(range(1, 32))]
	return render_template('results.html', title="Test Results", answered=answered,
		correct=correct, score=score)


@app.route("/data/byquest-wide")
@login_required
def by_quest_wide():
	if not current_user.is_admin:
		flash('You do not have access to this information.', 'danger')
		next_page = request.args.get('next')
		return redirect(next_page) if next_page else redirect(url_for('account'))

	query = (db.session.query(User,TestResult,QuestionResponse)
		.filter(User.id == TestResult.user_id)
		.filter(TestResult.id == QuestionResponse.test_result_id)
		.filter(QuestionResponse.is_example == False)
		.order_by(User.id, TestResult.id, QuestionResponse.question_num))
	#print(query.statement.compile())
	query = query.all()

	data = 'id,email,test,date,elapsed_time_ms,q.' + ',q.'.join(str(e) for e in range(1,27))
	prev_test = None
	next_quest = 0
	for (user, test, quest) in query:
		if (test.id != prev_test):
			prev_test = test.id
			next_quest = 0
			data += '\n'
			data +=f'{user.student_id},{user.email},{test.id},{test.created_at},{test.elapsed_time_ms}'
		for num in range (next_quest, quest.question_num):
			data += ','
		next_quest = quest.question_num + 1
		data += f',{quest.correct + 0}'

		#print (f'{user.student_id}, {test.id}, {quest.question_num}, {quest.correct}')

	response = make_response(data)
	response.headers["Content-Disposition"] = "attachment; filename=export.csv"
	response.headers["Content-type"] = "text/csv"
	return response


@app.route('/favicon.ico')
def favicon():
	return send_from_directory(path.join(app.root_path, 'static'),
		'favicon.ico', mimetype='image/vnd.microsoft.icon')