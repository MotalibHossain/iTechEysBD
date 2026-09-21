from django.shortcuts import render
from django.http import JsonResponse

# Create your views here.
def allUser(request):
    return JsonResponse({'message': 'All User View'})