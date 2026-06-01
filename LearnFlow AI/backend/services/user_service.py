from typing import Any, Dict, List, Optional
from repositories import user_repository as user_repo

def get_all_users() -> List[Dict[str, Any]]:
    return user_repo.get_all_users()

def get_user(user_id: str) -> Dict[str, Any]:
    user = user_repo.get_user_by_id(user_id)
    if not user:
        raise ValueError(f"User with ID {user_id} not found")
    return user

def get_user_by_phone(phone: str) -> Optional[Dict[str, Any]]:
    return user_repo.get_user_by_phone(phone)

def register_user(name: str, phone: str, is_admin: bool = False) -> Dict[str, Any]:
    if user_repo.get_user_by_phone(phone):
        raise ValueError("User with this phone number already exists")
    
    if not name or len(name.strip()) < 2:
        raise ValueError("Name must be at least 2 characters long")
        
    return user_repo.create_user(name, phone, is_admin)

def update_user_profile(user_id: str, name: Optional[str] = None, phone: Optional[str] = None) -> bool:
    return user_repo.update_user(user_id, name, phone)

def remove_user(user_id: str) -> bool:
    return user_repo.delete_user(user_id)