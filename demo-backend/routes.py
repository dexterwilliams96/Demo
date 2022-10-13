from datetime import datetime
from flask import request, redirect
from app import app, db
from models import Employee, Task, Comment
import json


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
    response = {'id': emp.id, 'name': emp.name, 'dob': emp.dob}
    task_list = []
    for t in task_list:
        task_list.append({'name': t.name, 'content': t.content, 'startDate': t.start_date, 'endDate': t.end_date})
    response['tasks'] = task_list
    return response


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
        response.append({'name': t.name,'content': t.content, 'startDate': t.start_date, 'endDate': t.end_date})
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
    return "{True}"


@app.route('/register', methods=['POST'])
def register(data):
    new_employee = Employee(
                           name=data['name'],
                           dob=data['dob'].strp)
    db.session.add(new_employee)
    db.sesson.commit()
    return redirect('home')