# Generated by Django 3.2 on 2021-05-03 15:29

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Book',
            fields=[
                ('ISBN', models.IntegerField(primary_key=True, serialize=False)),
                ('name', models.CharField(default='', max_length=100)),
                ('authors', models.TextField()),
                ('short_annotation', models.CharField(blank=True, max_length=150)),
            ],
        ),
    ]
