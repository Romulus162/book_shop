import React from 'react';
import BookItem from './BookItem/BookItem';

import './BookList.css';

const BookList = props => {
  return (
    <ul className="book-list">
      {props.books.map(book => (
        <BookItem key={book._id} book={book} />
      ))}
    </ul>
  );
};

export default BookList;
