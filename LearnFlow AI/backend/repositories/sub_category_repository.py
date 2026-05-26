from typing import Any, Dict, List, Optional
from bson import ObjectId
from db_client import db
from models.sub_category_model import sub_category_from_dict

COLLECTION_NAME = "sub_categories"

def get_all_sub_categories() -> List[Dict[str, Any]]:
    doc = db[COLLECTION_NAME].find()
    return [sub_category_from_dict(d) for d in doc]

def get_sub_category_by_id(sub_cat_id: str) -> Optional[Dict[str, Any]]:
    doc = db[COLLECTION_NAME].find_one({"_id": ObjectId(sub_cat_id)})
    if doc:
        return sub_category_from_dict(doc)
    return None

def list_sub_categories_by_category(category_id: str) -> List[Dict[str, Any]]:
    cursor = db[COLLECTION_NAME].find({"category_id": category_id})
    return [sub_category_from_dict(doc) for doc in cursor]

def create_sub_category(name: str, category_id: str) -> Dict[str, Any]:
    result = db[COLLECTION_NAME].insert_one({
        "name": name, 
        "category_id": category_id
    })
    return sub_category_from_dict({
        "_id": result.inserted_id, 
        "name": name, 
        "category_id": category_id
    })

def update_sub_category(sub_cat_id: str, name: str = None, category_id: str = None) -> bool:
    update_fields = {}
    if name is not None:
        update_fields["name"] = name
    if category_id is not None:
        update_fields["category_id"] = category_id
    
    if not update_fields:
        return False
        
    result = db[COLLECTION_NAME].update_one(
        {"_id": ObjectId(sub_cat_id)}, 
        {"$set": update_fields}
    )
    return result.modified_count > 0

def delete_sub_category(sub_cat_id: str) -> bool:
    result = db[COLLECTION_NAME].delete_one({"_id": ObjectId(sub_cat_id)})
    return result.deleted_count > 0