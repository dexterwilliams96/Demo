from datetime import datetime
from app import db


class Employee(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(30), nullable=False)
    dob = db.Column(db.Date, nullable=False)
    email = db.Column(db.String(120), nullable=False)
    password = db.Column(db.String(60), nullable=False)
    tasks = db.relationship('Task')
    comments = db.relationship('Comment')

    def __repr__(self):
        return f"User('{self.id}', '{self.name}', '{self.dob}')"

<<<<<<< HEAD

||||||| f6c8dca
<<<<<<< HEAD

||||||| 2ed072d
;;
=======
>>>>>>> 929cd1e95ea1950b85e2ec3f2bf9547aae57f63b
=======
>>>>>>> 5ea0f9d63c8dde0fbd40f66573822f08106f956f
class Task(db.Model):
<<<<<<< HEAD
    id = db.Column(db.Integer, primary_key=True) 
||||||| f6c8dca
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(30), default='no name', server_default=String("pre table migration"), nullable=False)
=======
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(30), default='no name', server_default="pre table migration", nullable=False)
>>>>>>> 5ea0f9d63c8dde0fbd40f66573822f08106f956f
    content = db.Column(db.Text, nullable=False, default='Empty Content')
    start_date = db.Column(db.DateTime, nullable=False)
    end_date = db.Column(db.DateTime, nullable=False)
    employee_id = db.Column(db.Integer, db.ForeignKey('employee.id'), nullable=False)
    name = db.Column(db.String(30), default='Unnamed', nullable=False)
    comments = db.relationship('Comment')

    def __repr__(self):
        return f"Comment('{self.content}', '{self.startDate}"


class Comment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    date_posted = db.Column(db.DateTime(), nullable=False, default=datetime.utcnow)
    task_id = db.Column(db.Integer, db.ForeignKey('task.id'), nullable=False)
    employee_id = db.Column(db.Integer, db.ForeignKey('employee.id'), nullable=False)
