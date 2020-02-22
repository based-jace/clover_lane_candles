import pymongo

mongoclient = pymongo.MongoClient(
    "mongodb://localhost:5000/",
    username="root",
    password="example"
)

db = mongoclient.get_database("cloverlane")
# var = db.list_collection_names()

candles = db.get_collection("candles")

# candles.insert_one({
#     "pie": {
#         "scent": "pumpkin", "quantity": 3
#     }
# })

# print (var)
# mongoclient["cloverlane"]