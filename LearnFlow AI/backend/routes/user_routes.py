from flask import Blueprint, request, jsonify, g
from services import user_service
from repositories.user_repository import get_user_by_phone
from utils.jwt_auth import create_access_token, auth_required, admin_required

user_bp = Blueprint('user_bp', __name__)

@user_bp.route('/', methods=['GET'])
@admin_required
def list_users():
    return jsonify(user_service.get_all_users()), 200

@user_bp.route('/<user_id>', methods=['GET'])
@auth_required
def get_user(user_id):
    if g.user_id != user_id and not g.is_admin:
        return jsonify({"error": "Not authorized"}), 403

    try:
        user = user_service.get_user(user_id)
        return jsonify(user), 200
    except ValueError as e:
        return jsonify({"error": str(e)}), 404
    
@user_bp.route('/phone/<phone>', methods=['GET'])
def get_user_by_phone_route(phone):
    user = user_service.get_user_by_phone(phone)
    if not user:
        return jsonify({"error": "User not found"}), 404
    return jsonify(user), 200    

@user_bp.route('/login', methods=['POST'])
def login_user():
    data = request.get_json() or {}
    phone = data.get('phone')
    name = data.get('name')

    if not phone or not name:
        return jsonify({"error": "Phone and name are required"}), 400

    user = user_service.get_user_by_phone(phone)
    if not user or user.get('name') != name:
        return jsonify({"error": "Invalid phone or username"}), 401

    token = create_access_token(user_id=user['id'], is_admin=user.get('is_admin', False))
    return jsonify({
        "token": token,
        "user_id": user['id'],
        "name": user['name'],
        "is_admin": user.get('is_admin', False)
    }), 200

@user_bp.route('', methods=['POST'], strict_slashes=False)
def create_user():
    data = request.get_json()
    existing_user = get_user_by_phone(data['phone'])
    if existing_user:
        return jsonify({"message": "User with this phone number already exists."}), 409
        
    try:
        user = user_service.register_user(data['name'], data['phone'], is_admin=False)
        return jsonify(user), 201 
    except ValueError as e:
            return jsonify({"error": str(e)}), 400

@user_bp.route('/<user_id>', methods=['PATCH'])
@auth_required
def update_user(user_id):
    if g.user_id != user_id and not g.is_admin:
        return jsonify({"error": "Not authorized"}), 403

    data = request.get_json()
    success = user_service.update_user_profile(user_id, data.get('name'), data.get('phone'))
    if not success:
        return jsonify({"error": "User not found or no changes"}), 404
    return jsonify({"message": "User updated"}), 200

@user_bp.route('/<user_id>', methods=['DELETE'])
@auth_required
def delete_user(user_id):
    if g.user_id != user_id and not g.is_admin:
        return jsonify({"error": "Not authorized"}), 403

    success = user_service.remove_user(user_id)
    if not success:
        return jsonify({"error": "User not found"}), 404
    return jsonify({"message": "User deleted"}), 200

@user_bp.route('/admin', methods=['GET'])
@admin_required
def admin_check():
    return jsonify({"message": "Admin access confirmed", "user_id": g.user_id}), 200