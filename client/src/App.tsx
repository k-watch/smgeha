import './App.css';
import { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import initStyles from 'initStyles';
import { Global } from '@emotion/react';
import { createTheme, ThemeProvider } from '@mui/material';
import { lightBlue } from '@mui/material/colors';
import Footer from 'components/common/Footer';
import Header from 'components/common/header/Header';
import { styled } from '@mui/system';
import ProtectedRoutes from 'modules/router/ProtectedRoutes';
import PublicRoutes from 'modules/router/PublicRoutes';

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

const Main = lazy(() => import('components/main/Main'));
const ProductsPage = lazy(() => import('pages/ProductsPage'));
const ProductPage = lazy(() => import('pages/ProductPage'));
const LoginPage = lazy(() => import('pages/LoginPage'));
const AdminPage = lazy(() => import('pages/admin/AdminPage'));
const ProductWritePage = lazy(() => import('pages/admin/ProductWritePage'));

function App() {
  return (
    <>
      <Global styles={initStyles} />
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Header />
          <Suspense fallback={<div />}>
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
          </Suspense>
          <Footer />
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
