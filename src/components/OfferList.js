import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './OfferList.css';

const OfferList = () => {
  const [offers, setOffers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/offers');
        setOffers(response.data);
      } catch (err) {
        setError('Error fetching offers');
      }
    };

    fetchOffers();
  }, []);

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <div className="offer-list-container">
      <h1>Offers List</h1>
      <div className="offer-list">
        {offers.length > 0 ? (
          offers.map((offer) => (
            <div key={offer.id} className="offer-card">
              <h2 className="offer-title">{offer.title}</h2>
              <p className="offer-description">{offer.description}</p>
              <p className="offer-price">${offer.price}</p>
              <p className="offer-date">Created At: {new Date(offer.created_at).toLocaleString()}</p>
              <Link to={`/offers/${offer.id}`} className="offer-details-link">View Details</Link>
            </div>
          ))
        ) : (
          <p>No offers available</p>
        )}
      </div>
    </div>
  );
};

export default OfferList;
