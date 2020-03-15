import re

def choicify(choice_list: list):
    '''
    Sorts, then transforms given 'choice_list' into a form usable by flask_admin forms

    Args:\n
        choice_list: a list of strings

    Returns:\n
        A list of (string, string) tuples usable by flask_admin forms
    '''

    return [(choice, choice) for choice in sorted(choice_list)]

def ensure_quant_list(quant_str, min_quant):
    reg = r"[^\d,]" # Replaces unnecessary chars in given quant_of

    try:
        quant_str = re.sub(reg, "", quant_str)
        quant_list = quant_str.split(",")
        try:
            # Ensures quant_list is a list of ints
            quant_list = [int(x) for x in quant_list]
        except:
            raise ValueError

        # Ensures the smallest int in quant_list is the same as min_quant
        if min(quant_list) != min_quant:
            raise ValueError

    # If anything went wrong, set quant_of to be the same as min_quant
    except ValueError:
        quant_str = str(min_quant)
    except Exception as e:
        print(e.with_traceback())
        quant_str = str(min_quant)
    
    else:
        # If all else went well, remove all whitespace
        quant_str = re.sub(reg, "", str(sorted(quant_list)))

    return quant_str

class GetChoices(object):
    '''
        Creates an object with an __iter__ of choices using the given mongodb collection name

        Enables a dynamic choice list for SelectFields

        Args:\n
            collection_name\n
            db: the mongo database from which to pull the collection from
    '''
    def __init__(self, collection_name: str, db: object):
        self.db = db
        self.collection_name = collection_name
        super().__init__()

    def __iter__(self):
        db_collection = list(self.db[self.collection_name].find(projection=["name"]))
        choices = choicify([candle_type["name"] for candle_type in db_collection])
        for choice in choices:
            yield choice
