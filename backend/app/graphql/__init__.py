import graphene
from .subject_schema import Query as SubjectQuery, Mutation as SubjectMutation
from .class_schema import Query as ClassQuery, Mutation as ClassMutation
from .student_schema import Query as StudentQuery, Mutation as StudentMutation
from .training_schema import Query as TrainingQuery, Mutation as TrainingMutation
from .user_schema import Query as UserQuery, Mutation as UserMutation

class Query(SubjectQuery, ClassQuery, StudentQuery, TrainingQuery, UserQuery, graphene.ObjectType):
    pass

class Mutation(SubjectMutation, ClassMutation, StudentMutation, TrainingMutation, UserMutation, graphene.ObjectType):
    pass

schema = graphene.Schema(query=Query, mutation=Mutation)


