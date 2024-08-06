import React, { useState } from 'react';
import axios from 'axios';
import './NewOffer.css';

const NewOffer = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/offers', { title, description, price });
      alert('Offer created successfully');
      setTitle('');
      setDescription('');
      setPrice('');
    } catch (err) {
      setError('Error creating offer');
    }
  };

  const isFormValid = title !== '' && description !== '' && price !== '';

  return (
    <div className="form-container">
      <h2>Create New Offer</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Title
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <label>
          Description
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
        <label>
          Price
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </label>
        <button type="submit" disabled={!isFormValid}>Create Offer</button>
      </form>
    </div>
  );
};

export default NewOffer;
