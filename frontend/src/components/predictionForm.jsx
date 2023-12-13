/* eslint-disable react/prop-types */
// PredictionForm.js
import {
  crops,
  seasons,
  stateDistrictMapping,
  states,
} from "/src/utils/options.json";

const PredictionForm = ({
  state,
  setState,
  district,
  setDistrict,
  season,
  setSeason,
  crop,
  setCrop,
  area,
  setArea,
}) => {
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
              {states.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>

          {state && (
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
                {stateDistrictMapping[state].map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </select>
            </div>
          )}

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
              {seasons.map((season) => (
                <option key={season} value={season}>
                  {season}
                </option>
              ))}
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
              {crops.map((crop) => (
                <option key={crop} value={crop}>
                  {crop}
                </option>
              ))}
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
      </div>
    </div>
  );
};

export default PredictionForm;
