# Generated by Django 2.1.7 on 2019-05-24 14:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mainsite', '0016_auto_20190524_0654'),
    ]

    operations = [
        migrations.AddField(
            model_name='cart',
            name='last_modified',
            field=models.DateTimeField(auto_now=True),
        ),
    ]