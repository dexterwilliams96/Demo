from datetime import datetime
from app import db


class Employee(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(30), nullable=False)
    dob = db.Column(db.Date, nullable=False)
    tasks = db.relationship('Task')
    comments = db.relationship('Comment')

    # employeeGrade = db.Column(db.String(2))
    # employeeTeamID = db.Column(db.String(5))

    # def changeEmployeeTeam(self, newEmployeeTeamID):
    #     self.employeeTeamID = newEmployeeTeamID

    def __repr__(self):
        return f"User('{self.id}', '{self.name}', '{self.dob}')"

;;
class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False, default='Empty Content')
    start_date = db.Column(db.DateTime, nullable=False)
    end_date = db.Column(db.DateTime, nullable=False)
    employee_id = db.Column(db.Integer, db.ForeignKey('employee.id'), nullable=False)
    comments = db.relationship('Comment')

    # self.employeeTaskComments = []

    def __repr__(self):
        return f"Comment('{self.content}', '{self.startDate}"


class Comment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    date_posted = db.Column(db.DateTime(), nullable=False, default=datetime.utcnow)
    task_id = db.Column(db.Integer, db.ForeignKey('task.id'), nullable=False)
    employee_id = db.Column(db.Integer, db.ForeignKey('employee.id'), nullable=False)
