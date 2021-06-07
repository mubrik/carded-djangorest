from rest_framework import serializers
from profiles.models import BaseProfile

class ProfileSerializer(serializers.HyperlinkedModelSerializer):

    user = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = BaseProfile
        fields = ['user', 'birth_date', 'profile_picture']
