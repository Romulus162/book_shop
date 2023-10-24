import React, { Component } from 'react';
import { BrowserRouter, Route, Navigate, Routes } from 'react-router-dom';

import AuthPage from './pages/Auth';
import BooksPage from './pages/Books';
import OrdersPage from './pages/Orders';
import MainNavigation from './components/Navigation/MainNav';

import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <MainNavigation />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Navigate to="/auth" />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/books" element={<BooksPage />} />
            <Route path="/orders" element={<OrdersPage />} />
          </Routes>
        </main>
      </BrowserRouter>
    );
  }
}

export default App;
