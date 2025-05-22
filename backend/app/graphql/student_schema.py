import graphene
from graphene_sqlalchemy import SQLAlchemyObjectType
from app.models.user import User
from app.models.enrollment import Enrollment
from app.models.class_section import ClassSection
from app.models.subject import Subject
from app.models.attendance import AttendanceSession, Attendance
from app.extensions import db, bcrypt
from app.middlewares.auth_middleware import jwt_required_middleware
from flask import g
from datetime import datetime

# Định nghĩa kiểu dữ liệu Student dựa trên model SQLAlchemy
class UserType(SQLAlchemyObjectType):
    class Meta:
        model = User

# class ClassSectionType(SQLAlchemyObjectType):
#     class Meta:
#         model = ClassSection

# class SubjectType(SQLAlchemyObjectType):
#     class Meta:
#         model = Subject

class StudentScheduleType(graphene.ObjectType):
    subject = graphene.String()
    class_time = graphene.String()
    room = graphene.String()
    day_of_week = graphene.String()
    semester = graphene.Int()
    year = graphene.Int()
    start_date = graphene.String()
    end_date = graphene.String()
    teacher_name = graphene.String()
    teacher_email = graphene.String()


class AttendanceSessionType(SQLAlchemyObjectType):
    class Meta:
        model = AttendanceSession

class AttendanceType(SQLAlchemyObjectType):
    class Meta:
        model = Attendance

# Truy vấn (GET)
class Query(graphene.ObjectType):
    student_schedule = graphene.List(StudentScheduleType)  # Thay JSONString bằng ObjectType

    @jwt_required_middleware
    def resolve_student_schedule(self, info):
        if g.user_role != "student":
            raise Exception("Forbidden: Students only")

        student = User.query.filter_by(id=g.user_id).first()
        if not student:
            raise Exception("Student not found")

        enrollments = Enrollment.query.filter_by(student_id=student.id).all()
        student_schedule = []

        for enrollment in enrollments:
            class_section = ClassSection.query.filter_by(id=enrollment.class_section_id).first()
            subject = Subject.query.filter_by(id=class_section.subject_id).first()
            teacher = User.query.filter_by(id=class_section.teacher_id).first()

            class_time = f"{class_section.start_time.strftime('%H:%M')} - {class_section.end_time.strftime('%H:%M')}"

            student_schedule.append(StudentScheduleType(
                subject=subject.name,
                class_time=class_time,
                room=class_section.room,
                day_of_week=class_section.day_of_week,
                semester=class_section.semester,
                year=class_section.year,
                start_date=class_section.start_date.strftime('%Y-%m-%d'),
                end_date=class_section.end_date.strftime('%Y-%m-%d'),
                teacher_name=teacher.name,
                teacher_email=teacher.email
            ))

        return student_schedule


# Mutation (UPDATE, MARK ATTENDANCE)
class UpdateStudent(graphene.Mutation):
    class Arguments:
        name = graphene.String()
        email = graphene.String()
        password = graphene.String()

    student = graphene.Field(UserType)

    @jwt_required_middleware
    def mutate(self, info, name=None, email=None, password=None):
        if g.user_role != "student":
            raise Exception("Forbidden: Students only")

        student = User.query.filter_by(id=g.user_id).first()
        if not student:
            raise Exception("Student not found")

        if name:
            student.name = name
        if email:
            student.email = email
        if password:
            student.password = bcrypt.generate_password_hash(password).decode("utf-8")

        db.session.commit()
        return UpdateStudent(student=student)

class MarkAttendance(graphene.Mutation):
    class Arguments:
        qr_code = graphene.String(required=True)

    message = graphene.String()

    @jwt_required_middleware
    def mutate(self, info, qr_code):
        attendance_session = AttendanceSession.query.filter(
            (AttendanceSession.qr_code_start == qr_code) |
            (AttendanceSession.qr_code_end == qr_code)
        ).first()

        if not attendance_session:
            raise Exception("Invalid QR code")

        student_id = int(g.user_id)

        attendance = Attendance.query.filter_by(
            attendance_session_id=attendance_session.id,
            student_id=student_id
        ).first()

        if not attendance:
            raise Exception("Student not enrolled in this session")

        if attendance.status == "present":
            return MarkAttendance(message="Already marked as present")

        attendance.status = "present"
        attendance.checked_at = datetime.now()

        db.session.commit()
        return MarkAttendance(message="Marked as present")

# Kết hợp Mutations
class Mutation(graphene.ObjectType):
    update_student = UpdateStudent.Field()
    mark_attendance = MarkAttendance.Field()

# # Tạo Schema GraphQL
# schema = graphene.Schema(query=Query, mutation=Mutation)