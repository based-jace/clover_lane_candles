from django.db import models
from model_utils import Choices
from clover_lane_candles.settings import MEDIA_URL
#import django.contrib.postgres.fields

#region Candles 

class Product(models.Model):
    COLORS = Choices('red', 'green', 'light-green', 'blue', 'light-blue', 'brown', 'tan', 'white',
        'cream', 'orange', 'purple', 'mixed')

    color = models.CharField(max_length=40, choices=COLORS, blank=True)
    prod_img = models.ImageField("Product Image", blank=True)
    is_main = models.BooleanField("Is this the main product of this type to be displayed on the products page?", default=False)

    type_id = models.ForeignKey("Product_Type", verbose_name="Product Type", on_delete=models.CASCADE)
    scent_id = models.ForeignKey('Scent', verbose_name="Scent", on_delete=models.CASCADE, null=True)

    def publish(self):
        self.save()

    def __str__(self):
        return str(self.color) + " " + str(self.type_id) + " - " + str(self.scent_id)

class Product_Type(models.Model):
    TYPES = Choices('cinnamon roll votive', 'cinnamon roll', 'cinnamon roll with burn dish', 'full pie',
     'pie slice', 'candle in jar', 'candle melts')

    min_order = models.IntegerField("Minimum Number of this Product")
    name = models.CharField(max_length = 60, choices=TYPES)
    price = models.DecimalField("Price per Item", max_digits=5, decimal_places=2)
    desc = models.TextField(blank=True)

    def natural_key(self):
        return {"name":self.name, "price":self.price, "min_order":self.min_order, "desc":self.desc}

    def css_id(self):
        return self.name.replace(' ', '_')

    def publish(self):
        self.save()

    def __str__(self):
        return self.name.title()

class Scent(models.Model):
    SCENTS = Choices('pumpkin', 'mixed berry', 'sampler', 'strawberry', 'apple-cinnamon',
        'cinnamon roll')

    name = models.CharField(max_length=40, choices=SCENTS)
    desc = models.TextField(blank=True)

    def natural_key(self):
        return {"name":self.name, "desc":self.desc}

    def publish(self):
        self.save()

    def __str__(self):
        return self.name.title()
    
class Cart(models.Model):
    item_list = models.ManyToManyField("Cart_Item")
    total_quantity = models.IntegerField(default=0)
    last_modified = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str([str(i) for i in self.item_list.all()])[2:-2].replace("'", "") # Just makes it look nicer

class Cart_Item(models.Model):
    product = models.ForeignKey("Product", on_delete=models.CASCADE)
    quantity = models.IntegerField(default=0)
    def __str__(self):
        return str(self.product) + " " + str(self.quantity)

class Past_Cart(models.Model):
    item_list = models.ManyToManyField("Past_Cart_Item")
    total_quantity = models.IntegerField(default=0)
    last_modified = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str([str(i) for i in self.item_list.all()])[2:-2].replace("'", "") # Just makes it look nicer

class Past_Cart_Item(models.Model):
    product = models.ForeignKey("Product", on_delete=models.CASCADE)
    quantity = models.IntegerField(default=0)
    def __str__(self):
        return str(self.product) + " " + str(self.quantity)

#endregion Candles

