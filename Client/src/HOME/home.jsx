import React, { useEffect, useState } from "react";
import "./home.css";

export default function Home() {
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [input, setInput] = useState(""); 
  const [results, setResults] = useState([]);
  const [mode, setMode] = useState("distance"); 

  useEffect(() => {
    fetch("http://localhost:3000/Cars")
      .then((res) => res.json())
      .then((data) => setVehicles(data))
      .catch((err) => console.error(err));
  }, []);

  const calculate = () => {
    if (!input || !selectedVehicle) return;

    const value = parseFloat(input);

    const compute = (v) => {
      let distance, time;
      if (mode === "distance") {
        distance = value;
        time = distance / v.topSpeed_kmh;
      } else {
        time = value;
        distance = time * v.topSpeed_kmh;
      }
      const fuel = distance / v.fuelEfficiency_kmpl;
      const inRange = distance <= v.maxRange_km;

      return {
        ...v,
        distance,
        time,
        fuel,
        inRange,
      };
    };

    let resultsAll = vehicles.map(compute);

    resultsAll.sort((a, b) =>
      a.type === selectedVehicle ? -1 : b.type === selectedVehicle ? 1 : 0
    );

    setResults(resultsAll);
  };

  const formatTime = (hours) => {
    const totalMinutes = Math.round(hours * 60);
    const h = Math.floor(totalMinutes / 60);
    const m = totalMinutes % 60;
    if (h === 0 && m === 0) return "<1 min";
    if (h === 0) return `${m} min`;
    return `${h} hr ${m} min`;
  };

  return (
    <div className="converter-container">
      <h1>🚗 Vehicle Transport Converter</h1>

      <div className="mode-toggle">
        <label>
          <input
            type="radio"
            name="mode"
            value="distance"
            checked={mode === "distance"}
            onChange={() => setMode("distance")}
          />
          Distance Mode
        </label>
        <label>
          <input
            type="radio"
            name="mode"
            value="time"
            checked={mode === "time"}
            onChange={() => setMode("time")}
          />
          Time Mode
        </label>
      </div>

      <div className="input-section">
        <input
          type="number"
          placeholder={mode === "distance" ? "Enter distance in km" : "Enter time in hours"}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <select
          value={selectedVehicle}
          onChange={(e) => setSelectedVehicle(e.target.value)}
        >
          <option value="">Select Vehicle</option>
          {vehicles.map((v) => (
            <option key={v._id} value={v.type}>
              {v.type}
            </option>
          ))}
        </select>
        <button onClick={calculate}>Calculate</button>
      </div>

      {results.length > 0 && (
        <div className="results-section">
          {results.map((r) => (
            <div
              key={r._id}
              className={`vehicle-card ${
                r.inRange ? "in-range" : "out-range"
              } ${r.type === selectedVehicle ? "selected-vehicle" : ""}`}
            >
              <h3>
                {r.type} {!r.inRange && <span className="out-range-text">❌ Out of Range</span>}
              </h3>
              <p>
                <strong>Distance:</strong> {r.distance.toFixed(2)} km
              </p>
              <p>
                <strong>Time:</strong> {formatTime(r.time)}
              </p>
              <p>
                <strong>Fuel Used:</strong> {r.fuel.toFixed(2)} L
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}