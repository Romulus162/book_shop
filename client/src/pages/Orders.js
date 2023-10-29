import React, { Component } from 'react';
import AuthContext from '../context/Auth-context';
import Spinner from '../components/Spinner/Spinner';
import OrderList from '../components/Orders/OrderList/OrderList';

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

  deleteOrderHandler = orderId => {
    this.setState({ isLoading: true });
    const requestBody = {
      query: `
      mutation {
        cancelOrder(orderId: "${orderId}") {
          _id
          title
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
        this.setState(prevState => {
          const uppdatedOrders = prevState.orders.filter(order => {
            return order._id !== orderId;
          });
          return { orders: uppdatedOrders, isLoading: false };
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({ isLoading: false });
      });
  };

  render() {
    return (
      <>
        {this.state.isLoading ? (
          <Spinner />
        ) : (
          <OrderList
            orders={this.state.orders}
            onDelete={this.deleteOrderHandler}
          />
        )}
      </>
    );
  }
}

export default OrdersPage;
