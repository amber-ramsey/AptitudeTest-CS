from datetime import datetime
from csaptitude import db, login_manager
from flask_login import UserMixin

@login_manager.user_loader
def load_user(user_id):
	return User.query.get(int(user_id))

class User(db.Model, UserMixin):
	__tablename__ = 'users'
	id = db.Column(db.Integer, primary_key=True)
	student_id = db.Column(db.Integer, unique=True, nullable=False)
	email = db.Column(db.String(120), unique=True, nullable=False)
	password = db.Column(db.String(60), nullable=False)
	is_admin = db.Column(db.Boolean, nullable=False, default=False)
	created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
	test_results = db.relationship('TestResult', backref='test_taker', lazy=True)

	def __repr__(self):
		return f"User('{self.student_id}', '{self.email}', '{self.created_at}')"

class TestResult(db.Model):
	__tablename__ = 'test_results'
	id = db.Column(db.Integer, primary_key=True)
	user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
	elapsed_time_ms = db.Column(db.Integer, nullable=False)
	platform = db.Column(db.String(32), nullable=True)
	browser = db.Column(db.String(32), nullable=True)
	browser_version = db.Column(db.String(8), nullable=True)
	language = db.Column(db.String(32), nullable=True)
	created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

	responses = db.relationship('QuestionResponse', backref='test_results', lazy=True)

	def __repr__(self):
		return f"TestResult('test {self.id}', 'user={self.test_taker}' '{self.created_at}', '{len(self.responses)}')"


class QuestionResponse(db.Model):
	__tablename__ = 'question_responses'
	id = db.Column(db.Integer, primary_key=True)
	test_result_id = db.Column(db.Integer, db.ForeignKey('test_results.id'), nullable=False)
	is_example = db.Column(db.Boolean, nullable=False)
	question_num = db.Column(db.Integer, nullable=False)
	response = db.Column(db.Integer, nullable=False)
	correct = db.Column(db.Boolean, nullable=False)
	elapsed_time_ms = db.Column(db.Integer, nullable=False)

	def __repr__(self):
		return f"QuestionResponse('test result {self.test_result_id}', '{self.response}', '{self.correct}', '{self.elapsed_time_ms}')"
