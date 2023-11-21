import React from 'react';
import { Link } from 'react-router-dom';

import './BookItem.css';

const BookItem = ({ book }) => (
  <Link to={`/books/${book.id}`} className="books_list-item">
    <div>
      <h1>{book.title}</h1>
      <h2>{book.author}</h2>
      <p>{book.description}</p>
      <div>Price: ${book.price.toFixed(2)}</div>
    </div>
  </Link>
);

export default BookItem;
