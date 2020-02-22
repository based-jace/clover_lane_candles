import pymongo
from bson.objectid import ObjectId

from flask import Flask
import flask_admin
from flask_admin import AdminIndexView

from wtforms import form, fields

from flask_admin.form import Select2Widget
from flask_admin.contrib.pymongo import ModelView, filters
from flask_admin.model.fields import InlineFormField, InlineFieldList

# Create application
app = Flask(__name__, instance_relative_config=True)
# app.config.from_object('instance/config.py')
app.config.from_pyfile('config.py')

# Create models
conn = pymongo.MongoClient(
    "mongodb://mongo:27017/",
    username="root",
    password="example",
    connect=False
)
db = conn.clover_lane

# Maybe add in later
# class UserView(ModelView):
#     column_list = ('name', 'email', 'password')
#     column_sortable_list = ('name', 'email', 'password')

#     form = UserForm

class CandleForm(form.Form):
    color = fields.StringField('Color', description="Optional. Use this for things like jar candles")
    scent = fields.SelectField('Scent')

class ProductForm(form.Form):
    product_type_choice_list = db.product_types.find({})
    product_type_choices = [(p_type['name'], p_type['name']) for p_type in product_type_choice_list]
    
    product_type = fields.SelectField('Type', choices=product_type_choices)
    price = fields.FloatField('Price')
    min_quant = fields.IntegerField('Minimum Quantity')
    quant_of = fields.StringField('Quantities of', description=
    """The number a customer must order in sets of. May be separated by a \",\" 
    if there are multiple options allowed. If left blank, defaults to 1.
    Example: 4,7 for pies """)
    # product_type = fields.StringField('Type')
    
    # product_subcategory = fields.SelectField('Subcategory')
    # # Inner forms
    # product_candle_form = InlineFormField(CandleForm)

    # Form list
    # form_list = InlineFieldList(InlineFormField(InnerForm))

class ProductTypeForm(form.Form):
    name = fields.StringField('Name', description='examples: candle, burning tin, etc.')

class ProductView(ModelView):
    column_list = ('product_type', 'price', 'min_quant', 'quant_of', 'color', 'scent')
    column_sortable_list = ('product_type', 'price', 'min_quant', 'quant_of', 'color', 'scent')
    column_labels = {'product_type': 'Type', 'min_quant': 'Minimum Quantity', 'quant_of': 'Quantities Of'}

    form = ProductForm

class ProductTypeView(ModelView):
    column_list = ('name',)
    column_labels = {'name': 'Name'}

    form = ProductTypeForm

# Flask views
# @app.route('/')
# def index():
#     return '<a href="/admin/">Click me to get to the admin page!</a>'

# Create admin
admin = flask_admin.Admin(
    app, 
    name='Clover Lane Admin',
    url="/",
    template_mode="bootstrap3"
    # index_view=AdminIndexView(
    #     # name='Home',
    #     # template='admin/myhome.html',
    #     url='/'
    # )
    # url='/'
)

# Add views
admin.add_view(ProductView(db.products, 'Products', endpoint="products"))
admin.add_view(ProductTypeView(db.product_types, 'Product Types', endpoint="product_types"))
# admin.add_view(TweetView(db.tweet, 'Tweets'))

# Start app
# app.run(debug=True)