from typing import Any, Dict, List, Optional
from repositories import category_repository as category_repo

def get_all_categories() -> List[Dict[str, Any]]:
    return category_repo.list_categories()

def get_category(category_id: str) -> Dict[str, Any]:
    category = category_repo.get_category_by_id(category_id)
    if not category:
        raise ValueError(f"Category with ID {category_id} not found")
    return category

def create_new_category(name: str) -> Dict[str, Any]:
    if not name or len(name.strip()) < 2:
        raise ValueError("Category name must be at least 2 characters long")
    
    return category_repo.create_category(name)

def update_category_name(category_id: str, new_name: str) -> bool:
    if not new_name:
        raise ValueError("New name cannot be empty")
    
    return category_repo.update_category(category_id, name=new_name)

def remove_category(category_id: str) -> bool:
    return category_repo.delete_category(category_id)