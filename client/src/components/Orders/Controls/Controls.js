import React from 'react';

import './Controls.css';

const OrdersControl = props => {
  return (
    <div className="orders-control">
      <button
        className={props.activeOutputType === 'list' ? 'active' : ''}
        onClick={props.onChange.bind(this, 'list')}
      >
        List
      </button>
      <button
        className={props.activeOutputType === 'chart' ? 'active' : ''}
        onClick={props.onChange.bind(this, 'chart')}
      >
        Chart
      </button>
    </div>
  );
};

export default OrdersControl;
