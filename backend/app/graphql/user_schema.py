import graphene
from graphene_sqlalchemy import SQLAlchemyObjectType
from app.models.user import User
from app.extensions import db, bcrypt
from app.middlewares.auth_middleware import jwt_required_middleware
from app.graphql.student_schema import UserType
from flask import g

# Query lấy dữ liệu người dùng
class Query(graphene.ObjectType):
    # Lấy tất cả người dùng
    all_users = graphene.List(UserType)

    def resolve_all_users(self, info):
        return User.query.all()

    # Lấy tất cả sinh viên
    all_students = graphene.List(UserType)

    def resolve_all_students(self, info):
        return User.query.filter_by(role="student").all()

    # Lấy tất cả giảng viên
    all_teachers = graphene.List(UserType)

    def resolve_all_teachers(self, info):
        return User.query.filter_by(role="teacher").all()

    # Lấy thông tin của một người dùng
    user_info = graphene.Field(UserType, id=graphene.Int(required=True))

    def resolve_user_info(self, info, id):
        return User.query.get(id)
    
class CreateUser(graphene.Mutation):
    class Arguments:
        name = graphene.String(required=True)
        email = graphene.String(required=True)
        password = graphene.String(required=True)
        role = graphene.String(required=True)
        mssv = graphene.String()

    user = graphene.Field(UserType)

    @jwt_required_middleware
    def mutate(self, info, name, email, password, role, department, mssv=""):
        if g.user_role != "admin":
            raise Exception("Forbidden: Admins only")

        existing_user = User.query.filter_by(email=email).first()
        if existing_user:
            raise Exception("Email đã tồn tại! Vui lòng thử email khác.")

        hashed_password = bcrypt.generate_password_hash(password).decode("utf-8")

        new_user = User(
            name=name, email=email, mssv=mssv, password=hashed_password, role=role, department=department or "Unknown"
        )

        db.session.add(new_user)
        db.session.commit()

        return CreateUser(user=new_user)

class UpdateUser(graphene.Mutation):
    class Arguments:
        id = graphene.Int(required=True)
        name = graphene.String()
        email = graphene.String()
        password = graphene.String()
        role = graphene.String()
        mssv = graphene.String()

    user = graphene.Field(UserType)

    @jwt_required_middleware
    def mutate(self, info, id, name=None, email=None, password=None, role=None, mssv=None):
        if g.user_role != "admin":
            raise Exception("Forbidden: Admins only")

        user = User.query.get(id)
        if not user:
            raise Exception("User not found")

        if name:
            user.name = name
        if email:
            user.email = email
        if password:
            user.password = bcrypt.generate_password_hash(password).decode("utf-8")
        if role:
            user.role = role
        if mssv:
            user.mssv = mssv

        db.session.commit()
        return UpdateUser(user=user)

class DeleteUser(graphene.Mutation):
    class Arguments:
        id = graphene.Int(required=True)

    success = graphene.Boolean()

    @jwt_required_middleware
    def mutate(self, info, id):
        if g.user_role != "admin":
            raise Exception("Forbidden: Admins only")

        user = User.query.get(id)
        if not user:
            raise Exception("User not found")

        db.session.delete(user)
        db.session.commit()
        return DeleteUser(success=True)
    
class Mutation(graphene.ObjectType):
    create_user = CreateUser.Field()
    update_user = UpdateUser.Field()
    delete_user = DeleteUser.Field()