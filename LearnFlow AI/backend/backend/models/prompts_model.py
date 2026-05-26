from datetime import datetime, timezone
from typing import Any, Dict, Optional

# יצירת Prompt (פונקציית Factory)
def create_prompt(
    prompt: str,
    response: str,
    user_id: str,
    category_id: Optional[str] = None,
    sub_category_id: Optional[str] = None
) -> dict:
    return {
        "prompt": prompt,
        "response": response,
        "user_id": user_id,
        "category_id": category_id,
        "sub_category_id": sub_category_id,
        "created_at": datetime.now(timezone.utc)
    }

def prompt_from_dict(data: dict) -> dict:
    return {
        "id": str(data.get("_id", "")), 
        "prompt": data.get("prompt"),
        "response": data.get("response"),
        "user_id": str(data.get("user_id", "")),
        "category_id": str(data.get("category_id", "")),
        "sub_category_id": str(data.get("sub_category_id", "")),
        "created_at": data.get("created_at")
    }