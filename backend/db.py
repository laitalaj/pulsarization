from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow

from data import iter_pulsars

db = SQLAlchemy()
ma = Marshmallow()
