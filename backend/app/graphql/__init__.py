import graphene
from .subject_schema import Query as SubjectQuery, Mutation as SubjectMutation
from .class_schema import Query as ClassQuery, Mutation as ClassMutation
from .student_schema import Query as StudentQuery, Mutation as StudentMutation
from .training_schema import Query as TrainingQuery, Mutation as TrainingMutation

class Query(SubjectQuery, ClassQuery, StudentQuery, TrainingQuery, graphene.ObjectType):
    pass

class Mutation(SubjectMutation, ClassMutation, StudentMutation, TrainingMutation, graphene.ObjectType):
    pass

schema = graphene.Schema(query=Query, mutation=Mutation)


