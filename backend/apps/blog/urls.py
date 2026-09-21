
from django.contrib import admin
from django.urls import path
from apps.blog.views import AllBlogPost

urlpatterns = [
    path('blog/', AllBlogPost, name='allBlogPost'),
]