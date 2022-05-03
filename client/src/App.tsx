import React from 'react';
import './App.css';
import LoginPage from 'pages/LoginPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProductsPage from 'pages/ProductsPage';
import ProductWritePage from 'pages/admin/ProductWritePage';
import initStyles from 'initStyles';
import { Global } from '@emotion/react';
import { createTheme, ThemeProvider } from '@mui/material';
import { lightBlue } from '@mui/material/colors';
import Footer from 'components/common/Footer';
import Header from 'components/common/header/Header';
import AdminProductsPage from 'pages/admin/AdminProductsPage';
import { styled } from '@mui/system';

const theme = createTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: lightBlue[400],
    },
    secondary: {
      // This is green.A700 as hex.
      main: '#11cb5f',
    },
  },
});

const Wrap = styled('div')(({ theme }) => ({
  maxWidth: 1257,
  padding: '0 calc(25% - 150px)',
  paddingTop: 80,
}));

function App() {
  return (
    <>
      <Global styles={initStyles} />
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Header />
          <Wrap>
            <Routes>
              <Route path="/" element={<AdminProductsPage />} />
              <Route path={'/write'} element={<ProductWritePage />} />
              <Route path={'/write/:id'} element={<ProductWritePage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/login" element={<LoginPage />} />
            </Routes>
          </Wrap>
          <Footer />
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
