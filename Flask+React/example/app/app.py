# create the app
from flask import Flask
from flask_cors import CORS

from api import bp
from db import db

app = Flask(__name__)
CORS(app)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///project.db"
db.init_app(app)
with app.app_context():
    db.create_all()

app.register_blueprint(bp, url_prefix="/api")
app.run(port=8080)

