import React from 'react';
import './App.css';
import LoginPage from 'pages/LoginPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProductsPage from 'pages/ProductsPage';
import ProductWritePage from 'pages/ProductWritePage';
import initStyles from 'initStyles';
import { Global } from '@emotion/react';

function App() {
  return (
    <>
      <Global styles={initStyles} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProductWritePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
