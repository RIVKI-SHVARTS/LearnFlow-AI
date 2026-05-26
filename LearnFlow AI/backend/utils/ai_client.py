import openai
from config import OPENAI_API_KEY

openai.api_key = OPENAI_API_KEY

SYSTEM_INSTRUCTION = (
    "You are an expert academic teacher. "
    "Your goal is to provide deep, structured, and pedagogical content. "
    "Use clear headings, bullet points, and practical examples that fit the "
    "provided category and sub-category context."
)

def call_openai_api(topic: str, category: str, sub_category: str) -> str:
    full_user_prompt = f"Teach me about '{topic}'. Category: {category}, Sub-category: {sub_category}."
    
    response = openai.chat.completions.create(
        model="gpt-4o",
        messages=[
            {"role": "system", "content": SYSTEM_INSTRUCTION},
            {"role": "user", "content": full_user_prompt}
        ]
    )
    return response.choices[0].message.content