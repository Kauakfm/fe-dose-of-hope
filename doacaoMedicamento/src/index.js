import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { UserProvider } from './hooks/Context/UserContext';
import { AuthProvider } from './hooks/Context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider >
      <App />
    </AuthProvider>
  </React.StrictMode>
);
