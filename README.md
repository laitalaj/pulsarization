# pulsarization

Pulsar data visualization based on
[ATNF Pulsar Catalogue](https://www.atnf.csiro.au/research/pulsar/psrcat/).
Made for the Interactive Data Visualization course,
Spring 2020, University of Helsinki.

## Getting started

1. Make sure you have Python 3, node and yarn installed
2. Install the requirements
    * `pip3 install -r backend/requirements.txt`
3. Run the backend in debug mode
    * `python3 backend/app.py`
4. Check that everything's working
    * `curl http://127.0.0.1:5000/hello`
5. Install the frontend requirements
    * `cd frontend`
    * `yarn install`
6. Run the frontend
    * `yarn start`

## Backend API

* Get data for one pulsar with given [J name](https://en.wikipedia.org/wiki/Pulsar#Nomenclature):
`curl http://127.0.0.1:5000/pulsars/J0101-6422`
* Get J name and binary component type for all pulsars with a binary component set:
`curl -X POST -H 'content-type: application/json' -d '{"fields": ["psrj", "bincomp"], "filters": [{"field": "bincomp", "op": "!=", "value": "null"}]}' http://127.0.0.1:5000/pulsars`
* Get maximum values for `f0` (pulse frequency) and `dist_dm` (distance):
`curl 'http://127.0.0.1:5000/extremes/max?fields=f0&fields=dist_dm'`
