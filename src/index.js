import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Provider from './Auth/Provider/Provider';
import ProviderAPI from './API/ProviderAPI'
import {BrowserRouter} from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider> 
    <ProviderAPI>
      <BrowserRouter>
        <App />
      </BrowserRouter>  
    </ProviderAPI>
  </Provider>
);
