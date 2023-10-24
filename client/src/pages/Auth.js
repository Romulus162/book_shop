import React, { Component } from 'react';
import './Auth.css';

class AuthPage extends Component {
  state = {
    isLogin: true,
  };

  constructor(props) {
    super(props);
    this.emailEl = React.createRef();
    this.passwordEl = React.createRef();
  }

  switchMode = () => {
    this.setState(prevState => {
      return { isLogin: !prevState.isLogin };
    });
  };
  submitHandler = event => {
    event.preventDefault();
    const email = this.emailEl.current.value;
    const password = this.passwordEl.current.value;

    if (email.trim().length === 0 || password.trim().length === 0) {
      return;
    }

    let request = {
      query: `
        query {
            login(email: "${email}", password: "${password}") {
                staffId
                token
                tokenExpiration
            }
        }
        `,
    };

    if (!this.state.isLogin) {
      request = {
        query: `
            mutation {
              createStaff(staffInput: {email: "${email}", password: "${password}"}){
                _id
                email
              }
            }
              `,
      };
    }

    fetch('http://localhost:8000/api', {
      method: 'POST',
      body: JSON.stringify(request),
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
        console.log(resData);
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <form className="auth-form" onSubmit={this.submitHandler}>
        <div className="form-control">
          <label htmlFor="email">E-Mail</label>
          <input type="email" id="email" ref={this.emailEl} />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" ref={this.passwordEl} />
        </div>
        <div className="form-actions">
          <button type="submit">Submit</button>
          <button type="button" onClick={this.switchMode}>
            Go to {this.state.isLogin ? 'Signup' : 'Login'}
          </button>
        </div>
      </form>
    );
  }
}

export default AuthPage;