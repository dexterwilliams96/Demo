from datetime import datetime
from flask import request, redirect
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


@app.route('/newTask', methods=['POST'])
def newTask(data):
    start_time = datetime.strptime(data['start_time'], '%m/%d/%y %H:%M:%S')
    end_time = datetime.strptime(data['end_time'], '%m/%d/%y %H:%M:%S')
    task = Task(id=data['id'],
                content=data['content'],
                start_date=start_time,
                end_time=end_time,
                employee_id=data['employee_id'])
    db.session.add(task)
    db.sesson.commit()


@app.route('/register', methods=['POST'])
def register(data):
    newEmployee = Employee(id=data['id'],
                           name=data['name'],
                           dob=data['dob'].strp)
    db.session.add(newEmployee)
    db.sesson.commit()
    return redirect('home')