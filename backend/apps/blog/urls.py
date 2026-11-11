
from django.contrib import admin
from django.urls import path
from apps.blog.views import AllBlogPost, singleBlogPost, categoryBlogPost

urlpatterns = [
    path('blog/', AllBlogPost, name='allBlogPost'),
    path('blog/<int:id>/', singleBlogPost, name='singleBlogPost'),
    
    # category Wize all blog posts by category
    path('blog/category/<int:category_id>/', categoryBlogPost, name='categoryBlogPost'),
]