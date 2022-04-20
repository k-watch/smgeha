import React from 'react';
import './App.css';
import LoginPage from 'pages/LoginPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProductsPage from 'pages/ProductsPage';
import ProductWritePage from 'pages/ProductWritePage';
import initStyles from 'initStyles';
import { Global } from '@emotion/react';
import { createTheme, ThemeProvider } from '@mui/material';
import { blue } from '@mui/material/colors';
import Footer from 'components/common/Footer';
import Header from 'components/common/Header';

const theme = createTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: blue[500],
    },
    secondary: {
      // This is green.A700 as hex.
      main: '#11cb5f',
    },
  },
});

function App() {
  return (
    <>
      <Global styles={initStyles} />
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/write" element={<ProductWritePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/" element={<LoginPage />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
