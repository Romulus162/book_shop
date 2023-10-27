import React, { Component } from 'react';

import Modal from '../components/Modal/Modal';
import Backdrop from '../components/Backdrop/Backdrop';
import './Books.css';

class BooksPage extends Component {
  state = {
    creating: false,
  };

  createBookHandler = () => {
    this.setState({ creating: true });
  };

  cancelHandler = () => {
    this.setState({ creating: false });
  };

  confirmHandler = () => {
    this.setState({ creating: false });
  };

  render() {
    return (
      <>
        {this.state.creating && <Backdrop />}
        {this.state.creating && (
          <Modal
            title="Add Book"
            canCancel
            canConfirm
            onCancel={this.cancelHandler}
            onConfirm={this.confirmHandler}
          >
            <p>modal content</p>
          </Modal>
        )}
        <div className="books-control">
          <p>Share your liked books!</p>
          <button className="btn" onClick={this.createBookHandler}>
            Create Book
          </button>
        </div>
      </>
    );
  }
}

export default BooksPage;
