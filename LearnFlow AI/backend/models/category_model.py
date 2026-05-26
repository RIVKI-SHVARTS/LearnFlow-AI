def create_category(id: str, name: str) -> dict:
    return {
        "id": id,
        "name": name,
    }

def category_from_dict(data: dict) -> dict:
    return {
        "id": str(data.get("id", data.get("_id", ""))),
        "name": data.get("name"),
          }