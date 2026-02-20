import React from "react";

const FoodList = ({ foods, onDelete }) => {

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/delete-food/${id}`, { method: "DELETE" })
      .then(res => res.json())
      .then(() => onDelete())   // Refresh list after delete
      .catch(err => console.log(err));
  };

  return (
    <ul>
      {foods.map(food => (
        <li key={food.id}>
          {food.name} - ₹{food.price}
          <button onClick={() => handleDelete(food.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default FoodList;