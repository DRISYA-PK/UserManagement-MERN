import { StrictMode } from 'react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
       <Provider store={store}>
         <App />
       </Provider>
  </StrictMode>
  
);