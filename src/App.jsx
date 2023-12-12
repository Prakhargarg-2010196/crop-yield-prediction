import { useState } from "react";
import "./App.css";
import PredictionForm from "./components/predictionForm";

function App() {
  const [predictionResult, setPredictionResult] = useState(null);

  const handlePredictionSubmit = (result) => {
    // Handle the prediction result (e.g., store it in state)
    setPredictionResult(result);
  };

  return (
    <div className="app">
      <PredictionForm onSubmit={handlePredictionSubmit} />
    </div>
  );
}

export default App;
