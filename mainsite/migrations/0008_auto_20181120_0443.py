# Generated by Django 2.1 on 2018-11-20 10:43

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('mainsite', '0007_product_is_main'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='color_id',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='mainsite.Color', verbose_name='Color'),
        ),
        migrations.AlterField(
            model_name='product',
            name='scent_id',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='mainsite.Scent', verbose_name='Scent'),
        ),
        migrations.AlterField(
            model_name='product',
            name='type_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='mainsite.Product_Type', verbose_name='Product Type'),
        ),
    ]