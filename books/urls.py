from django.urls import path
from . import views

urlpatterns = [
    path('book/list/', views.BookListCreate.as_view() ),
    path('book/create/', views.BookCreate.as_view() ),
    path('book/delete/<int:pk>', views.BookDelete.as_view() ),
    path('book/edit/<int:pk>', views.BookRetrieveUpdate.as_view() ),
]