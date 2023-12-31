import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { GithubProvider } from './context/context';
import { Auth0Provider } from '@auth0/auth0-react';
import { BrowserRouter as Router } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
    <Auth0Provider 
      domain='dev-qje78g6sz71r3xsb.us.auth0.com'
      clientId='mZcujcSq0qaExZDWQWgB79YzbuVtkEfm'
      redirectUri={window.location.origin}
      cacheLocation='localstorage'
    >
    <GithubProvider>
    <App />
    </GithubProvider>
    </Auth0Provider>
    </Router>
  
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
