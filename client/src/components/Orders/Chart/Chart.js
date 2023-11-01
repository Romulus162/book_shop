import React from 'react';

const ORDERS_BUCKETS = {
  Cheap: {
    min: 0,
    max: 100,
  },
  Normal: {
    min: 100,
    max: 200,
  },
  Expensive: {
    min: 200,
    max: 10000,
  },
};

const Chart = props => {
  const output = {};
  for (const bucket in ORDERS_BUCKETS) {
    const filteredOrdersCount = props.orders.reduce((prev, current) => {
      if (
        current.book.price > ORDERS_BUCKETS[bucket].min &&
        current.book.price < ORDERS_BUCKETS[bucket].max
      ) {
        return prev + 1;
      } else {
        return prev;
      }
    }, 0);
    output[bucket] = filteredOrdersCount;
  }
  console.log(output);
  return <p>The Chart!</p>;
};

export default Chart;
