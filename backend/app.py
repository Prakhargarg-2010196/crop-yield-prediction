import os

from flask import Flask, jsonify, request
from flask_cors import CORS
from joblib import dump, load
from yield_prediction import CropProductionPredictor

app = Flask(__name__)
CORS(app)

model_file = "preprocessed/model.joblib"
ohe_file = "preprocessed/ohe.joblib"
predictor = CropProductionPredictor()

os.makedirs(os.path.dirname(model_file), exist_ok=True)

if os.path.exists(model_file) and os.path.exists(ohe_file):
    try:
        predictor.model = load(model_file)
        predictor.ohe = load(ohe_file)
        print("Model loaded.")
    except Exception as e:
        print("Error loading model:", e)
else:
    print("Training model...")
    predictor.train_model("ML/yield_prediction/crop_production_karnataka.csv")
    print("Model trained.")
    dump(predictor.model, model_file)
    dump(predictor.ohe, ohe_file)
    print("Model saved to file.")


@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    prediction = predictor.predict(
        data["year"],
        data["state"],
        data["district"],
        data["season"],
        data["crop"],
        data["area"],
    )
    prediction_list = prediction.tolist()  # Convert NumPy array to list
    return jsonify({"prediction": prediction_list})


if __name__ == "__main__":
    app.run(debug=True)
