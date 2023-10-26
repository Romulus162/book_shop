import React, { Component } from 'react';
import { BrowserRouter, Route, Navigate, Routes } from 'react-router-dom';

import AuthPage from './pages/Auth';
import BooksPage from './pages/Books';
import OrdersPage from './pages/Orders';
import MainNavigation from './components/Navigation/MainNav';
import AuthContext from './context/Auth-context';

import './App.css';

class App extends Component {
  state = {
    token: null,
    staffId: null,
  };

  login = (token, staffId, tokenExpiration) => {
    this.setState({ token: token, staffId: staffId });
  };

  logout = () => {
    this.setState({ token: null, staffId: null });
  };

  render() {
    return (
      <BrowserRouter>
        <AuthContext.Provider
          value={{
            token: this.state.token,
            staffId: this.state.staffId,
            login: this.login,
            logout: this.logout,
          }}
        >
          <MainNavigation />
          <main className="main-content">
            <Routes>
              {!this.state.token && (
                <Route path="/" element={<Navigate to="/auth" />} />
              )}
              {this.state.token && (
                <Route path="/" element={<Navigate to="/books" />} />
              )}
              {this.state.token && (
                <Route path="/auth" element={<Navigate to="/books" />} />
              )}
              {!this.state.token && (
                <Route path="/auth" element={<AuthPage />} />
              )}
              <Route path="/books" element={<BooksPage />} />
              {this.state.token && (
                <Route path="/orders" element={<OrdersPage />} />
              )}
            </Routes>
          </main>
        </AuthContext.Provider>
      </BrowserRouter>
    );
  }
}

export default App;
