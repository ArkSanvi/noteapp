import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Make sure this path matches your file structure
import './index.css'; // Optional: if you have global styles

// Mount the React app to the DOM
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
