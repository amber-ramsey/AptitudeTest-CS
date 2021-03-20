import os

class Config(object):
	DEBUG = False
	TESTING = False
	SECRET_KEY = '4cdf78040bcc64723c0ace4ab7876518f6ef8de4cd2163cb'
	SQLALCHEMY_TRACK_MODIFICATIONS = False

class ProductionConfig(Config):
	SQLALCHEMY_DATABASE_URI = os.environ['DATABASE_URL']

class DevelopmentConfig(Config):
	SQLALCHEMY_DATABASE_URI = 'sqlite:///aptitude.db'
	DEVELOPMENT = True
	DEBUG = True

class TestingConfig(Config):
	TESTING = True