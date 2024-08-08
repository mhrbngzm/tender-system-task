import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './assets/css/backend.css';
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
    return <p className="error-custom">{error}</p>;
  }

  return (
    <div className="offer-list-container-custom">
      <div className="offer-list-custom">
        {offers.length > 0 ? (
          offers.map((offer) => (
            <div key={offer.id} className="offer-card-custom">
              <div className="offer-card-header-custom">
                <h4 className="offer-card-title-custom">{offer.title}</h4>
              </div>
              <div className="offer-card-body-custom">
                <p className="offer-card-text-custom">Price: {offer.price} {offer.currency}</p>
                <Link to={`/offers/${offer.id}`} className="offer-btn-primary-custom">View Details</Link>
              </div>
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
