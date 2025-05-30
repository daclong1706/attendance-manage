from flask import Flask
from config import Config
from app.extensions import db, migrate, jwt, bcrypt
from app.models import *
from app.routes import auth_bp, subject_bp, user_bp, admin_bp, teacher_bp, student_bp, debug_bp, class_bp, qr_bp, recognition_bp, training_bp
from flask_cors import CORS
from datetime import timedelta
from flask_graphql import GraphQLView
from app.graphql import schema


def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)
    app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
    
    #CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)
    CORS(app, resources={r"/*": {"origins": "*"}})
    # Initialize Flask extensions here  
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    bcrypt.init_app(app)

    # Đăng ký API routes
    app.register_blueprint(auth_bp, url_prefix='/auth')
    app.register_blueprint(subject_bp, url_prefix='/subject')
    app.register_blueprint(user_bp, url_prefix='/user')
    app.register_blueprint(admin_bp, url_prefix='/admin')
    app.register_blueprint(teacher_bp, url_prefix='/teacher')
    app.register_blueprint(student_bp, url_prefix='/student')
    app.register_blueprint(class_bp, url_prefix="/class")
    app.register_blueprint(recognition_bp, url_prefix="/recognition")

    app.register_blueprint(qr_bp, url_prefix='/qr')
    app.register_blueprint(debug_bp, url_prefix='/debug')
    
    app.register_blueprint(training_bp, url_prefix="/training")
    
    app.add_url_rule(
        "/graphql",
        view_func=GraphQLView.as_view("graphql", schema=schema, graphiql=True)
    )

    return app