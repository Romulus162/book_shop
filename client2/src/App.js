import React, { Component } from 'react';
import { BrowserRouter, Route, Navigate, Routes } from 'react-router-dom';

import Navigation from './components/Navigation/Navigation';
import InventoryPage from './pages/Inventory';
import ProfilePage from './pages/ProfilePage';

import './App.css';
import AuthPage from './pages/AuthPage';

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <main className="main-content">
        <Routes>
          <Route path="/inventory" element={<InventoryPage />}></Route>
          <Route path="/profile" element={<ProfilePage />}></Route>
          <Route path="/auth" element={<AuthPage />}></Route>
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
