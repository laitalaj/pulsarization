from flask import make_response
from flask_cors import CORS
import msgpack

from custom_flask import MsgpackFlask
from db import db, ma
from init_db import init_db
from api import api

app = MsgpackFlask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)
ma.init_app(app)
api.init_app(app)

@api.representation('application/msgpack')
def output_msgpack(data, code, headers=None):
    res = make_response(msgpack.packb(data), code)
    res.headers.extend(headers or {})
    return res

if __name__ == '__main__':
    with app.app_context():
        init_db()
    app.run(debug=True)