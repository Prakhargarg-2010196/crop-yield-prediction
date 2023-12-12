// PredictionForm.js
import { useState } from "react";

const PredictionForm = () => {
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [season, setSeason] = useState("");
  const [crop, setCrop] = useState("");
  const [area, setArea] = useState("");

  const handleSubmit = ({ onSubmit }) => {
    // Perform prediction logic here
    // Call the onSubmit prop with the prediction result
    onSubmit({ state, district, season, crop, area });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        className="prediction-form"
        style={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          padding: "20px",
        }}
      >
        <h1>Crop Yield Prediction Demo:</h1>
        <div className="prediction-form" style={{ display: "flex" }}>
          <div
            style={{
              padding: "20px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <label>Select a State:</label>
            <select
              value={state}
              onChange={(e) => setState(e.target.value)}
              style={{ padding: "10px", borderRadius: "5px" }}
            >
              <option value="">Select State...</option>
              {/* Add options for different States */}
            </select>
          </div>

          <div
            style={{
              padding: "20px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <label>Select a District:</label>
            <select
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              style={{ padding: "10px", borderRadius: "5px" }}
            >
              <option value="">Select District...</option>
              {/* Add options for different Districts */}
            </select>
          </div>

          <div
            style={{
              padding: "20px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <label>Select Season:</label>
            <select
              value={season}
              onChange={(e) => setSeason(e.target.value)}
              style={{ padding: "10px", borderRadius: "5px" }}
            >
              <option value="">Select Season...</option>
              {/* Add options for different seasons */}
            </select>
          </div>

          <div
            style={{
              padding: "20px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <label>Select Crop:</label>
            <select
              value={crop}
              onChange={(e) => setCrop(e.target.value)}
              style={{ padding: "10px", borderRadius: "5px" }}
            >
              <option value="">Select Crop...</option>
              {/* Add options for different Crops */}
            </select>
          </div>

          <div
            style={{
              padding: "20px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <label>Area in Hectares:</label>
            <input
              type="number"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              placeholder="Enter area"
              style={{ padding: "10px", borderRadius: "5px" }}
            />
          </div>
        </div>
        <br></br>
        <button onClick={handleSubmit}>Submit Prediction</button>
      </div>
    </div>
  );
};

export default PredictionForm;
