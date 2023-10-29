import React from 'react';
import './OrderList.css';

const OrderList = props => (
  <ul className="orders__list">
    {props.orders.map(order => {
      return (
        <li key={order._id} className="order__items">
          <div className="orders__item-data">
            {order.book.title} - {order.createdAt}
          </div>
          <div className="orders_item-actions">
            <button
              className="btn"
              onClick={props.onDelete.bind(this, order._id)}
            >
              Cancel
            </button>
          </div>
        </li>
      );
    })}
  </ul>
);

export default OrderList;
