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
import AdminPage from 'pages/admin/AdminPage';
import { styled } from '@mui/system';
import ProductPage from 'pages/ProductPage';
import ProtectedRoutes from 'modules/router/ProtectedRoutes';
import PublicRoutes from 'modules/router/PublicRoutes';
import Main from 'components/main/Main';

const theme = createTheme({
  typography: {
    fontFamily: ['Roboto', 'Noto Sans KR', 'sans-serif'].join(','),
  },
  palette: {
    primary: {
      main: lightBlue[400],
    },
  },
});

const Wrap = styled('div')(({ theme }) => ({
  maxWidth: 1257,
  padding: '0 calc(25% - 150px)',
  paddingTop: 80,

  [theme.breakpoints.down('sm')]: {
    padding: '0 20px',
    paddingTop: 60,
  },
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
              <Route path="/introduce" element={<Main />} />
              <Route path="/" element={<ProductsPage />} />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/" element={<PublicRoutes />}>
                <Route path="/login" element={<LoginPage />} />
              </Route>
              <Route path="/" element={<ProtectedRoutes />}>
                <Route path="/admin" element={<AdminPage />} />
                <Route path={'admin/write'} element={<ProductWritePage />} />
                <Route
                  path={'admin/write/:id'}
                  element={<ProductWritePage />}
                />
              </Route>
            </Routes>
          </Wrap>
          <Footer />
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
