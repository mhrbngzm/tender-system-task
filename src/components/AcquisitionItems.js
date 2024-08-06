import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AcquisitionItems.css';

const AcquisitionItems = () => {
  const [name, setName] = useState('');
  const [acquisitionItems, setAcquisitionItems] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAcquisitionItems = async () => {
      try {
        const response = await axios.get('http://localhost:5000/acquisition-items');
        setAcquisitionItems(response.data);
      } catch (err) {
        console.error('Error fetching acquisition items', err);
        setError('Error fetching acquisition items');
      }
    };

    fetchAcquisitionItems();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/acquisition-items', { name });
      setName('');
      const response = await axios.get('http://localhost:5000/acquisition-items');
      setAcquisitionItems(response.data);
    } catch (err) {
      console.error('Error adding acquisition item', err);
      setError('Error adding acquisition item');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/acquisition-items/${id}`);
      // Silinen alım kalemini frontend listeden kaldırın
      setAcquisitionItems(acquisitionItems.filter(item => item.id !== id));
    } catch (err) {
      console.error('Error deleting acquisition item', err);
      setError('Error deleting acquisition item');
    }
  };
  
  return (
    <div className="acquisition-items-container">
      <h1>Add Acquisition Item</h1>
      <form className="acquisition-item-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Item Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button type="submit">Add Item</button>
      </form>
      {error && <p className="error">{error}</p>}
      <div className="acquisition-items-list">
        <h2>Acquisition Items</h2>
        <ul>
          {acquisitionItems.map((item) => (
            <li key={item.id}>
              {item.name}
              <button onClick={() => handleDelete(item.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AcquisitionItems;
