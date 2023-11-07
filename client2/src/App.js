import React, { Component } from 'react';
import { BrowserRouter, Route, Navigate, Routes } from 'react-router-dom';

import Navigation from './components/Navigation/Navigation';
import InventoryPage from './pages/Inventory';
import ProfilePage from './pages/ProfilePage';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <main className="main-content">
        <Routes>
          <Route path="/inventory" element={<InventoryPage />}></Route>
          <Route path="/profile" element={<ProfilePage />}></Route>
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
