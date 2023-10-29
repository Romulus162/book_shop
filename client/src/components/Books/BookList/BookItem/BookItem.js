import React from 'react';

import './BookItem.css';

const BookItem = props => (
  <li key={props.bookId} className="books__list-item">
    <div>
      <h1>{props.title}</h1>
      <h2>
        {props.author} - ${props.price}
      </h2>
    </div>
    <div>
      {props.staffId === props.adderId ? (
        <p>Your the adder of this book</p>
      ) : (
        <button
          className="btn"
          onClick={props.onDetail.bind(this, props.bookId)}
        >
          View Details
        </button>
      )}
    </div>
  </li>
);

export default BookItem;
