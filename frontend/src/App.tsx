import React from 'react';
import './App.css';
import LoginPage from 'pages/LoginPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProductsPage from 'pages/ProductsPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/products/:id" element={<ProductsPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
