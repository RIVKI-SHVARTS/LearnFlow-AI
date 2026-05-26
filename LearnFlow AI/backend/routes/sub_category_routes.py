from flask import Blueprint, request, jsonify
from services import sub_category_service

sub_cat_bp = Blueprint('sub_cat_bp', __name__)

@sub_cat_bp.route('/', methods=['GET'])
def list_all():
    cat_id = request.args.get('category_id')
    if cat_id:
        return jsonify(sub_category_service.get_sub_categories_by_parent(cat_id)), 200
    return jsonify(sub_category_service.get_all_sub_categories()), 200

@sub_cat_bp.route('/<sub_cat_id>', methods=['GET'])
def get_one(sub_cat_id):
    try:
        return jsonify(sub_category_service.get_sub_category(sub_cat_id)), 200
    except ValueError as e:
        return jsonify({"error": str(e)}), 404

@sub_cat_bp.route('/', methods=['POST'])
def create():
    data = request.get_json()
    try:
        new_sub = sub_category_service.create_new_sub_category(
            name=data.get('name'), 
            category_id=data.get('category_id')
        )
        return jsonify(new_sub), 201
    except ValueError as e:
        return jsonify({"error": str(e)}), 400

@sub_cat_bp.route('/<sub_cat_id>', methods=['PATCH'])
def update(sub_cat_id):
    data = request.get_json()
    success = sub_category_service.update_sub_category(
        sub_cat_id, 
        name=data.get('name'), 
        category_id=data.get('category_id')
    )
    if not success:
        return jsonify({"error": "Sub-category not found or no changes"}), 404
    return jsonify({"message": "Sub-category updated"}), 200

@sub_cat_bp.route('/<sub_cat_id>', methods=['DELETE'])
def delete(sub_cat_id):
    success = sub_category_service.remove_sub_category(sub_cat_id)
    if not success:
        return jsonify({"error": "Sub-category not found"}), 404
    return jsonify({"message": "Sub-category deleted"}), 200