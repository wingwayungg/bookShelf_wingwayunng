from django.db import models

class Book(models.Model):
    ISBN = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=100, default='')
    authors = models.TextField()
    short_annotation = models.CharField(max_length=150, blank=True)