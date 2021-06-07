from django.db.models.query import QuerySet
from rest_framework import serializers
from rest_framework.serializers import HyperlinkedRelatedField
from notes.models import Note
from notebooks.models import NoteBook

class CustomNoteBooksSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = NoteBook
        fields = ['id','name', 'created']

class NoteSerializer(serializers.HyperlinkedModelSerializer):
    created_by = serializers.ReadOnlyField(source='created_by.username')
    created = serializers.DateTimeField(format='%c', read_only=True)

    class Meta:
        model = Note
        fields = ['url','id','title', 'content', 'notebook', 'created_by', 'created']

    def __init__(self, *args, **kwargs):
        super(NoteSerializer, self).__init__(*args, **kwargs)
        user = self.context['request'].user
        if user and not user.is_anonymous:
            self.fields['notebook'] = serializers.PrimaryKeyRelatedField(many=True, queryset=user.created_notebooks.all(), required=False)