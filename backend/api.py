from flask_filter.query_filter import query_with_filters
from flask_restful import Api, Resource, reqparse

from db import db
from models import Pulsar, PulsarSchema

class HelloWorld(Resource):
    def get(self):
        return {'msg': 'Hello world!'}

class PulsarEndpoint(Resource):
    def get(self, jname):
        parser = reqparse.RequestParser()
        parser.add_argument('fields', location='args', action='append')
        args = parser.parse_args()

        p = Pulsar.query.filter_by(psrj = jname).first()
        return PulsarSchema(only=args['fields']).dump(p)

class PulsarsEndpoint(Resource):
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument('fields', location='args', action='append')
        args = parser.parse_args()

        p = query_with_filters(Pulsar, args['filters'], PulsarSchema) \
            if 'filters' in args and args['filters'] is not None \
            else Pulsar.query.all()
        return PulsarSchema(many=True, only=args['fields']).dump(p)
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('fields', location=['json', 'msgpack'], action='append')
        parser.add_argument('filters', type=dict, location=['json', 'msgpack'], action='append')
        args = parser.parse_args()

        p = query_with_filters(Pulsar, args['filters'], PulsarSchema) \
            if 'filters' in args and args['filters'] is not None \
            else Pulsar.query.all()
        return PulsarSchema(many=True, only=args['fields']).dump(p)

class ExtremesEndpoint(Resource):
    # pylint: disable=no-member
    def get(self, extreme):
        extreme_funcs = {
            'min': db.func.min,
            'max': db.func.max,
        }
        if extreme not in extreme_funcs:
            raise NotImplementedError(f'ExtremesEndpoint not implemented for function {extreme}')
        func = extreme_funcs[extreme]

        parser = reqparse.RequestParser()
        parser.add_argument('fields', location='args', action='append')
        args = parser.parse_args()

        res = {f: db.session.query(func(getattr(Pulsar, f))).scalar() for f in args['fields']}
        return res

api = Api()
api.add_resource(HelloWorld, '/hello')
api.add_resource(PulsarEndpoint, '/pulsars/<string:jname>')
api.add_resource(PulsarsEndpoint, '/pulsars')
api.add_resource(ExtremesEndpoint, '/extremes/<string:extreme>')
