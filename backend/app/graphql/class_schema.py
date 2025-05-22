import graphene
from graphene_sqlalchemy import SQLAlchemyObjectType
from app.models.class_section import ClassSection
from app.models.subject import Subject
from app.models.enrollment import Enrollment
from app.models.user import User
from app.extensions import db
from app.middlewares.auth_middleware import jwt_required_middleware
from flask import g

# Định nghĩa kiểu dữ liệu ClassSection dựa trên model SQLAlchemy
class ClassSectionType(SQLAlchemyObjectType):
    class Meta:
        model = ClassSection

# Truy vấn (GET)
class Query(graphene.ObjectType):
    class_sections = graphene.List(ClassSectionType)

    @jwt_required_middleware
    def resolve_class_sections(self, info):
        if g.user_role == "teacher":
            raise Exception("Forbidden: Admins only")
        return ClassSection.query.all()

# Mutation (CREATE, UPDATE, DELETE)
class CreateClass(graphene.Mutation):
    class Arguments:
        subject_id = graphene.Int(required=True)
        teacher_id = graphene.Int(required=True)
        room = graphene.String()
        day_of_week = graphene.String()
        start_time = graphene.String()
        end_time = graphene.String()
        start_date = graphene.String()
        end_date = graphene.String()
        semester = graphene.Int()
        year = graphene.Int()

    class_section = graphene.Field(ClassSectionType)

    @jwt_required_middleware
    def mutate(self, info, subject_id, teacher_id, room, day_of_week, start_time, end_time, start_date, end_date, semester, year):
        if g.user_role != "admin":
            raise Exception("Forbidden: Admins only")

        new_class = ClassSection(
            subject_id=subject_id,
            teacher_id=teacher_id,
            room=room,
            day_of_week=day_of_week,
            start_time=start_time,
            end_time=end_time,
            start_date=start_date,
            end_date=end_date,
            semester=semester,
            year=year
        )

        db.session.add(new_class)
        db.session.commit()
        return CreateClass(class_section=new_class)

class DeleteClass(graphene.Mutation):
    class Arguments:
        id = graphene.Int(required=True)

    success = graphene.Boolean()

    @jwt_required_middleware
    def mutate(self, info, id):
        if g.user_role != "admin":
            raise Exception("Forbidden: Admins only")

        class_section = ClassSection.query.get(id)
        if not class_section:
            raise Exception("Class not found")

        db.session.delete(class_section)
        db.session.commit()
        return DeleteClass(success=True)

# Kết hợp các Mutation
class Mutation(graphene.ObjectType):
    create_class = CreateClass.Field()
    delete_class = DeleteClass.Field()

# # Tạo Schema GraphQL
# schema = graphene.Schema(query=Query, mutation=Mutation)