from flask import Blueprint, jsonify
from app.models.training_program import TrainingProgram
from app.extensions import db

training_bp = Blueprint("training_bp", __name__)

@training_bp.route("/all", methods=["GET"])
def get_training_program():
    rows = TrainingProgram.query.all()
    data = [
        {
            "id": r.id,
            "code": r.code,
            "name": r.name,
            "credits": r.credits,
            "theory_hours": r.theory_hours,
            "practice_hours": r.practice_hours,
            "prerequisite_code": r.prerequisite_code,
            "previous_code": r.previous_code,
            "equivalent_code": r.equivalent_code,
            "department": r.department,
            "semester": r.semester,
            "is_optional": r.is_optional,
            "note": r.note,
        }
        for r in rows
    ]
    return jsonify({"data": data})

@training_bp.route("/create", methods=["POST"])
def create_training():
    data = request.json
    subject = TrainingProgram(
        code=data["code"],
        name=data["name"],
        credits=data["credits"],
        theory_hours=data.get("theory_hours", 0),
        practice_hours=data.get("practice_hours", 0),
        semester=data["semester"],
        is_optional=data.get("is_optional", False),
        prerequisite_code=data.get("prerequisite_code"),
        department=data.get("department")
    )
    db.session.add(subject)
    db.session.commit()
    return jsonify({"message": "Created successfully", "id": subject.id})

@training_bp.route("/update/<int:id>", methods=["PUT"])
def update_training(id):
    subject = TrainingProgram.query.get_or_404(id)
    data = request.json

    subject.code = data["code"]
    subject.name = data["name"]
    subject.credits = data["credits"]
    subject.theory_hours = data.get("theory_hours", 0)
    subject.practice_hours = data.get("practice_hours", 0)
    subject.semester = data["semester"]
    subject.is_optional = data.get("is_optional", False)
    subject.prerequisite_code = data.get("prerequisite_code")
    subject.department = data.get("department")

    db.session.commit()
    return jsonify({"message": "Updated successfully"})

@training_bp.route("/delete/<int:id>", methods=["DELETE"])
def delete_training(id):
    subject = TrainingProgram.query.get_or_404(id)
    db.session.delete(subject)
    db.session.commit()
    return jsonify({"message": "Deleted successfully"})
