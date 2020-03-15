from pymongo import MongoClient
from bson.objectid import ObjectId

from flask import Flask
import flask_admin
from flask_admin import AdminIndexView

from wtforms import form, fields
from wtforms.validators import InputRequired, NumberRange

from flask_admin.form import Select2Widget
from flask_admin.contrib.pymongo import ModelView, filters
from flask_admin.model.fields import InlineFormField, InlineFieldList

import sys

sys.path.append('./')

import db_helpers as dbh

# Create application
app = Flask(__name__, instance_relative_config=True)
app.config.from_pyfile('config.py')

# Create models
mongoclient = MongoClient(
    # "mongodb://mongo:27017/", # Production
    "mongodb://localhost:6000/", # Development
    username="root",
    password="example",
    connect=False
)
db = mongoclient.clover_lane

# Maybe add in later
# class UserView(ModelView):
#     column_list = ('name', 'email', 'password')
#     column_sortable_list = ('name', 'email', 'password')

#     form = UserForm

# Forms
class CandleForm(form.Form):
    candle_type = fields.SelectField("Candle Type", choices=dbh.GetChoices("candle_types", db))
    color = fields.SelectField('Color', description="Optional. Use this for things like jar candles",
            choices=dbh.GetChoices("candle_colors", db))
    scent = fields.SelectField('Scent', choices=dbh.GetChoices("candle_scents", db))

class CandleTypeForm(form.Form):
    name = fields.StringField("Candle Type", description="jar, votive, etc.", validators=[InputRequired()])
    description = fields.StringField("Description", description="Optional. Description of the candle type")
    price = fields.FloatField("Price", description="Price per candle in USD ($)", default=0, validators=[InputRequired(), NumberRange(0)])
    listed_weight = fields.FloatField("Listed Weight", description="Listed weight in oz", 
                    default=0, validators=[InputRequired(), NumberRange(0)])
    actual_weight = fields.FloatField("Actual Weight", description="Actual weight in oz. If less than listed_weight, defaults to listed weight", 
                    default=0, validators=[InputRequired(), NumberRange(0)])
    min_quant = fields.IntegerField("Minimum Quantity", default=1, validators=[InputRequired(), NumberRange(1)])
    quant_of = fields.StringField("Quantities Of", description="4; 2, 7; etc. Defaults to min_quant if not given")

class CandleColorsForm(form.Form):
    name = fields.StringField("Color Name", validators=[InputRequired()])
    description = fields.StringField("Description", description="Optional")

class CandleScentsForm(form.Form):
    name = fields.StringField("Scent Name", validators=[InputRequired()])
    description = fields.StringField("Description", description="Optional. Describe the scent.")

# Views
class CandleView(ModelView):
    column_list = ('candle_type', 'scent', 'color')
    column_sortable_list = column_list
    column_labels = {'candle_type': 'Type'}

    form = CandleForm

class CandleTypeView(ModelView):
    column_list = ('name', 'price', 'listed_weight', 'actual_weight', 'min_quant', 'quant_of')
    column_sortable_list = ('name', 'price', 'listed_weight', 'actual_weight', 'min_quant')
    column_labels = {'price': "Price ($)", 'min_quant': "Minimum Quantity", "quant_of": "Quantities Of"}

    form = CandleTypeForm

    def on_model_change(self, form, model, is_created):
        # Sets actual_weight to listed_weight if listed_weight is greater than actual_weight's given value
        model['actual_weight'] = model["listed_weight"] if model["listed_weight"] > model["actual_weight"] else model['actual_weight']

        # Ensures quant_of is in a sensible format
        model["quant_of"] = dbh.ensure_quant_list(model["quant_of"], model["min_quant"])

        return super().on_model_change(form, model, is_created)

class CandleColorsView(ModelView):
    column_list = ("name", "description")
    column_sortable_list = ("name",)

    form = CandleColorsForm

class CandleScentsView(ModelView):
    column_list = ("name", "description")
    column_sortable_list = ("name",)

    form = CandleScentsForm

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
admin.add_view(CandleView(db.candles, 'Candles', "Candles", endpoint="candles"))

admin.add_sub_category(name="Candle Attributes", parent_name="Candles")

admin.add_view(CandleTypeView(db.candle_types, 'Candle Types', "Candle Attributes", endpoint="candles/attrs/types"))
admin.add_view(CandleScentsView(db.candle_scents, 'Candle Scents', "Candle Attributes", endpoint="candles/attrs/scents"))
admin.add_view(CandleColorsView(db.candle_colors, 'Candle Colors', "Candle Attributes", endpoint="candles/attrs/colors"))


# Start app
if __name__ == "__main__":
    app.run(debug=True, port="2500")