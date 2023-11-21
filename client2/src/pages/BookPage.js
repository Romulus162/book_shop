import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './BookPage.css';

const BookPage = () => {
  const handleOrder = () => {
    console.log('Order btn pressed');
  };

  const fetchBooks = () => {
    const requestBody = {
      query: `
      query{
        books {
          _id
          title
          author
          price
          description
          adder {
            _id
            email
          }
        }
      }`,
    };

    fetch('http://localhost:8000/api', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(resData => {
        this.setState({ books: resData.data.books, loading: false });
      })
      .catch(err => {
        console.log(err);
        this.setState({ loading: false });
      });
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
