import React, { Component } from 'react';
import './Inventory.css';
import BookList from '../components/BookList/BookList';

class InventoryPage extends Component {
  state = {
    loading: true,
    books: [],
  };

  componentDidMount() {
    this.fetchBooks();
  }

  fetchBooks = () => {
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

  render() {
    return (
      <div className="Inventory-display">
        {this.state.loading ? (
          <p>Loading books...</p>
        ) : (
          <BookList books={this.state.books} />
        )}
      </div>
    );
  }
}

export default InventoryPage;
