# Generated by Django 2.1.7 on 2019-05-23 14:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mainsite', '0012_auto_20181121_0729'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='color',
            field=models.CharField(blank=True, choices=[('red', 'red'), ('green', 'green'), ('light-green', 'light-green'), ('blue', 'blue'), ('light-blue', 'light-blue'), ('brown', 'brown'), ('tan', 'tan'), ('white', 'white'), ('cream', 'cream'), ('orange', 'orange'), ('purple', 'purple'), ('mixed', 'mixed')], max_length=40),
        ),
    ]
