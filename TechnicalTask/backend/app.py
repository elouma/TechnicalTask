from flask import Flask, request, jsonify, make_response
from flask_restplus import Api, Resource, fields
import pickle
import numpy as np


flask_app = Flask(__name__)
app = Api(app=flask_app,
          version="1.0",
          title=" Grain Supplier identifier",
          description="Predict the best supplier for the customer's order")

name_space = app.namespace('prediction', description='Prediction APIs')

model = app.model('Prediction params',
                  {'OrderReqAmt': fields.Float(required=True,
                                               description="OrderReqAmt",
                                               help="OrderReqAmt cannot be blank"),
                   'Chicago': fields.Float(required=True,
                                           description="Chicago",
                                           help="Chicago Width cannot be blank"),
                   'Cincinatti': fields.Float(required=True,
                                              description="Cincinatti",
                                              help="Cincinatti cannot be blank"),
                   'StLouis': fields.Float(required=True,
                                           description="StLouis",
                                           help="StLouis cannot be blank")})

classifier = pickle.load(
    open("/Users/Yahnik/Desktop/TechnicalTask/dtmodel", "rb"))


@name_space.route("/")
class MainClass(Resource):

    def options(self):
        response = make_response()
        response.headers.add("Access-Control-Allow-Origin", "*")
        response.headers.add('Access-Control-Allow-Headers', "*")
        response.headers.add('Access-Control-Allow-Methods', "*")
        return response

    @app.expect(model)
    def post(self):
        try:
            formData = request.json
            print(formData)
            data = [value for value in formData.values()]
            print(data)
            reshapedata = np.array(data).reshape(1, 4)
            print(reshapedata)
            prediction = classifier.predict(np.array(data).reshape(1, 4))
            print(prediction[0])
            types = {0: "cf9651b0-df49-498f-a66c-0a7f897545ce",
                     1: "ae5d7b77-86c9-49d2-ac18-09bf9883adc2", 2: "19f4a11d-63ca-4127-975a-15933aaa33ff"}
            response = jsonify({
                "statusCode": 200,
                "status": "Prediction made",
                "result": "The best supplier is: " + prediction[0]
            })
            print(response)
            response.headers.add('Access-Control-Allow-Origin', '*')
            return response
        except Exception as error:
            return jsonify({
                "statusCode": 500,
                "status": "Could not make prediction",
                "error": str(error)
            })
