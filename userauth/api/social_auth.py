from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.github.views import GitHubOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from dj_rest_auth.registration.views import SocialLoginView
from django.conf import settings

CALLBACK_GLE_ONLINE = 'https://carded.mubrik.com/accounts/google/login/callback/'
CALLBACK_GIT_ONLINE = 'https://carded.mubrik.com/accounts/github/login/callback/'
class GoogleLogin(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter
    callback_url = 'http://localhost:8000/accounts/google/login/callback/' if settings.DEBUG else CALLBACK_GLE_ONLINE
    client_class = OAuth2Client

class GithubLogin(SocialLoginView):
    adapter_class = GitHubOAuth2Adapter
    callback_url = 'http://localhost:8000/accounts/github/login/callback/' if settings.DEBUG else CALLBACK_GIT_ONLINE
    client_class = OAuth2Client