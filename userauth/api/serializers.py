from rest_framework import serializers
from userauth.models import User
from profiles.models import BaseProfile

class SubProfileSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = BaseProfile
        fields = ['birth_date', 'profile_picture']

class UserSerializer(serializers.ModelSerializer):

    user_profile = SubProfileSerializer(read_only=True)
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'created_notes', 'created_notebooks', 'user_profile']


class RegisterUserSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = User
        fields = ['id', 'username', 'email','password']