import React, { useState } from 'react';

const AddItemForm = ({ handleAddItem }) => {
  const [newItem, setNewItem] = useState({
    name: '',
    category: '',
    cost: '',
    image: '',
    countdown: '',
  });
  const [error, setError] = useState('');

  const handleInputChange = e => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!newItem.name || !newItem.category || !newItem.cost || !newItem.image || !newItem.countdown) {
      setError('All fields are required');
      return;
    }
    handleAddItem({ ...newItem, addedByUser: true });
  };

  return (
    <div className="add-item-form">
      <h3>Add New Item</h3>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" value={newItem.name} onChange={handleInputChange} />
        <input type="text" name="category" placeholder="Category" value={newItem.category} onChange={handleInputChange} />
        <input type="number" name="cost" placeholder="Cost" value={newItem.cost} onChange={handleInputChange} />
        <input type="text" name="image" placeholder="Image URL" value={newItem.image} onChange={handleInputChange} />
        <input type="number" name="countdown" placeholder="Countdown" value={newItem.countdown} onChange={handleInputChange} />
        <button type="submit">Add Item</button>
      </form>
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default AddItemForm;
