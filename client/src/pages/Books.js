import React, { Component } from 'react';

import Modal from '../components/Modal/Modal';
import Backdrop from '../components/Backdrop/Backdrop';
import BookList from '../components/Books/BookList/BookList';
import Spinner from '../components/Spinner/Spinner';
import AuthContext from '../context/Auth-context';
import './Books.css';

class BooksPage extends Component {
  state = {
    creating: false,
    books: [],
    isLoading: false,
    selectedBook: null,
  };

  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.titleRef = React.createRef();
    this.authorRef = React.createRef();
    this.priceRef = React.createRef();
    this.descriptionRef = React.createRef();
  }

  componentDidMount() {
    this.fetchBooks();
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
      price <= 0 ||
      description.trim().length === 0
    ) {
      return;
    }

    const book = { title, author, price, description };
    console.log(book);

    const requestBody = {
      query: `
          mutation {
            createBook(bookInput: {title: "${title}", author: "${author}", description: "${description}", price: ${price}}){
              _id
              title
              author
              description
              price
              adder {
                _id
                email
              }
            }
          }
            `,
    };

    const token = this.context.token;

    fetch('http://localhost:8000/api', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
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
          const updatedBooks = [...prevState.books];
          updatedBooks.push({
            _id: resData.data.createBook._id,
            title: resData.data.createBook.title,
            author: resData.data.createBook.author,
            description: resData.data.createBook.description,
            price: resData.data.createBook.price,
            adder: {
              _id: this.context.staffId,
            },
          });
          return { books: updatedBooks };
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  cancelHandler = () => {
    this.setState({ creating: false, selectedBook: null });
  };

  fetchBooks() {
    this.setState({ isLoading: true });
    const requestBody = {
      query: `
      query {
        books {
          _id
          title
          author
          description
          price
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
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then(resData => {
        const books = resData.data.books;
        this.setState({ books: books, isLoading: false });
      })
      .catch(err => {
        console.log(err);
        this.setState({ isLoading: false });
      });
  }

  showDetailHandler = bookId => {
    this.setState(prevState => {
      const selectedBook = prevState.books.find(e => e._id === bookId);
      return { selectedBook: selectedBook };
    });
  };

  orderBookHandler = () => {};

  render() {
    return (
      <>
        {(this.state.creating || this.state.selectedBook) && <Backdrop />}
        {this.state.creating && (
          <Modal
            title="Add Book"
            canCancel
            canConfirm
            onCancel={this.cancelHandler}
            onConfirm={this.confirmHandler}
            confirmText="Confirm"
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
        {this.state.selectedBook && (
          <Modal
            title={this.state.selectedBook.title}
            canCancel
            canConfirm
            onCancel={this.cancelHandler}
            onConfirm={this.orderBookHandler}
            confirmText="Order"
          >
            <h1>{this.state.selectedBook.title}</h1>
            <h2>
              {this.state.selectedBook.author} - $
              {this.state.selectedBook.price}
            </h2>
            <p>{this.state.selectedBook.description}</p>
          </Modal>
        )}
        {this.context.token && (
          <div className="books-control">
            <p>Share your liked books!</p>
            <button className="btn" onClick={this.createBookHandler}>
              Create Book
            </button>
          </div>
        )}
        {this.state.isLoading ? (
          <Spinner />
        ) : (
          <BookList
            books={this.state.books}
            authStaffId={this.context.staffId}
            onViewDetail={this.showDetailHandler}
          />
        )}
      </>
    );
  }
}

export default BooksPage;
