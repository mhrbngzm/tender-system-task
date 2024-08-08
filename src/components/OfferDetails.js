import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './assets/css/backend.css';
import './OfferDetails.css';

const OfferDetails = () => {
  const { id } = useParams(); 
  const [offer, setOffer] = useState(null); 
  const [error, setError] = useState(''); 

  useEffect(() => {
    const fetchOffer = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/offers/${id}`); 
        setOffer(response.data); 
      } catch (err) {
        setError('Error fetching offer details'); 
      }
    };

    fetchOffer();
  }, [id]);

  if (error) {
    return <p className="offer-details-page-error">{error}</p>; 
  }

  if (!offer) {
    return <p>Loading...</p>; 
  }

  return (
    <div className="offer-details-page-container">
      <div className="offer-details-page-card">
        <h4 className="offer-details-page-title">{offer.title}</h4>
        <p className="offer-details-page-description">{offer.description}</p>
        <p className="offer-details-page-price">Price: ${offer.price}</p>
        <p className="offer-details-page-date">Created At: {new Date(offer.created_at).toLocaleString()}</p>
        <a href="/offer-list" className="offer-details-page-btn-primary">Back to Offer List</a>
      </div>
    </div>
  );
};

export default OfferDetails;
