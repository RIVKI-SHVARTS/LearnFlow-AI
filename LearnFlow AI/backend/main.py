from flask import Flask
from flask_cors import CORS 
from routes.user_routes import user_bp
from routes.category_routes import category_bp
from routes.sub_category_routes import sub_cat_bp
from routes.prompt_routes import prompt_bp

app = Flask(__name__)
# CORS(app) 
CORS(app, resources={r"/*": {"origins": "*"}})

# רישום כל ה-Blueprints שבנינו
app.register_blueprint(user_bp, url_prefix='/users')
app.register_blueprint(category_bp, url_prefix='/categories')
app.register_blueprint(sub_cat_bp, url_prefix='/sub-categories')
app.register_blueprint(prompt_bp, url_prefix='/prompts')

@app.route('/', methods=['GET'])
def home():
    return {"message": "LearnFlow AI Backend is running!"}

if __name__ == '__main__':
    # הרצת השרת במצב Debug כדי שתוכלי לראות שגיאות
    app.run(debug=True, port=5000)