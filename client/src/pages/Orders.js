import React, { Component } from 'react';
import AuthContext from '../context/Auth-context';
import Spinner from '../components/Spinner/Spinner';

class OrdersPage extends Component {
  state = {
    isLoading: false,
    orders: [],
  };

  static contextType = AuthContext;

  componentDidMount() {
    this.fetchOrders();
  }

  fetchOrders = () => {
    this.setState({ isLoading: true });
    const requestBody = {
      query: `
      query {
        orders {
          _id
          createdAt
          book {
            _id
            title
            author
          }
        }
      }`,
    };

    fetch('http://localhost:8000/api', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.context.token,
      },
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then(resData => {
        const orders = resData.data.orders;
        this.setState({ orders: orders, isLoading: false });
      })
      .catch(err => {
        console.log(err);
        this.setState({ isLoading: false });
      });
  };

  showDetailHandler = bookId => {
    this.setState(prevState => {
      const selectedBook = prevState.books.find(e => e._id === bookId);
      return { selectedBook: selectedBook };
    });
  };

  render() {
    return (
      <>
        {this.state.isLoading ? (
          <Spinner />
        ) : (
          <ul>
            {this.state.orders.map(order => (
              <li key={order._id}>
                {order.book.title} - {order.createdAt}
              </li>
            ))}
          </ul>
        )}
      </>
    );
  }
}

export default OrdersPage;
