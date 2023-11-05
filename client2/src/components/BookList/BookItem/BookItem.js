import React from 'react';

import './BookItem.css';

const BookItem = ({ book }) => (
  <li className="books_list-item">
    <div>
      <h1>{book.title}</h1>
      <h2>{book.author}</h2>
      <p>{book.description}</p>
      <div>Price: ${book.price.toFixed(2)}</div>
    </div>
  </li>
);

export default BookItem;
