import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './BookPage.css';

const BookPage = () => {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const { bookId } = useParams();

  useEffect(() => {
    fetchBooks();
  }, [bookId]);

  const fetchBooks = () => {
    const requestBody = {
      query: `
      query Book($id: ID!) {
        book(id: $id) {
            title
            author
            description
            price
        }
      }`,
      variables: {
        id: bookId,
      },
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
        if (resData.data.book) {
          setBook(resData.data.book);
        }
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        this.setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  };

  const handleOrder = () => {
    console.log('Order btn pressed');
  };

  return (
    <div className="book-container">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h1>{book?.title}</h1>
          <div className="book-info">
            <h2>{book?.author}</h2>
            <p>{book?.description}</p>
            <p>${book?.price}</p>

            <button onClick={handleOrder} className="order-bk-btn">
              Order
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default BookPage;
