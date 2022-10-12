from flask_wtf import FlaskForm
from wtforms import ValidationError, PasswordField, DateField, StringField, SubmitField, TextAreaField
from wtforms.validators import DataRequired, Length, EqualTo
from models import employee

class newTaskForm(FlaskForm):
    taskName = StringField('Task Name', validators=[DataRequired()])
    taskObjectives = TextAreaField('Objectives', validators=[DataRequired()])
    submitTask = SubmitField('Add New Task')
    taskStartDate = DateField('Start Date', format='%d-%m-%Y', validators=[DataRequired()])
    taskEndDate = DateField('Deadline', format='%d-%m-%Y', validators=[DataRequired()])

    def checkForDateClash(self, taskStartDate, taskEndDate):
        pass
        #Determine all dates used by new task
        #Check against any tasks assigned already to the same employeeID

class newCommentOnTaskForm(FlaskForm):
    comment = TextAreaField('Objectives', validators=[DataRequired()])
    submitComment = SubmitField('Add New Comment')

class signUpForm(FlaskForm):
    employeeUsername = StringField('Username', validators=[DataRequired(), Length(min=2, max=20)])
    employeePassword = PasswordField('Password', validators=[DataRequired()])
    confirmPassword = PasswordField(
        'Confirm Password', validators=[DataRequired(), EqualTo('password')])
    signUp = SubmitField('Sign Up')

    def checkUsernameNotTaken(self, employeeUsername):
        user = employee.query.filter_by(employeeName=employeeUsername.data).first()
        if user:
            raise ValidationError('That username is already taken, Please try again')

class LoginForm(FlaskForm):
    employeeUsername = StringField('Username', validators=[DataRequired()])
    password = PasswordField('Password', validators=[DataRequired()])
    submit = SubmitField('Login')
