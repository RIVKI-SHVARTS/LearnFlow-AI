from typing import Any, Dict, List, Optional
from db_client import db
from bson import ObjectId
from models.category_model import category_from_dict 

COLLECTION_NAME = "categories"

def get_category_by_id(category_id: str) -> Optional[Dict[str, Any]]:
    doc = db[COLLECTION_NAME].find_one({"_id": ObjectId(category_id)})
    if doc:
        return category_from_dict(doc)
    return None

def list_categories() -> List[Dict[str, Any]]:
    return [category_from_dict(doc) for doc in db[COLLECTION_NAME].find()]

def create_category(name: str) -> Dict[str, Any]:
    result = db[COLLECTION_NAME].insert_one({"name": name})
    return category_from_dict({"_id": result.inserted_id, "name": name})

def update_category(category_id: str, name: str = None) -> bool:
    update_fields = {}
    if name is not None:
        update_fields["name"] = name
    
    if not update_fields:
        return False
        
    result = db[COLLECTION_NAME].update_one(
        {"_id": ObjectId(category_id)}, 
        {"$set": update_fields}
    )
    return result.modified_count > 0

def delete_category(category_id: str) -> bool:
    result = db[COLLECTION_NAME].delete_one({"_id": ObjectId(category_id)})
    return result.deleted_count > 0