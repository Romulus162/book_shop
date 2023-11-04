import React, { Component } from 'react';
import './Inventory.css';
import BookList from '../components/BookList/BookList';

class InventoryPage extends Component {
  render() {
    return (
      <div className="Inventory-display">
        <BookList />
      </div>
    );
  }
}

export default InventoryPage;
