import { LineChart } from "@mui/x-charts/LineChart";
import axios from "axios";
import { useState } from "react";
import PredictionForm from "./components/predictionForm";
import {
  crops,
  seasons,
  stateDistrictMapping,
  states,
} from "/src/utils/options.json";

function App() {
  const [predictionResult, setPredictionResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [state, setState] = useState(states[0]);
  const [district, setDistrict] = useState(stateDistrictMapping[states[0]][0]);
  const [season, setSeason] = useState(seasons[0]);
  const [crop, setCrop] = useState(crops[0]);
  const [area, setArea] = useState(0);
  const [startYear, setStartYear] = useState(2000);
  const [endYear, setEndYear] = useState(2014);

  const handlePredictionSubmit = async (
    state,
    district,
    season,
    crop,
    area
  ) => {
    setIsLoading(true);
    setPredictionResult(null);
    try {
      const response = await axios.post("http://localhost:5000/predict", {
        startYear,
        endYear,
        state,
        district,
        season,
        crop,
        area,
      });
      console.log("🚀 ~ file: App.jsx:28 ~ App ~ response:", response);
      setPredictionResult(response.data.predictions);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handlePredictionSubmit(state, district, season, crop, area);
  };

  const years = [];

  for (let year = startYear; year <= endYear; year++) {
    years.push(year);
  }

  if (isLoading)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        Data is being computed...
      </div>
    );

  return (
    <div className="app">
      <PredictionForm
        state={state}
        setState={setState}
        district={district}
        setDistrict={setDistrict}
        season={season}
        setSeason={setSeason}
        crop={crop}
        setCrop={setCrop}
        area={area}
        setArea={setArea}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{ padding: "20px", display: "flex", flexDirection: "column" }}
        >
          <label>Start Year:</label>
          <input
            type="number"
            value={startYear}
            onChange={(e) => {
              setStartYear(e.target.value);
              setPredictionResult(null);
            }}
            placeholder="Enter area"
            style={{ padding: "10px", borderRadius: "5px" }}
          />
        </div>
        <div
          style={{ padding: "20px", display: "flex", flexDirection: "column" }}
        >
          <label>End Year:</label>
          <input
            type="number"
            value={endYear}
            onChange={(e) => {
              setEndYear(e.target.value);
              setPredictionResult(null);
            }}
            placeholder="Enter area"
            style={{ padding: "10px", borderRadius: "5px" }}
          />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "20px",
        }}
      >
        <button onClick={handleSubmit}>Submit Prediction</button>
      </div>
      {predictionResult && (
        <div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <LineChart
              xAxis={[{ data: years }]}
              series={[
                {
                  data: predictionResult,
                },
              ]}
              width={500}
              height={300}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
