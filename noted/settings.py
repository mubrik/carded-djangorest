"""
Django settings for noted project.

Generated by 'django-admin startproject' using Django 3.2.

For more information on this file, see
https://docs.djangoproject.com/en/3.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.2/ref/settings/
"""

from pathlib import Path
import os
from .settings_scripts import get_linux_ec2_private_ip

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent
STATIC_ROOT = Path.joinpath(BASE_DIR, 'staticfiles')
STATIC_URL = '/static/'
WEBPACK_DEV_PATH = Path.joinpath(BASE_DIR, 'frontend/static/frontend/assets/js/dev/webpack-stats.json')
WEBPACK_PRD_PATH = Path.joinpath(BASE_DIR, 'frontend/static/frontend/assets/js/prd/webpack-stats.json')
""" STATICFILES_STORAGE = 'django.contrib.staticfiles.storage.ManifestStaticFilesStorage' """

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.environ.get('CARDED_SECRET')
DEBUG = False

# SECURITY WARNING: don't run with debug turned on in production!
if 'RDS_DB_NAME' in os.environ:
    DEBUG = False
    SECURE_SSL_REDIRECT = True
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql_psycopg2',
            'NAME': os.environ['RDS_DB_NAME'],
            'USER': os.environ['RDS_USERNAME'],
            'PASSWORD': os.environ['RDS_PASSWORD'],
            'HOST': os.environ['RDS_HOSTNAME'],
            'PORT': os.environ['RDS_PORT'],
        }
    }
else:
    DEBUG = True
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql_psycopg2',
            'NAME': 'django_rest',
            'USER': 'djangoadmin',
            'PASSWORD': os.environ['DB_PASSWORD'],
            'HOST': 'localhost',
            'PORT': '5432',
        }
    }

print(DEBUG)
ALLOWED_HOSTS = [
    'carded-django-react-dev.eba-pakkkjup.eu-west-2.elasticbeanstalk.com',
    'carded.mubrik.com',
    '127.0.0.1',
]

# User model to be used
AUTH_USER_MODEL = 'userauth.User'

# Application definition

INSTALLED_APPS = [
    'userauth.apps.UserauthConfig',
    'profiles.apps.ProfilesConfig',
    'notes.apps.NotesConfig',
    'notebooks.apps.NotebooksConfig',
    'frontend.apps.FrontendConfig',
    'allauth',
    'allauth.account',
    'allauth.socialaccount',
    'allauth.socialaccount.providers.google',
    'rest_framework',
    'rest_framework.authtoken',
    'dj_rest_auth',
    'dj_rest_auth.registration',
    'health_check',
    'health_check.db',
    'django_extensions',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.sites',
    'webpack_loader',
]

WEBPACK_LOADER = {
    'DEFAULT': {
        'STATS_FILE': WEBPACK_DEV_PATH if DEBUG else WEBPACK_PRD_PATH
    },
}
# WEBPACK_DEV_PATH if DEBUG else WEBPACK_PRD_PATH

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'noted.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'noted.wsgi.application'


# Password validation
# https://docs.djangoproject.com/en/3.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/3.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True

# Default primary key field type
# https://docs.djangoproject.com/en/3.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.TokenAuthentication',
    ],
}

# install boto3 and django-storages
# storing media files
DEFAULT_FILE_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'
AWS_ACCESS_KEY_ID = os.environ['AWS_ACCESS_KEY_ID']
AWS_SECRET_ACCESS_KEY = os.environ['AWS_SECRET_ACCESS_KEY']
AWS_STORAGE_BUCKET_NAME = 'carded-django'
AWS_S3_REGION_NAME = 'eu-west-2'
AWS_S3_OBJECT_PARAMETERS = {
    'CacheControl': 'max-age=86400',
}

# dj auth
OLD_PASSWORD_FIELD_ENABLED = True

""" 'rest_framework.authentication.SessionAuthentication',
    'DEFAULT_PAGINATION_CLASS': 'notes.api.pagination.CustomPagination',
    'PAGE_SIZE': 18
"""

PASSWORD_HASHERS = [
    'django.contrib.auth.hashers.Argon2PasswordHasher',
    'django.contrib.auth.hashers.PBKDF2PasswordHasher',
    'django.contrib.auth.hashers.PBKDF2SHA1PasswordHasher',
    'django.contrib.auth.hashers.BCryptSHA256PasswordHasher',
]

# site for django.contrib.sites app
""" add django.contrib.sites to app """
SITE_ID = 1

# django all auth social

AUTHENTICATION_BACKENDS = [
    # Needed to login by username in Django admin, regardless of `allauth`
    'django.contrib.auth.backends.ModelBackend',

    # `allauth` specific authentication methods, such as login by e-mail
    'allauth.account.auth_backends.AuthenticationBackend',
]

SOCIALACCOUNT_PROVIDERS = {
    'google': {
        # For each OAuth based provider, either add a ``SocialApp``
        # (``socialaccount`` app) containing the required client
        # credentials, or list them here:
        'APP': {
            'client_id': os.environ.get('CARD_GID'),
            'secret': os.environ.get('CARD_GSECRET'),
            'key': ''
        },
        'SCOPE': [
            'profile',
            'email',
        ],
        'AUTH_PARAMS': {
            'access_type': 'online',
        }
    },
}

# adds aws elb private ip to allowed hosts
private_ip = get_linux_ec2_private_ip() if not DEBUG else None
if private_ip:
    ALLOWED_HOSTS.append(private_ip)


# basic logging with file rotation
if not DEBUG:
    log_level = os.getenv('LOG_LEVEL', 'INFO')
    handlers = dict(file={'class': 'logging.handlers.TimedRotatingFileHandler',
                          'filename': os.getenv('LOG_FILE_PATH'),
                          'when': 'midnight',
                          'interval': 1,
                          'backupCount': 1,
                          'encoding': 'utf-8'})
    loggers = dict(django=dict(level=log_level, handlers=['file']),
                   myapp=dict(level=log_level, handlers=['file']))
    LOGGING = dict(version=1,
                   disable_existing_loggers=False,
                   handlers=handlers,
                   loggers=loggers)

# sendgrid config
EMAIL_BACKEND = "sendgrid_backend.SendgridBackend"
SENDGRID_API_KEY = os.environ["SG_API_KEY"]
SENDGRID_ECHO_TO_STDOUT = True