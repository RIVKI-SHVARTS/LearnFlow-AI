from flask import Blueprint, request, jsonify
from services import prompt_service
from utils.jwt_auth import auth_required

prompt_bp = Blueprint('prompt_bp', __name__)

# יצירת שיעור חדש ע"י AI
@prompt_bp.route('/generate', methods=['POST'])
@auth_required
def generate_lesson():
    data = request.get_json()
    try:
        lesson = prompt_service.generate_and_save_lesson(
            user_id=data.get('user_id'),
            category_id=data.get('category_id'),
            sub_category_id=data.get('sub_category_id'),
            topic=data.get('topic')
        )
        return jsonify(lesson), 201
    except ValueError as e:
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        return jsonify({"error": "Failed to generate lesson", "details": str(e)}), 500


@prompt_bp.route('/', methods=['GET'])
def list_all():
    return jsonify(prompt_service.get_all_prompts()), 200


@prompt_bp.route('/<prompt_id>', methods=['GET'])
def get_one(prompt_id):
    try:
        return jsonify(prompt_service.get_prompt(prompt_id)), 200
    except ValueError as e:
        return jsonify({"error": str(e)}), 404
    
@prompt_bp.route('/history/<user_id>', methods=['GET'])
@auth_required
def get_history(user_id):
    try:
        return jsonify(prompt_service.get_prompt_history(user_id)), 200
    except ValueError as e:
        return jsonify({"error": str(e)}), 404


@prompt_bp.route('/<prompt_id>', methods=['DELETE'])
def delete(prompt_id):
    success = prompt_service.delete_prompt(prompt_id)
    if not success:
        return jsonify({"error": "Prompt not found"}), 404
    return jsonify({"message": "Prompt deleted"}), 200