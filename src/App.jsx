import React, { useState, useEffect } from "react";
import AddFood from "./components/AddFood";
import FoodList from "./components/FoodList";
import "./App.css";

function App() {
  const [foods, setFoods] = useState([]);

  // ✅ Fetch all foods from backend
  const fetchFoods = () => {
    fetch("http://localhost:5000/foods")   // GET request to backend
      .then(res => res.json())
      .then(data => setFoods(data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchFoods();  // Load foods when App loads
  }, []);

  return (
    <div className="container">
      <h1>Food Delivery App</h1>
      {/* Pass fetchFoods to AddFood component to refresh list after add */}
      <AddFood onAdd={fetchFoods} />
      {/* Pass foods list and fetchFoods to refresh after delete */}
      <FoodList foods={foods} onDelete={fetchFoods} />
    </div>
  );
}

export default App;