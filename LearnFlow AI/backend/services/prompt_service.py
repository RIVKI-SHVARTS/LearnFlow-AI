from typing import Any, Dict, List, Optional
from repositories import prompt_repository, category_repository, sub_category_repository
from utils.ai_client import call_openai_api

def generate_and_save_lesson(
    user_id: str, 
    category_id: str, 
    sub_category_id: str, 
    topic: str
) -> Dict[str, Any]:
    
    category = category_repository.get_category_by_id(category_id)
    sub_category = sub_category_repository.get_sub_category_by_id(sub_category_id)
    
    if not category:
        raise ValueError("Category not found")
    if not sub_category:
        raise ValueError("Sub-category not found")
        
    cat_name = category.get("name")
    sub_cat_name = sub_category.get("name")
    
    lesson_content = call_openai_api(
        topic=topic, 
        category=cat_name, 
        sub_category=sub_cat_name
    )
    
    return prompt_repository.create_new_prompt(
        prompt=topic,
        response=lesson_content,
        user_id=user_id,
        category_id=category_id,
        sub_category_id=sub_category_id
    )
def get_all_prompts() -> List[Dict[str, Any]]:
    return prompt_repository.get_all_prompts()

def get_prompt(prompt_id: str) -> Dict[str, Any]:
    prompt = prompt_repository.get_prompt_by_id(prompt_id)
    if not prompt:
        raise ValueError(f"Prompt {prompt_id} not found")
    return prompt

def update_prompt_content(prompt_id: str, updates: Dict[str, Any]) -> bool:
    return prompt_repository.update_prompt(prompt_id, updates)

def delete_prompt(prompt_id: str) -> bool:
    return prompt_repository.delete_prompt(prompt_id)