import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './NewOffer.css';

const NewOffer = () => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('http://localhost:5000/acquisition-items');
        setItems(response.data);
      } catch (err) {
        setError('Error fetching acquisition items');
      }
    };

    fetchItems();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post('http://localhost:5000/offers', { title, price, quantity, currency });
      setSuccess('Offer created successfully');
      setTitle('');
      setPrice('');
      setQuantity('');
    } catch (err) {
      setError('Error creating offer');
    }
  };

  return (
    <div className="new-offer-container">
      <h1>Create New Offer</h1>
      <form onSubmit={handleSubmit} className="new-offer-form">
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}

        <div className="form-group">
          <label htmlFor="title">Items</label>
          <select
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          >
            <option value="">Select Item</option>
            {items.map(item => (
              <option key={item.id} value={item.name}>{item.name}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="quantity">Piece</label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="currency">Currency</label>
          <select
            id="currency"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            required
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="TRY">TRY</option>
          </select>
        </div>

        <button type="submit">Create Offer</button>
      </form>
    </div>
  );
};

export default NewOffer;
