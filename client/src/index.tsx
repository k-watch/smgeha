import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';
import * as serviceWorker from './serviceWorker';
import { store } from 'modules/store';
import { setAuth } from 'modules/auth/auth';
import { check } from 'lib/api/auth';

const queryClient = new QueryClient();

async function loadUser() {
  try {
    const auth = localStorage.getItem('auth');
    // 로그인 상태가 아니라면 패스
    if (!auth) return;

    store.dispatch(setAuth(auth));
    await queryClient.fetchQuery('check', check);
  } catch (e) {
    localStorage.removeItem('auth');
  }
}

loadUser();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

serviceWorker.unregister();
