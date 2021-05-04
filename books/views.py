from .models import Book
from .serializers import BookSerializer
from rest_framework import generics, status
from rest_framework.response import Response

class BookListCreate(generics.ListCreateAPIView):
    serializer_class = BookSerializer

    def get_queryset(self):
        queryset = Book.objects.all()
        ISBN = self.request.query_params.get('ISBN')
        name = self.request.query_params.get('name')
        authors = self.request.query_params.get('authors')
        short_annotation = self.request.query_params.get('short_annotation')

        if ISBN:
            try:
                queryset = Book.objects.filter(ISBN__contains=ISBN)
            except Book.DoesNotExist:
                queryset = None
        
        if name:
            try:
                queryset = Book.objects.filter(name__contains=name)
            except Book.DoesNotExist:
                queryset = None

        if authors:
            try:
                queryset = Book.objects.filter(authors__contains=authors)
            except Book.DoesNotExist:
                queryset = None

        if short_annotation:
            try:
                queryset = Book.objects.filter(short_annotation__contains=short_annotation)
            except Book.DoesNotExist:
                queryset = None
            
        return queryset

class BookCreate(generics.CreateAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

class BookDelete(generics.DestroyAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

class BookRetrieveUpdate(generics.RetrieveUpdateAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)
