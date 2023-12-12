import yield_prediction
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # This will enable CORS for all routes


@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    prediction = yield_prediction.predict(
        data["state"], data["district"], data["season"], data["crop"], data["area"]
    )
    prediction_list = prediction.tolist()  # Convert NumPy array to list
    return jsonify({"prediction": prediction_list})


if __name__ == "__main__":
    app.run(debug=True)
