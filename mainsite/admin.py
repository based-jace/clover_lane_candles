from django.contrib import admin
from mainsite.models import *

# Register your models here.
class CandleAdmin(admin.ModelAdmin):
    pass

admin.site.register((Product, Product_Type, Scent, Cart_Item, Cart))