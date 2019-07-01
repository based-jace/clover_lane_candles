from __future__ import absolute_import, unicode_literals

from django.core.cache import caches
from .models import Cart, Cart_Item
from datetime import datetime
import time
import sys, signal
from django.conf import settings

def inc_pc_time(): # Increase Product Cache Timeout
    if "products" in caches["default"]:
        caches["default"].touch("products",900)

def clean_cart(cart):
    cart.item_list.all().delete()
    cart.delete()
    #Cart_Item.objects.all().delete()

