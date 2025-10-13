import React from 'react';
import ReactDOM from 'react-dom/client';

// Importar Bootstrap CSS primeiro
import 'bootstrap/dist/css/bootstrap.min.css';
// Importar nossos estilos personalizados depois
import './styles.css';

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);