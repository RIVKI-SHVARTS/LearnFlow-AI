from flask import Blueprint, request, jsonify
from services import category_service
from utils.jwt_auth import admin_required

category_bp = Blueprint('category_bp', __name__)

@category_bp.route('/', methods=['GET'])
def list_all():
    return jsonify(category_service.get_all_categories()), 200

@category_bp.route('/<category_id>', methods=['GET'])
def get_one(category_id):
    try:
        return jsonify(category_service.get_category(category_id)), 200
    except ValueError as e:
        return jsonify({"error": str(e)}), 404

@category_bp.route('/', methods=['POST'])
@admin_required
def create():
    data = request.get_json()
    try:
        new_cat = category_service.create_new_category(name=data.get('name'))
        return jsonify(new_cat), 201
    except ValueError as e:
        return jsonify({"error": str(e)}), 400

@category_bp.route('/<category_id>', methods=['PATCH'])
@admin_required
def update(category_id):
    data = request.get_json()
    try:
        success = category_service.update_category_name(category_id, data.get('name'))
        if not success:
            return jsonify({"error": "Category not found"}), 404
        return jsonify({"message": "Category updated successfully"}), 200
    except ValueError as e:
        return jsonify({"error": str(e)}), 400

@category_bp.route('/<category_id>', methods=['DELETE'])
@admin_required
def delete(category_id):
    success = category_service.remove_category(category_id)
    if not success:
        return jsonify({"error": "Category not found"}), 404
    return jsonify({"message": "Category deleted successfully"}), 200