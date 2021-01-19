class Config(object):
    DEBUG = False
    TESTING = False
    SECRET_KEY = '4cdf78040bcc64723c0ace4ab7876518f6ef8de4cd2163cb'
    SQLALCHEMY_DATABASE_URI = 'sqlite:///aptitude.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False

class ProductionConfig(Config):
    # TODO: Update this
    SQLALCHEMY_DATABASE_URI = 'postgresql://postgres:123456@localhost/aptitude'

class DevelopmentConfig(Config):
    DEBUG = True

class TestingConfig(Config):
    TESTING = True