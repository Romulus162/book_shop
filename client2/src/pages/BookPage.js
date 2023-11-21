import React, { useState, useEffect } from 'react';
import './BookPage.css';

const BookPage = ({ match }) => {
  const [book, setBook] = useState(null);
  const bookId = match.book.id;

  useEffect(() => {
    const fetchBookData = async () => {
      const mockData = {
        _id: bookId,
        title: 'Mock Book Title',
        author: 'Mock Author',
        description: 'Mock Desciption blah blah blah',
        price: 19.99,
      };
      setBook(mockData);
    };
    fetchBookData();
  }, [bookId]);

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div className="book-page">
      <h1>{book.title}</h1>
      <h2>by {book.author}</h2>
      <p>{book.description}</p>
      <div>Price: ${book.price.toFixed(2)}</div>
    </div>
  );
};

export default BookPage;
