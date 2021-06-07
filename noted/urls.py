from django.contrib import admin
from django.urls import path, include
from django.conf.urls import url
from django.views.generic import RedirectView, TemplateView
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken import views
from dj_rest_auth.registration.views import (
    SocialAccountListView, SocialAccountDisconnectView
)
from allauth.socialaccount.providers.google import views as google_view
from .api.viewsets import SearchQueryView
from notes.api.viewsets import NoteViewset
from notebooks.api.viewsets import NoteBookViewset
from userauth.api.viewsets import UserViewSet
from userauth.api.social_auth import GoogleLogin
from profiles.api.viewsets import ProfileViewSet

router = DefaultRouter()
router.register(r'notes', NoteViewset, basename='note')
router.register(r'notebooks', NoteBookViewset, basename='notebook')
router.register(r'users', UserViewSet, basename='user')
router.register(r'profiles', ProfileViewSet, basename='profile')

urlpatterns = [
    path('password-reset/confirm/<uidb64>/<token>/',
        TemplateView.as_view(template_name="password_reset_confirm.html"),
        name='password_reset_confirm'),
    path('search/', SearchQueryView.as_view(), name='search_notes'),
    path('admin/', admin.site.urls),
    path('api-token-auth/', views.obtain_auth_token),
    path('dj-rest-auth/', include('dj_rest_auth.urls')),
    path('dj-rest-auth/registration/', include('dj_rest_auth.registration.urls')),
    path('dj-rest-auth/google/', GoogleLogin.as_view(), name='google_login'),
    path(
        'socialaccounts/',
        SocialAccountListView.as_view(),
        name='social_account_list'
    ),
    path('api-auth/', include('rest_framework.urls')),
    path('health/', include('health_check.urls')),
]

# path('accounts/', include('allauth.urls')),
# path('', include(router.urls)),

