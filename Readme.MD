# Crop Yield Prediction

This project is a web application for predicting crop yield based on various factors such as state, district, season, crop type, and area.

## Installation

1. Clone the repository: git clone https://github.com/MrityunjayNPandey/crop-yield-prediction.git

2. Install the required Python packages:
   cd backend 
   pip install -r requirements.txt

3. Install the required JavaScript packages:
   cd frontend
   npm install

## Usage

1. Start the Flask backend:
    cd backend
    python app.py

2. In a new terminal window, start the React frontend:
    cd frontend
    npm run dev

## Note

Use crop_production_karnataka.csv instead of crop_production_india.csv for demo purposes as computation takes too much time for crop_production_india. Also make sure to choose state Karnataka for this case. 

Change it in backend/yield_prediction.py
