import React, { useState, useEffect } from 'react';
import './BookPage.css';

const BookPage = () => {
  const handleOrder = () => {
    console.log('Order btn pressed');
  };

  return (
    <div className="book-container">
      <h1>Book Name</h1>
      <div className="book-info">
        <img src="book-picture-url.jpg" alt="Bkimg" />
        <h2>Book author</h2>
        <p>description</p>
        <p>price</p>

        <button onClick={handleOrder} className="order-bk-btn">
          Order
        </button>
      </div>
    </div>
  );
};

export default BookPage;
