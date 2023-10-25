import React, { Component } from 'react';
import { BrowserRouter, Route, Navigate, Routes } from 'react-router-dom';

import AuthPage from './pages/Auth';
import BooksPage from './pages/Books';
import OrdersPage from './pages/Orders';
import MainNavigation from './components/Navigation/MainNav';
import authContext from './context/auth-context';

import './App.css';
import AuthContext from './context/auth-context';

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
        <authContext.Provider
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
              <Route path="/" element={<Navigate to="/auth" />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/books" element={<BooksPage />} />
              <Route path="/orders" element={<OrdersPage />} />
            </Routes>
          </main>
        </authContext.Provider>
      </BrowserRouter>
    );
  }
}

export default App;
