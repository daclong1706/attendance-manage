import graphene
from graphene_sqlalchemy import SQLAlchemyObjectType
from app.models.training_program import TrainingProgram
from app.extensions import db

# Định nghĩa kiểu dữ liệu TrainingProgram dựa trên model SQLAlchemy
class TrainingProgramType(SQLAlchemyObjectType):
    class Meta:
        model = TrainingProgram

# Truy vấn (GET)
class Query(graphene.ObjectType):
    training_programs = graphene.List(TrainingProgramType)

    def resolve_training_programs(self, info):
        return TrainingProgram.query.all()

# Mutation (CREATE, UPDATE, DELETE)
class CreateTraining(graphene.Mutation):
    class Arguments:
        code = graphene.String(required=True)
        name = graphene.String(required=True)
        credits = graphene.Int(required=True)
        theory_hours = graphene.Int()
        practice_hours = graphene.Int()
        semester = graphene.Int(required=True)
        is_optional = graphene.Boolean()
        prerequisite_code = graphene.String()
        department = graphene.String()

    training_program = graphene.Field(TrainingProgramType)

    def mutate(self, info, code, name, credits, semester, theory_hours=0, practice_hours=0, is_optional=False, prerequisite_code=None, department=None):
        new_training = TrainingProgram(
            code=code,
            name=name,
            credits=credits,
            theory_hours=theory_hours,
            practice_hours=practice_hours,
            semester=semester,
            is_optional=is_optional,
            prerequisite_code=prerequisite_code,
            department=department
        )
        db.session.add(new_training)
        db.session.commit()
        return CreateTraining(training_program=new_training)

class UpdateTraining(graphene.Mutation):
    class Arguments:
        id = graphene.Int(required=True)
        code = graphene.String()
        name = graphene.String()
        credits = graphene.Int()
        theory_hours = graphene.Int()
        practice_hours = graphene.Int()
        semester = graphene.Int()
        is_optional = graphene.Boolean()
        prerequisite_code = graphene.String()
        department = graphene.String()

    training_program = graphene.Field(TrainingProgramType)

    def mutate(self, info, id, code=None, name=None, credits=None, theory_hours=None, practice_hours=None, semester=None, is_optional=None, prerequisite_code=None, department=None):
        training_program = TrainingProgram.query.get(id)
        if not training_program:
            raise Exception("Training program not found")

        if code: training_program.code = code
        if name: training_program.name = name
        if credits: training_program.credits = credits
        if theory_hours: training_program.theory_hours = theory_hours
        if practice_hours: training_program.practice_hours = practice_hours
        if semester: training_program.semester = semester
        if is_optional is not None: training_program.is_optional = is_optional
        if prerequisite_code: training_program.prerequisite_code = prerequisite_code
        if department: training_program.department = department

        db.session.commit()
        return UpdateTraining(training_program=training_program)

class DeleteTraining(graphene.Mutation):
    class Arguments:
        id = graphene.Int(required=True)

    success = graphene.Boolean()

    def mutate(self, info, id):
        training_program = TrainingProgram.query.get(id)
        if not training_program:
            raise Exception("Training program not found")

        db.session.delete(training_program)
        db.session.commit()
        return DeleteTraining(success=True)

# Kết hợp các Mutation
class Mutation(graphene.ObjectType):
    create_training = CreateTraining.Field()
    update_training = UpdateTraining.Field()
    delete_training = DeleteTraining.Field()

# # Tạo Schema GraphQL
# schema = graphene.Schema(query=Query, mutation=Mutation)