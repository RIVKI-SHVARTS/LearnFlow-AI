from typing import Any, Dict, List, Optional
from bson import ObjectId
from db_client import db
from models.prompts_model import create_prompt, prompt_from_dict

COLLECTION_NAME = "prompts"


def get_all_prompts() -> List[Dict[str, Any]]:
    return [prompt_from_dict(doc) for doc in db[COLLECTION_NAME].find()]

def get_prompt_by_id(prompt_id: str) -> Optional[Dict[str, Any]]:
    doc = db[COLLECTION_NAME].find_one({"_id": ObjectId(prompt_id)})
    if doc:
        return prompt_from_dict(doc)
    return None


def create_new_prompt(
    prompt: str,
    response: str,
    user_id: str,
    category_id: Optional[str] = None,
    sub_category_id: Optional[str] = None
) -> Dict[str, Any]:
    
    prompt_dict = create_prompt(prompt, response, user_id, category_id, sub_category_id)
    
    result = db[COLLECTION_NAME].insert_one(prompt_dict)
    
    prompt_dict["_id"] = result.inserted_id
    return prompt_from_dict(prompt_dict)


def update_prompt(prompt_id: str, update_fields: Dict[str, Any]) -> bool:
    if not update_fields:
        return False
    result = db[COLLECTION_NAME].update_one(
        {"_id": ObjectId(prompt_id)}, 
        {"$set": update_fields}
    )
    return result.modified_count > 0


def delete_prompt(prompt_id: str) -> bool:
    result = db[COLLECTION_NAME].delete_one({"_id": ObjectId(prompt_id)})
    return result.deleted_count > 0