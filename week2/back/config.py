import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY', 'fallback-secret-key')  # Required for sessions
    DEBUG = os.getenv('FLASK_DEBUG', 'False') == 'True'  # Disable in production!

    # PostgreSQL Database Configuration
    DB_USER = os.getenv('POSTGRES_USER', 'postgres')
    DB_PASSWORD = os.getenv('POSTGRES_PASSWORD', '')
    DB_HOST = os.getenv('POSTGRES_HOST', 'localhost')
    DB_PORT = os.getenv('POSTGRES_PORT', '5432')
    DB_NAME = os.getenv('POSTGRES_DB', 'flask_db')

    # SQLAlchemy (ORM) Configuration
    SQLALCHEMY_DATABASE_URI = f"postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
    SQLALCHEMY_TRACK_MODIFICATIONS = False  # Disable overhead

    # Optional Settings
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY', 'jwt-fallback-key')  # For auth
    CORS_ORIGINS = os.getenv('CORS_ORIGINS', '').split(',')  # For frontend access


class DevelopmentConfig(Config):
    DEBUG = True
    # Override DB for local development if needed
    SQLALCHEMY_DATABASE_URI = "postgresql://postgres:@localhost:5432/flask_dev"


class ProductionConfig(Config):
    DEBUG = False
    # Example: Heroku-style database URL
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL')  # Often provided by cloud hosts


class TestingConfig(Config):
    TESTING = True
    SQLALCHEMY_DATABASE_URI = "postgresql://postgres:@localhost:5432/flask_test"
    WTF_CSRF_ENABLED = False  # Disable CSRF for testing


# Dictionary to map config names to classes
config_dict = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,
    'testing': TestingConfig
}











# Feature	DevelopmentConfig	ProductionConfig
# Debug Mode	Enabled (DEBUG = True)	Disabled (DEBUG = False)
# Database	Local PostgreSQL (localhost)	Cloud PostgreSQL (e.g., AWS RDS)
# Error Pages	Detailed stack traces	Generic "500 Error" page
# Auto-Reload	Yes (code changes refresh app)	No (requires manual restart)
# Security	Lenient (for convenience)	Strict (env vars, HTTPS, etc.)