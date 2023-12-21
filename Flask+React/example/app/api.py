from flask import Blueprint, request

from db import db, User

bp = Blueprint('bp', __name__)


@bp.route('/users')
def users():
    q = db.session.query(User).all()
    res = []
    for user in q:
        res.append({"username": user.username, "password": user.password})

    return res


@bp.route('/create', methods=['POST'])
def create():
    user = User(
        username=request.json.get('username'),
        password=request.json.get('password'),
    )
    db.session.add(user)
    db.session.commit()
    return "created"
