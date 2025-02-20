import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Importa o componente App
import './App.css'; // Importa o CSS global (opcional)

// Renderiza o componente App dentro da div com id "root" no HTML
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);