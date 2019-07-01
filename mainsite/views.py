from django.shortcuts import render
from .models import Product
from django.views.generic.base import TemplateView
from clover_lane_candles.settings import MEDIA_URL
from django.core.cache import caches
from django.views.decorators.csrf import ensure_csrf_cookie
from django.utils.decorators import method_decorator
# This is the django module which allows the Django object to become JSON
from django.core import serializers

from django.http import JsonResponse

from .helpers import inc_pc_time, clean_cart

from .models import Cart, Cart_Item

clc_cache = caches["default"]

def index(request):
    inc_pc_time()
    print(request.META.get('HTTP_REFERER'))
    return render(request, 'mainsite/index.html')

def about(request):
	inc_pc_time()
	return render(request, 'mainsite/about.html')

class HomepageView(TemplateView):
    @method_decorator(ensure_csrf_cookie)
    def get(self, request, **kwargs):
        return render(request, 'main/index.html', context=None)

@method_decorator(ensure_csrf_cookie, name="dispatch")
class Products(TemplateView):
    inc_pc_time()
    template_name = "mainsite/products.html"

    def get_context_data(self, **kwargs):
        prod_list = Product.objects.all()
        context = super().get_context_data(**kwargs)

        context["product_list"] = sorted(prod_list, key=lambda p: p.type_id.name)
        context["prod_list_json"] = serializers.serialize("json", prod_list, use_natural_foreign_keys=True)
        context["MEDIA_URL"] = MEDIA_URL

        return context

def add_to_cart(request):
    if request.method == "POST":
        quantity = 0
        total_quantity = 0

        cart = None
        cart_id = 0

        this_product = None
        product_id = str(request.POST['product'])[1:] # Slice removes the "p" character
        product = Product.objects.get(pk=product_id)

        try: # Check if quantity POSTed
            quantity = int(request.POST['quantity'])
        except ValueError:
            quantity = 0
        try: # Check if total_quantity POSTed
            total_quantity = int(request.POST['total_quantity'])
        except ValueError:
            total_quantity = 0
        
        # create new cart_item from product
        cart_item = Cart_Item(product=product)
        try: # Does cart exist?
            cart_id = request.session['cart']
            cart = Cart.objects.get(pk=cart_id)
        except: # Create it
            cart = Cart()
            cart.save()
            cart_id = cart.pk
            request.session['cart'] = cart_id
        try: # Is the item in the cart?
            #temporary for testing
            #clean_carts()

            # If so, add its quantity
            this_product = cart.item_list.get(product=product)
            this_product.quantity += quantity            
            this_product.save()
        except: # Put it in the cart
            cart_item.quantity = quantity
            cart_item.save()
            cart.item_list.add(cart_item)
            this_product = cart_item
        cart.total_quantity += quantity # Add to total number of items
        cart.save()
        total_quantity = cart.total_quantity
        response = {"success": True, "total_quantity": total_quantity}

        return JsonResponse(response)

def contact(request):
	inc_pc_time()
	return render(request, 'mainsite/contact.html')

def view_cart(request):
    return render(request, "mainsite/viewcart.html")

def spa_test(request):
    return render(request, "mainsite/spa_test.html")