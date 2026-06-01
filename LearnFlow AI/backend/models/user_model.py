def create_user(name: str, phone: str) -> dict:
    return {
        "name": name,
        "phone": phone,
        "is_admin": False
    }

def user_from_dict(data: dict) -> dict:
    return {
        "name": data.get("name"),
        "phone": data.get("phone"),
        "is_admin": data.get("is_admin"),
        "id": str(data.get("_id"))
    }