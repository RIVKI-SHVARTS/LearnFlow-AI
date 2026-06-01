import datetime
from functools import wraps

from flask import request, jsonify, g
import jwt

from config import JWT_SECRET, JWT_ALGORITHM, JWT_EXP_DELTA_HOURS


def create_access_token(user_id: str, is_admin: bool) -> str:
    payload = {
        "user_id": user_id,
        "is_admin": is_admin,
        "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=JWT_EXP_DELTA_HOURS)
    }
    token = jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)
    if isinstance(token, bytes):
        token = token.decode("utf-8")
    return token


def decode_access_token(token: str) -> dict:
    try:
        return jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
    except jwt.ExpiredSignatureError:
        raise ValueError("Token expired")
    except jwt.InvalidTokenError:
        raise ValueError("Invalid token")


def get_bearer_token() -> str:
    auth_header = request.headers.get("Authorization", "")
    if not auth_header or not auth_header.startswith("Bearer "):
        raise ValueError("Authorization header missing or malformed")
    return auth_header.split(" ", 1)[1].strip()


def auth_required(f):
    @wraps(f)
    def wrapped(*args, **kwargs):
        try:
            token = get_bearer_token()
            payload = decode_access_token(token)
        except ValueError as exc:
            return jsonify({"error": str(exc)}), 401

        g.user_id = payload.get("user_id")
        g.is_admin = payload.get("is_admin", False)
        return f(*args, **kwargs)

    return wrapped


def admin_required(f):
    @wraps(f)
    def wrapped(*args, **kwargs):
        try:
            token = get_bearer_token()
            payload = decode_access_token(token)
        except ValueError as exc:
            return jsonify({"error": str(exc)}), 401

        if not payload.get("is_admin", False):
            return jsonify({"error": "Admin privileges required"}), 403

        g.user_id = payload.get("user_id")
        g.is_admin = True
        return f(*args, **kwargs)

    return wrapped
