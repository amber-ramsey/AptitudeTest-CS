import re
from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, PasswordField, SubmitField, \
	BooleanField, HiddenField
from wtforms.validators import DataRequired, Length, NumberRange, Email, EqualTo, ValidationError
from csaptitude.models import User


class TestRegistrationForm(FlaskForm):
	name = StringField('Name', validators=[DataRequired()])
	studentId = IntegerField('Student ID Number',
		validators=[DataRequired(), NumberRange(min=10000, max=400000, message="Not a valid Student ID Number")])
	email = StringField('Email', validators=[DataRequired(), Email()])
	password = PasswordField('Password',
		validators=[DataRequired(), Length(min=4)])
	password_confirm = PasswordField('Confirm Password',
		validators=[DataRequired(), Length(min=4), EqualTo('password')])

	submit = SubmitField('Register for Test')

	def validate_studentId(self, studentId):
		user = User.query.filter_by(student_id=studentId.data).first()
		if user:
			raise ValidationError('You have already created an account with this Student ID.')

	def validate_email(self, email):

		if not re.search(r'@(csustudent\.net|csuniv\.edu)$', email.data):
			raise ValidationError('Please use your student email address.')
			return

		user = User.query.filter_by(email=email.data).first()
		if user:
			raise ValidationError('You have already created an account with this email address.')
			return

class TestLoginForm(FlaskForm):
	studentId = IntegerField('Student ID Number',
		validators=[DataRequired(), NumberRange(min=1000, max=2000000, message="Your Student ID is incorrect")])
	password = PasswordField('Password',
		validators=[DataRequired(), Length(min=4)])
	remember = BooleanField('Remember Me')
	submit = SubmitField('Login to Take Test')

class TestResultsForm(FlaskForm):
	answers = HiddenField(DataRequired())
	submit = SubmitField('Finish Test and View Your Score')
	elapsedTime = HiddenField(validators=[DataRequired()])
	questionTimes = HiddenField(validators=[DataRequired()])

	def validate_answers(self, answers):
		answers = answers.data.split(',')
		if len(answers) != 34:
			raise ValidationError(f'{len(answers)} answers submitted. Expected 34.')
		else:
			for ans in answers:
				if ans not in ['', '0', '1', '2', '3', '4', '5']:
					raise ValidationError(f'{ans} is an invalid response.')

	def validate_elapsedTime(self, elapsedTime):
		try:
			duration = (int(elapsedTime.data)) / 1000
		except ValueError:
			raise ValidationError(f'"{elapsedTime.data}" is an invalid number of milliseconds for the elapsed time.')
			return

		if (duration < 30 or duration > 1800):
			raise ValidationError('You completed the test too quickly or too slowly.')

