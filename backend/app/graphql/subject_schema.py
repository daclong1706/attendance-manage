import graphene
from graphene_sqlalchemy import SQLAlchemyObjectType
from app.models.subject import Subject
from app.extensions import db

# Định nghĩa kiểu dữ liệu Subject dựa trên model SQLAlchemy
class SubjectType(SQLAlchemyObjectType):
    class Meta:
        model = Subject

# Truy vấn (GET)
class Query(graphene.ObjectType):
    subjects = graphene.List(SubjectType)

    def resolve_subjects(self, info):
        return Subject.query.all()

# Mutation (CREATE, UPDATE, DELETE)
class CreateSubject(graphene.Mutation):
    class Arguments:
        name = graphene.String(required=True)
        code = graphene.String(required=True)

    subject = graphene.Field(SubjectType)

    def mutate(self, info, name, code):
        new_subject = Subject(name=name, code=code)
        db.session.add(new_subject)
        db.session.commit()
        return CreateSubject(subject=new_subject)

class UpdateSubject(graphene.Mutation):
    class Arguments:
        id = graphene.Int(required=True)
        name = graphene.String()
        code = graphene.String()

    subject = graphene.Field(SubjectType)

    def mutate(self, info, id, name=None, code=None):
        subject = Subject.query.get(id)
        if not subject:
            raise Exception("Subject not found")

        if name:
            subject.name = name
        if code:
            subject.code = code

        db.session.commit()
        return UpdateSubject(subject=subject)

class DeleteSubject(graphene.Mutation):
    class Arguments:
        id = graphene.Int(required=True)

    success = graphene.Boolean()

    def mutate(self, info, id):
        subject = Subject.query.get(id)
        if not subject:
            raise Exception("Subject not found")

        db.session.delete(subject)
        db.session.commit()
        return DeleteSubject(success=True)

# Kết hợp các Mutation
class Mutation(graphene.ObjectType):
    create_subject = CreateSubject.Field()
    update_subject = UpdateSubject.Field()
    delete_subject = DeleteSubject.Field()

# # Tạo Schema GraphQL
# schema = graphene.Schema(query=Query, mutation=Mutation)