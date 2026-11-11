
from django.contrib import admin
from django.urls import path
from apps.users.views import allUser

urlpatterns = [
    path('user/', allUser, name='allUser'),
]