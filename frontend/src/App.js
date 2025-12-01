import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { CurrencyProvider } from './contexts/CurrencyContext';
import CurrencyConverter from './components/CurrencyConverter';
import CurrencyInfo from './components/CurrencyInfo';

import Login from './components/Login'; 
import 'bootstrap/dist/css/bootstrap.min.css';


// Componente de rota protegida
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
};


// Conteúdo principal (Home)
const AppContent = () => {
  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <h1 className="text-center mb-4">💱 Conversor de Moedas</h1>
          <p className="text-center text-muted mb-5">
            Converta moedas usando React useReducer + Context API
          </p>

          <CurrencyConverter />
          <CurrencyInfo />
        </Col>
      </Row>
    </Container>
  );
};

// APP PRINCIPAL COM ROTAS
function App() {
  return (
    <CurrencyProvider>
      <BrowserRouter>
        <Routes>
          {/* Página de Login */}
          <Route path="/login" element={<Login />} />

          {/* Página principal protegida */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <AppContent />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </CurrencyProvider>
  );
}

export default App;
