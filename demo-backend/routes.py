from flask import request, render_template
from app import app, db
from models import Employee, Task, Comment
import json


@app.route('/')
def home():
    # return
    return render_template('testTemplate.html')


@app.route('/employees')
def employees():
    allEmployees = Employee.query.order_by(Employee.name.desc()).all()
    response = []
    for emp in allEmployees:
        response.append({'id': emp.id, 'name': emp.name, 'dob': emp.dob})
    return response


@app.route('/employees/<string:name>')
def employee(name):
    emp = Employee.query.filter_by(name=name).first_or_404()
    response = {'id': emp.id, 'name': emp.name, 'dob': emp.dob}
    task_list = []
    for t in task_list:
        task_list.append({'id': t.id, 'content': t.content, 'startDate': t.start_date, 'endDate': t.end_date})
    response['tasks'] = task_list
    return response

    # For testing route
    # return render_template('testTemplate.html', name=specificEmployee)


@app.route('/tasks')
def tasks():
    allTasks = Task.query.all()
    return allTasks


# @app.route('/tasks/<int:task_id>')
# def task(task_id):
#     specificTask = Task.query.filter_by(task_id=task_id).first_or_404()
#     return specificTask


@app.route('/tasks/<int:employee_id>')
def tasksForEmployee(employee_id):
    employeeTasks = Task.query.filter_by(employee_id=employee_id).all()
    response = []
    for t in employeeTasks:
        response.append({'content': t.content, 'startDate': t.start_date, 'endDate': t.end_date})
    return response

