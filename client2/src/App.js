import React, { Component } from 'react';
import { BrowserRouter, Route, Navigate, Routes } from 'react-router-dom';

import InventoryPage from './pages/Inventory';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <main className="main-content">
        <Routes>
          <Route path="/inventory" element={<InventoryPage />}></Route>
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
