import React, { Component } from 'react';
import AuthContext from '../context/Auth-context';
import Spinner from '../components/Spinner/Spinner';
import OrderList from '../components/Orders/OrderList/OrderList';
import Chart from '../components/Orders/Chart/Chart';
import OrdersControl from '../components/Orders/Controls/Controls';

class OrdersPage extends Component {
  state = {
    isLoading: false,
    orders: [],
    outputType: 'list',
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
            price
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
      mutation CancelBooking($id: ID!) {
        cancelOrder(orderId: $id) {
          _id
          title
        }
      }`,
      variables: {
        id: orderId,
      },
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

  changeOutputTypeHandler = outputType => {
    if (outputType === 'list') {
      this.setState({ outputType: 'list' });
    } else {
      this.setState({ outputType: 'chart' });
    }
  };

  render() {
    let content = <Spinner />;
    if (!this.state.isLoading) {
      content = (
        <>
          <OrdersControl
            activeOutputType={this.state.outputType}
            onChange={this.changeOutputTypeHandler}
          />
          <div></div>
          <div>
            {this.state.outputType === 'list' ? (
              <OrderList
                orders={this.state.orders}
                onDelete={this.deleteOrderHandler}
              />
            ) : (
              <Chart orders={this.state.orders} />
            )}
          </div>
        </>
      );
    }
    return <>{content}</>;
  }
}

export default OrdersPage;
