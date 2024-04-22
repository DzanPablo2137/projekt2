from django.contrib import admin
from .models import LoginToken, User, Note
admin.site.register(User)
admin.site.register(Note)
admin.site.register(LoginToken)
# Register your models here.
