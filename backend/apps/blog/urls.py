
from django.contrib import admin
from django.urls import path
from apps.blog.views import AllBlogPost, singleBlogPost

urlpatterns = [
    path('blog/', AllBlogPost, name='allBlogPost'),
    path('blog/<int:id>/', singleBlogPost, name='singleBlogPost'),
]