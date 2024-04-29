from django.contrib.sessions.models import Session
from django.utils import timezone
from django.shortcuts import render

from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import NoteSerializer, UserSerializer
from .models import Note, User, LoginToken
import uuid


class NoteView(generics.ListAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer


class UserView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class FindLogin(APIView):
    def post(self, request):
        user_login = request.data.get('login')
        user_passwd = request.data.get('passwd')
        try:
            user = User.objects.get(username=user_login, password=user_passwd)
        except User.DoesNotExist:
            return Response({'error': 'Nieprawidłowy login lub hasło'}, status=200)

        try:
            login_token = LoginToken.objects.get(user=user)
            token = login_token.token
        except LoginToken.DoesNotExist:
            token = uuid.uuid4().hex
            LoginToken.objects.create(
                user=user,
                token=token,
            )
            

        request.session['user_id'] = user.id

        return Response({'message': 'Token utworzony pomyślnie', 'token': token})


class CreateNoteView(APIView):
    def post(self, request):
        note_text = request.data.get('note_text')
        token = request.data.get('token')
        
  
        user_id = request.session.get('user_id')
        if not user_id:
            return Response({'error': 'Użytkownik nie jest zalogowany'}, status=status.HTTP_401_UNAUTHORIZED)

        try:
            user = User.objects.get(id=user_id)
            Note.objects.create(
                note_text=note_text,
                pub_date=timezone.now(),
                owner=user
            )
            return Response({'message': 'Notatka utworzona pomyślnie'}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
