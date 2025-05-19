from app.extensions import db

class TrainingProgram(db.Model):
    __tablename__ = 'training_program'

    id = db.Column(db.Integer, primary_key=True)
    code = db.Column(db.String(20), nullable=False)
    name = db.Column(db.String(255), nullable=False)
    credits = db.Column(db.Integer)
    theory_hours = db.Column(db.Integer)
    practice_hours = db.Column(db.Integer)
    prerequisite_code = db.Column(db.String(20))
    previous_code = db.Column(db.String(20))
    equivalent_code = db.Column(db.String(20))
    department = db.Column(db.String(20))
    semester = db.Column(db.Integer)
    is_optional = db.Column(db.Boolean)
    note = db.Column(db.Text)
