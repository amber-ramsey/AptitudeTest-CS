from flask import Flask

from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_login import LoginManager
import sqlite3


app = Flask(__name__)

# Make the key an environment variable instead.
#app.config['SECRET_KEY'] = '4cdf78040bcc64723c0ace4ab7876518f6ef8de4cd2163cb'
#app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///aptitude.db'
#app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config.from_object('config.DevelopmentConfig')

db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
login_manager = LoginManager(app)
login_manager.login_view = 'login'
login_manager.login_message_category = 'info'

from csaptitude import routes

@app.cli.command('initdb')
def initdb_command():
	"""Initializes the database."""
	db = sqlite3.connect('csaptitude/aptitude.db')
	with app.open_resource('schema.sql', mode='r') as f:
		db.cursor().executescript(f.read())
	db.commit()
	print('Initialized the database.')