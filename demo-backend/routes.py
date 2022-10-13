from flask import request, render_template
from app import app, db
from models import Employee, Task, Comment


@app.route('/')
def home():
    # return
    return render_template('testTemplate.html')


@app.route('/employees')
def employees():
    allEmployees = Employee.query.order_by(Employee.name.desc()).all()
    return allEmployees

    # For testing route
    # return render_template('testTemplate.html', name=allEmployees)


@app.route('/employees/<string:name>')
def employee(name):
    specificEmployee = Employee.query.filter_by(name=name).first_or_404()
    return specificEmployee

    # For testing route
    # return render_template('testTemplate.html', name=specificEmployee)


@app.route('/tasks')
def tasks():
    allTasks = Task.query.all()
    return allTasks


@app.route('/tasks/<int:task_id>')
def task(task_id):
    specificTask = Task.query.filter_by(id=id).first_or_404()
    return specificTask
