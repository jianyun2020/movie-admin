import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import App from './App';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import MovieAction from './redux/actions/MovieAction';

store.dispatch(MovieAction.fetchMovies({page: 1}))
store.dispatch(MovieAction.deleteMovie("668716c86b6ab805ab56c70f"))

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>
);