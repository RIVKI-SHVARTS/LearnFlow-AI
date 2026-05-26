from flask import Blueprint, request, jsonify
from services import user_service

user_bp = Blueprint('user_bp', __name__)

@user_bp.route('/', methods=['GET'])
def list_users():
    return jsonify(user_service.get_all_users()), 200

@user_bp.route('/<user_id>', methods=['GET'])
def get_user(user_id):
    try:
        user = user_service.get_user(user_id)
        return jsonify(user), 200
    except ValueError as e:
        return jsonify({"error": str(e)}), 404

@user_bp.route('/', methods=['POST'])
def create_user():
    data = request.get_json()
    try:
        user = user_service.register_user(data['name'], data['phone'])
        return jsonify(user), 201
    except ValueError as e:
        return jsonify({"error": str(e)}), 400

@user_bp.route('/<user_id>', methods=['PATCH'])
def update_user(user_id):
    data = request.get_json()
    success = user_service.update_user_profile(user_id, data.get('name'), data.get('phone'))
    if not success:
        return jsonify({"error": "User not found or no changes"}), 404
    return jsonify({"message": "User updated"}), 200

@user_bp.route('/<user_id>', methods=['DELETE'])
def delete_user(user_id):
    success = user_service.remove_user(user_id)
    if not success:
        return jsonify({"error": "User not found"}), 404
    return jsonify({"message": "User deleted"}), 200