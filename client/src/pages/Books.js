import React, { Component } from 'react';

import Modal from '../components/Modal/Modal';
import Backdrop from '../components/Backdrop/Backdrop';
import './Books.css';

class BooksPage extends Component {
  state = {
    creating: false,
  };

  constructor(props) {
    super(props);
    this.titleRef = React.createRef();
    this.authorRef = React.createRef();
    this.priceRef = React.createRef();
    this.descriptionRef = React.createRef();
  }

  createBookHandler = () => {
    this.setState({ creating: true });
  };

  confirmHandler = () => {
    this.setState({ creating: false });
    const title = this.titleRef.current.value;
    const author = this.authorRef.current.value;
    const price = +this.priceRef.current.value;
    const description = this.descriptionRef.current.value;

    if (
      title.trim().length === 0 ||
      author.trim().length === 0 ||
      price.trim().length === 0 ||
      description.trim().length === 0
    ) {
      return;
    }

    const event = { title, author, price, description };
    console.log(event);
  };

  cancelHandler = () => {
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
            <form>
              <div className="form-control">
                <label htmlFor="Title">Title</label>
                <input type="text" id="title" ref={this.titleRef}></input>
              </div>
              <div className="form-control">
                <label htmlFor="Author">Author</label>
                <input type="text" id="author" ref={this.authorRef}></input>
              </div>
              <div className="form-control">
                <label htmlFor="Price">Price</label>
                <input type="number" id="price" ref={this.priceRef}></input>
              </div>
              <div className="form-control">
                <label htmlFor="Description">Description</label>
                <textarea
                  id="description"
                  rows="4"
                  ref={this.descriptionRef}
                ></textarea>
              </div>
            </form>
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
