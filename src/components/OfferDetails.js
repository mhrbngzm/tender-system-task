import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './OfferDetails.css';

const OfferDetails = () => {
  const { id } = useParams(); // URL parametresinden id'yi al
  const [offer, setOffer] = useState(null); // Teklif verisini tutacak state
  const [error, setError] = useState(''); // Hata mesajını tutacak state

  useEffect(() => {
    const fetchOffer = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/offers/${id}`); // Teklif detaylarını al
        setOffer(response.data); // Teklif verisini state'e ata
      } catch (err) {
        setError('Error fetching offer details'); // Hata durumunda mesajı güncelle
      }
    };

    fetchOffer();
  }, [id]);

  if (error) {
    return <p className="error">{error}</p>; // Hata mesajını göster
  }

  if (!offer) {
    return <p>Loading...</p>; // Teklif verisi yüklenirken "Loading..." mesajı göster
  }

  return (
    <div className="offer-details-container">
      <h1 className="offer-title">{offer.title}</h1>
      <p className="offer-description">{offer.description}</p>
      <p className="offer-price">Price: ${offer.price}</p>
      <p className="offer-date">Created At: {new Date(offer.created_at).toLocaleString()}</p>
    </div>
  );
};

export default OfferDetails;
