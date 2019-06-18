# Generated by Django 2.0.4 on 2018-11-16 02:19

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('mainsite', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='product',
            name='color',
        ),
        migrations.RemoveField(
            model_name='product',
            name='scent',
        ),
        migrations.AddField(
            model_name='color',
            name='product_id',
            field=models.ForeignKey(default=0, on_delete=django.db.models.deletion.CASCADE, to='mainsite.Product'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='scent',
            name='product_id',
            field=models.ForeignKey(default=0, on_delete=django.db.models.deletion.CASCADE, to='mainsite.Product'),
            preserve_default=False,
        ),
    ]
