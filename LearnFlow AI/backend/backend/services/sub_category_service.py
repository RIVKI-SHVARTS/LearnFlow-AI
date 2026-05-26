from typing import Any, Dict, List, Optional
from repositories import sub_category_repository as sub_category_repo

def get_all_sub_categories() -> List[Dict[str, Any]]:
    return sub_category_repo.get_all_sub_categories()

def get_sub_category(sub_cat_id: str) -> Dict[str, Any]:
    sub_cat = sub_category_repo.get_sub_category_by_id(sub_cat_id)
    if not sub_cat:
        raise ValueError(f"Sub-category with ID {sub_cat_id} not found")
    return sub_cat

def get_sub_categories_by_parent(category_id: str) -> List[Dict[str, Any]]:
    # כאן אפשר להוסיף לוגיקה של בדיקת תקינות ה-category_id אם צריך
    return sub_category_repo.list_sub_categories_by_category(category_id)

def create_new_sub_category(name: str, category_id: str) -> Dict[str, Any]:
    if not name or len(name.strip()) < 2:
        raise ValueError("Sub-category name must be at least 2 characters long")
    if not category_id:
        raise ValueError("A category_id is required")
        
    return sub_category_repo.create_sub_category(name, category_id)

def update_sub_category(sub_cat_id: str, name: Optional[str] = None, category_id: Optional[str] = None) -> bool:
    if name is None and category_id is None:
        return False
        
    return sub_category_repo.update_sub_category(sub_cat_id, name, category_id)

def remove_sub_category(sub_cat_id: str) -> bool:
    return sub_category_repo.delete_sub_category(sub_cat_id)