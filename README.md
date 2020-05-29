# pulsarization

![Screenshot of Pulsarization](/docs/screenshot.png)

Pulsar data visualization based on
[ATNF Pulsar Catalogue](https://www.atnf.csiro.au/research/pulsar/psrcat/).
Made for the Interactive Data Visualization course,
Spring 2020, University of Helsinki.

## Try it!

Pulsarization is available for playing around with at
[pulsarization.azurewebsites.net](https://pulsarization.azurewebsites.net/)!

## The design rationale

This app was designed with scientific visualization best practices in mind.
For more elaboration on the design choices, check out
[the related report](http://julius.laita.la/pdfs/pulsarization)

## Running locally

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

The publicly hosted backend API is available at
[pulsarization-api.azurewebsites.net](https://pulsarization-api.azurewebsites.net/hello).

* Get data for one pulsar with given [J name](https://en.wikipedia.org/wiki/Pulsar#Nomenclature):
`curl https://pulsarization-api.azurewebsites.net/pulsars/J0101-6422`
* Get J name and binary component type for all pulsars with a binary component set:
`curl -X POST -H 'content-type: application/json' -d '{"fields": ["psrj", "bincomp"], "filters": [{"field": "bincomp", "op": "!=", "value": "null"}]}' https://pulsarization-api.azurewebsites.net/pulsars`
* Get maximum values for `f0` (pulse frequency) and `dist_dm` (distance):
`curl 'https://pulsarization-api.azurewebsites.net/extremes/max?fields=f0&fields=dist_dm'`
