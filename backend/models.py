from marshmallow_sqlalchemy.fields import Nested

from db import db, ma

# pylint: disable=no-member

pulsar_to_type = db.Table('pulsar_to_type', db.metadata,
    db.Column('pulsar', db.Text, db.ForeignKey('pulsars.psrj')),
    db.Column('type', db.Text, db.ForeignKey('pulsar_types.name'))
)

class PulsarType(db.Model):
    __tablename__ = 'pulsar_types'
    name = db.Column(db.Text, primary_key = True)

class Pulsar(db.Model):
    __tablename__ = 'pulsars'
    psrj = db.Column(db.Text, primary_key = True)
    psrb = db.Column(db.Text)

    types = db.relationship('PulsarType', secondary=pulsar_to_type)
    bincomp = db.Column(db.Text)

    raj = db.Column(db.Float)
    decj = db.Column(db.Float)
    elong = db.Column(db.Float)
    elat = db.Column(db.Float)

    p0 = db.Column(db.Float)
    f0 = db.Column(db.Float)

    dist_amn = db.Column(db.Float)
    dist_a = db.Column(db.Float)
    dist_amx = db.Column(db.Float)
    dist_dm = db.Column(db.Float)

class PulsarTypeSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = PulsarType
        load_instance = True

class PulsarSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Pulsar
        include_fk = True
        load_instance = True
    types = Nested(PulsarTypeSchema, many=True)
