def create_user(name: str, phone: str) -> dict:
    return {
        "name": name,
        "phone": phone
    }

def user_from_dict(data: dict) -> dict:
    return {
        "name": data.get("name"),
        "phone": data.get("phone"),
        "id": str(data.get("_id"))
    }