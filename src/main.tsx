import React from 'react';
import ReactDOM from 'react-dom'; // Changed from 'react-dom/client'
import App from './App';
import './styles/main.css';

// Use React 17 syntax instead of createRoot (React 18)
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);