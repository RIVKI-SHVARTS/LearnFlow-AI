def create_sub_category(id: str, name: str, category_id: str) -> dict:
    return {
        "id": id,
        "name": name,
        "category_id": category_id
    }

def sub_category_from_dict(data: dict) -> dict:
    return {
        "id": str(data.get("id", data.get("_id", ""))),
        "name": data.get("name"),
        "category_id": str(data.get("category_id", ""))   
          }