import React, { useState } from "react";

const AddFood = ({ onAdd }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:5000/add-food", {   // ✅ POST request here
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, price })
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);  // Backend response
      setName("");
      setPrice("");
      onAdd();             // Refresh list after add
    })
    .catch(err => console.log(err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Food Name" value={name} onChange={e => setName(e.target.value)} required />
      <input type="number" placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} required />
      <button type="submit">Add Food</button>
    </form>
  );
};

export default AddFood;