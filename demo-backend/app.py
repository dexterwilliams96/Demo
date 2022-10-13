from flask_cors import CORS
from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
CORS(app)

app.config[
    'SQLALCHEMY_DATABASE_URI'] = 'postgresql://fjepnvkdtpbzvn:7ad1b5cecd6a642fc8e4f804d7bf71395d9da76075b5e58cc4644dfc67a5d70a@ec2-99-81-137-11.eu-west-1.compute.amazonaws.com/dbgomtkirp4r14'
app.config['SECRET_KEY'] = "resource-manager-demo"
db = SQLAlchemy(app)

from routes import *
