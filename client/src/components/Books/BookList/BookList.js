import React from 'react';

import BookItem from './BookItem/BookItem';

import './BookList.css';

const BookList = props => {
  const books = props.books.map(book => {
    return (
      <BookItem
        key={book._id}
        bookId={book._id}
        title={book.title}
        price={book.price}
        author={book.author}
        staffId={props.authStaffId}
        adderId={book.adder._id}
        onDetail={props.onViewDetail}
      />
    );
  });
  return <ul className="book_list">{books}</ul>;
};

export default BookList;
