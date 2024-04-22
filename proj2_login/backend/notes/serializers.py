from rest_framework import serializers
from .models import Note, User, LoginToken



class LoginSerializer(serializers.ModelSerializer):

        class Meta:
            model = LoginToken
            fields = ("pk", "user", "token")

class NoteSerializer(serializers.ModelSerializer):

    class Meta:
        model = Note
        fields = ("pk", "note_text", "pub_date", "owner")

class UserSerializer(serializers.ModelSerializer):

        class Meta:
            model = User
            fields = ("pk", "username", "password")