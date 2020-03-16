from fastapi import FastAPI
from fastapi.responses import JSONResponse

from pymongo import MongoClient

import json

with open("config.json") as json_config:
    config = json.load(json_config)

mongoclient = MongoClient(
    config["db_location"]["dev"],
    username="root",
    password="example",
    connect=False
)

db = mongoclient.clover_lane

app = FastAPI()

@app.get("/products")
async def get_all_products():
    collection = {}
    for product_type in config["product_types"]:
        product_list = list(db[product_type].find(projection={"_id": 0}))
        collection[product_type] = product_list

    return collection

@app.get(
    "/products/{product_type}",
    responses={
        404: {"description": "Item not found"}
    }
)
async def get_products(product_type: str):
    if product_type not in config["product_types"]:
        return JSONResponse(
            status_code=404, 
            content={
                "message": "product_type '" + product_type + "' not found in database"
            }
        )

    else:
        products = list(db[product_type].find(projection={"_id": 0}))
        collection = {product_type: products}

        return collection
