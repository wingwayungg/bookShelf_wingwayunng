from django.shortcuts import render


def index(request, ISBN=None):
    return render(request, 'frontend/index.html')
