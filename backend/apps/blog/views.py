from django.http import JsonResponse


def AllBlogPost(request):
    # Sample data for demonstration purposes
    blog_posts = [
        {
            'id': 1,
            'title': 'First Blog Post',
            'content': 'This is the content of the first blog post.',
            'author': 'John Doe',
            'created_at': '2024-06-01T10:00:00Z',
        },
    ]

    return JsonResponse(blog_posts, safe=False)

def singleBlogPost(request, id):
    # Sample data for demonstration purposes
    blog_post = {
        'id': id,
        'title': 'Single Blog Post',
        'content': 'This is the content of the single blog post.',
        'author': 'John Doe',
        'created_at': '2024-06-01T10:00:00Z',
    }

    return JsonResponse(blog_post, safe=False)

