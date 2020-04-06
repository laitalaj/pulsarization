from db import db
from data import iter_pulsars
from models import Pulsar, PulsarSchema

def init_db():
    # pylint: disable=no-member
    db.create_all()
    if Pulsar.query.count() > 0:
        print('Data present, we\'re good to go!')
        return
    print('Loading data into DB..')
    schema = PulsarSchema()
    for pulsar in iter_pulsars():
        p = schema.load(pulsar, session=db.session, unknown='EXCLUDE')
        db.session.add(p)
    db.session.commit()
    print('Data loaded!')
