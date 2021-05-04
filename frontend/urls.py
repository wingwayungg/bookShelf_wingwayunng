from django.urls import path
from . import views


urlpatterns = [
    path('list', views.index ),
    path('book', views.index ),
    path('book/<int:ISBN>', views.index ),
]