import axios from "axios";
import { useState } from "react";
import PredictionForm from "./components/predictionForm";

function App() {
  const [predictionResult, setPredictionResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handlePredictionSubmit = async (
    state,
    district,
    season,
    crop,
    area
  ) => {
    setIsLoading(true);
    setPredictionResult(null);
    const response = await axios.post("http://localhost:5000/predict", {
      state,
      district,
      season,
      crop,
      area,
    });
    setPredictionResult(response.data.prediction);
    setIsLoading(false);
  };

  return (
    <div className="app">
      {isLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          Data is being computed...
        </div>
      ) : (
        <PredictionForm onSubmit={handlePredictionSubmit} />
      )}
      {predictionResult && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <h3>Computed Result: {predictionResult}</h3>
        </div>
      )}
    </div>
  );
}

export default App;
