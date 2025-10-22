# Vehicle Transport Converter

A full-stack application to calculate, compare, and visualize vehicle travel data based on **distance or time**. Users can check travel time, fuel consumption, and vehicle range limitations. It includes a **React frontend** with interactive charts and a **Node.js + Express backend** fetching data from **MongoDB**.

---

## Features

- **Distance to Time Conversion**: Enter a distance and select a vehicle to see travel time.
- **Time to Distance Conversion**: Enter travel time and see the distance a vehicle can cover.
- **Fuel Consumption**: Shows fuel used for the given distance/time. Out-of-range vehicles are highlighted.
- **One-to-All Comparison**: Compare the selected vehicle with all others in terms of distance, time, and fuel.
- **Interactive Charts**: Dual bar charts displaying **Time/Distance** and **Fuel Consumption**.
- **Responsive Design**: Works well on desktop and mobile devices.
- **Aesthetic UI**: Modern card layout with hover effects, gradients, and color-coded vehicle ranges.

---

## Project Structure

```
project-root/
│
├── Backend/
│   ├── index.js           # Express server setup
│   ├── Database/
│   │   └── database.js    # MongoDB connection and data fetch
│   └── package.json
│
├── Frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── Home.jsx
│   │   ├── home.css
│   │   └── App.jsx
│   ├── package.json
│   └── public/
│
└── README.md
```

---

## Backend Setup

1. Navigate to the `Backend` folder:

```bash
cd Backend
```

2. Install dependencies:

```bash
npm install express mongoose cors
npm install --save-dev nodemon
```

3. Create `.env` file with your MongoDB URI:

```
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/vehicles?retryWrites=true&w=majority
PORT=3000
```

4. Start the backend server:

```bash
nodemon index.js
```

5. API Endpoint:

```
GET http://localhost:3000/Cars
```

- Returns all vehicles with fields:

```json
{
  "_id": "abc123",
  "type": "Maruti Suzuki Alto",
  "topSpeed_kmh": 140,
  "fuelEfficiency_kmpl": 22.05,
  "fuelTankCapacity_l": 35,
  "maxRange_km": 771.75
}
```

---

## Frontend Setup

1. Navigate to the `Frontend` folder:

```bash
cd Frontend
```

2. Install dependencies:

```bash
npm install react react-dom react-scripts react-chartjs-2 chart.js
```

3. Start the frontend:

```bash
npm start
```

4. Features on frontend:

- Input field to enter distance or time.
- Dropdown to select a vehicle.
- Toggle switch for **Distance Mode** or **Time Mode**.
- **Calculate** button to display:
  - Vehicle cards (distance, time, fuel used, out-of-range indication).
  - Dual bar charts for comparison:
    - Left chart: Time or Distance comparison.
    - Right chart: Fuel Consumption comparison.

---

## UI/UX

- **Vehicle Cards**: Highlight selected vehicle, color-coded range (green=in-range, red=out-of-range).
- **Charts**: Interactive bar charts with different colors for selected vehicle and others.
- **Responsive Layout**: Grid for cards on left, charts on right. Mobile-friendly stack layout.

---

## Usage

1. Start MongoDB server and ensure the `Cars` collection is populated with vehicles data.
2. Start the **Backend** server on port 3000.
3. Start the **Frontend** server (React app).
4. Open `http://localhost:3000` in your browser.
5. Enter distance or time, select vehicle, and click **Calculate**.
6. See results and comparison charts.

---

## Tech Stack

- **Frontend**: React, Chart.js, CSS (Flexbox/Grid)
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Tools**: Nodemon, Fetch API

---

## Notes

- Ensure **backend runs before frontend**.
- Use the correct **MongoDB URI** in `.env`.
- The app is fully **responsive** and works on both desktop and mobile.
- Vehicles exceeding max range show **❌ Out of Range**.

