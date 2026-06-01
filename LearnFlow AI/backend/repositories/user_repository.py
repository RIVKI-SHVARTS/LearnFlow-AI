from typing import Any, Dict, List, Optional
from bson import ObjectId
from db_client import db
from models.user_model import user_from_dict

COLLECTION_NAME = "users"

def get_all_users() -> List[Dict[str, Any]]:
    return [user_from_dict(doc) for doc in db[COLLECTION_NAME].find()]

def get_user_by_id(user_id: str) -> Optional[Dict[str, Any]]:
    doc = db[COLLECTION_NAME].find_one({"_id": ObjectId(user_id)})
    if doc:
        return user_from_dict(doc)
    return None

def get_user_by_phone(phone: str) -> Optional[Dict[str, Any]]:
    doc = db[COLLECTION_NAME].find_one({"phone": phone})
    if doc:
        return user_from_dict(doc)
    return None


def create_user(name: str, phone: str, is_admin: bool = False) -> Dict[str, Any]:
    result = db[COLLECTION_NAME].insert_one({
        "name": name,
        "phone": phone,
        "is_admin": is_admin
    })
    return user_from_dict({
        "_id": result.inserted_id,
        "name": name,
        "phone": phone,
        "is_admin": False
    })

def update_user(user_id: str, name: str = None, phone: str = None) -> bool:
    update_fields = {}
    if name is not None:
        update_fields["name"] = name
    if phone is not None:
        update_fields["phone"] = phone
        
    if not update_fields:
        return False
        
    result = db[COLLECTION_NAME].update_one(
        {"_id": ObjectId(user_id)},
        {"$set": update_fields}
    )
    return result.modified_count > 0

def delete_user(user_id: str) -> bool:
    result = db[COLLECTION_NAME].delete_one({"_id": ObjectId(user_id)})
    return result.deleted_count > 0