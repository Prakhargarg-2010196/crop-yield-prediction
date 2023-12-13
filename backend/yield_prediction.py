import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder


class CropProductionPredictor:
    def __init__(self):
        self.model = None
        self.ohe = None

    def preprocess_data(self, df):
        # Categorical columns for one-hot encoding
        categorical_cols = ["State_Name", "District_Name", "Season", "Crop"]

        # One-hot encode the categorical columns
        self.ohe = OneHotEncoder(handle_unknown="ignore")
        X_categorical = pd.DataFrame(
            self.ohe.fit_transform(df[categorical_cols]).toarray(),
            columns=self.ohe.get_feature_names_out(categorical_cols),
        )

        # Combine one-hot encoded categorical columns and numerical columns
        X_final = pd.concat(
            [X_categorical, df.drop(categorical_cols + ["Production"], axis=1)], axis=1
        )
        y = df["Production"]

        return X_final, y

    def train_model(self, dataset_path):
        # Load the dataset
        df = pd.read_csv(dataset_path)

        # Preprocess the data
        X_final, y = self.preprocess_data(df)

        # Train the model
        self.model = RandomForestRegressor(n_estimators=100, random_state=42, n_jobs=-1)
        self.model.fit(X_final, y)

    def preprocess_user_input(self, user_input_df):
        # One-hot encode the categorical columns
        user_input_categorical = pd.DataFrame(
            self.ohe.transform(
                user_input_df[["State_Name", "District_Name", "Season", "Crop"]]
            ).toarray(),
            columns=self.ohe.get_feature_names_out(
                ["State_Name", "District_Name", "Season", "Crop"]
            ),
        )

        # Combine one-hot encoded categorical columns and numerical columns
        user_input_final = pd.concat(
            [
                user_input_categorical,
                user_input_df.drop(
                    ["State_Name", "District_Name", "Season", "Crop"], axis=1
                ),
            ],
            axis=1,
        )

        return user_input_final

    def predict(self, crop_year, state, district, season, crop, area):
        if self.model is None or self.ohe is None:
            raise ValueError("Model not trained. Please call train_model first.")

        # Combine input parameters into a DataFrame
        user_input_df = pd.DataFrame(
            [[crop_year, state, district, season, crop, area]],
            columns=[
                "Crop_Year",
                "State_Name",
                "District_Name",
                "Season",
                "Crop",
                "Area",
            ],
        )

        # Preprocess user input
        user_input_final = self.preprocess_user_input(user_input_df)

        # Make the prediction
        prediction = self.model.predict(user_input_final)

        return prediction
