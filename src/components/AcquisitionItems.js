import React, { useState } from 'react';
import axios from 'axios';
import './AcquisitionItems.css';

const AcquisitionItems = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/acquisition-items', { name, description });
      setSuccess('Item added successfully');
      setName('');
      setDescription('');
    } catch (err) {
      setError('Error adding item');
    }
  };

  const isFormValid = name !== '' && description !== '';

  return (
    <div className="acquisition-items-container">
      <h1>Add Acquisition Item</h1>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Name
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Description
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </label>
        <button type="submit" disabled={!isFormValid}>Add Item</button>
      </form>
    </div>
  );
};

export default AcquisitionItems;
