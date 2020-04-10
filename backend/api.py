from flask_filter.query_filter import query_with_filters
from flask_restful import Api, Resource, reqparse

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

api = Api()
api.add_resource(HelloWorld, '/hello')
api.add_resource(PulsarEndpoint, '/pulsars/<string:jname>')
api.add_resource(PulsarsEndpoint, '/pulsars')
