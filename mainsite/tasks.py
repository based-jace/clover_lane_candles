import time
from datetime import datetime
from celery.task import task
from .helpers import clean_cart
from .models import Cart
from django.conf import settings

from celery import task 
from celery import shared_task 

@task
def check_cart_expiration():
    for cart in Cart.objects.all():
        if int(cart.last_modified.timestamp()) + settings.CART_EXPIRATION_TIME < int(datetime.today().timestamp()):
            clean_cart(cart)