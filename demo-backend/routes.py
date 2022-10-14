from datetime import datetime
from flask import request, redirect
from app import app, db, bcrypt
from models import Employee, Task, Comment
import json
from sqlalchemy import exc


@app.route('/employees')
def employees():
    all_employees = Employee.query.order_by(Employee.name.desc()).all()
    response = []
    for emp in all_employees:
        response.append({'id': emp.id, 'name': emp.name, 'dob': emp.dob, 'email': emp.email})
    return response


@app.route('/employees/<string:name>')
def employee(name):
    emp = Employee.query.filter_by(name=name).first_or_404()
    response = {'id': emp.id, 'name': emp.name, 'dob': emp.dob, 'email': emp.email}
    task_list = []
    for t in task_list:
        task_list.append({'id': t.id, 'name': t.name, 'content': t.content, 'startDate': t.start_date, 'endDate': t.end_date})
    response['tasks'] = task_list
    return task_list


# @app.route('/tasks')
# def tasks():
#     allTasks = Task.query.all()
#     return allTasks


# @app.route('/tasks/<int:task_id>')
# def task(task_id):
#     specificTask = Task.query.filter_by(task_id=task_id).first_or_404()
#     return specificTask


@app.route('/tasks/<int:employee_id>')
def tasksForEmployee(employee_id):
    employee_tasks = Task.query.filter_by(employee_id=employee_id).all()
    response = []
    for t in employee_tasks:
        response.append({'id': t.id, 'name': t.name, 'content': t.content, 'startDate': t.start_date, 'endDate': t.end_date})
    return response


@app.route('/newTask', methods=['POST'])
def newTask():
    data = request.get_json()
    start_time = datetime.strptime(data['start_date'], '%Y-%m-%dT%H:%M:%S.%fZ').strftime('%m/%d/%y %H:%M:%S')
    end_time = datetime.strptime(data['end_date'], '%Y-%m-%dT%H:%M:%S.%fZ').strftime('%m/%d/%y %H:%M:%S')
    task = Task(
        name=data['name'],
        content=data['content'],
        start_date=start_time,
        end_date=end_time,
        employee_id=data['user_id'])
    db.session.add(task)
    db.session.commit()
    return ""


@app.route('/deleteTask', methods=['POST'])
def deleteTask():
    data = request.get_json()
    print(data)
    task = Task.query.filter_by(id=data['id']).first()
    if task:
        db.session.delete(task)
        db.session.commit()
        return "true"
    return "false"


@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    dob = datetime.strptime(data['dob'], '%Y-%m-%dT%H:%M:%S.%fZ').strftime('%m/%d/%y')
    hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    new_employee = Employee(
        email=data['email'],
        password=hashed_password,
        name=data['name'],
        dob=dob)
    db.session.add(new_employee)
    try:
        db.session.commit()
        return "true"
    except exc.SQLAlchemyError:
        db.session.rollback()
        return "false"


@app.route('/signin', methods=['POST'])
def signin():
    data = request.get_json()
    verifiedEmployee = Employee.query.filter_by(email=data['email']).first()
    if verifiedEmployee and bcrypt.check_password_hash(verifiedEmployee.password, data['password']):
        employeeDict = {'id': verifiedEmployee.id, 'name': verifiedEmployee.name, 'dob': verifiedEmployee.dob, 'email': verifiedEmployee.email}
        return employeeDict
    else:
        return "false"
