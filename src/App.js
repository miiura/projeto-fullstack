import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { CurrencyProvider, useCurrency } from './contexts/CurrencyContext';
import CurrencyConverter from './components/CurrencyConverter';
import CurrencyInfo from './components/CurrencyInfo';
import './styles.css';

// Componente de conteúdo que usa o Hook
const AppContent = () => {
  const { state } = useCurrency();

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={10} lg={8}>
          {/* Cabeçalho */}
          <div className="text-center mb-5">
            <h1 className="display-4 text-primary mb-3 fw-bold">
              💱 Conversor de Moedas
            </h1>
            <p className="lead text-muted">
              Converta valores entre diferentes moedas usando cotações em tempo real da 
              <strong> Exchange Rate API</strong>
            </p>
            <div className="d-flex justify-content-center gap-2 flex-wrap">
              <span className="badge bg-success">React.js</span>
              <span className="badge bg-info">useReducer</span>
              <span className="badge bg-warning">Context API</span>
              <span className="badge bg-secondary">Bootstrap</span>
              <span className="badge bg-dark">Exchange API</span>
            </div>
          </div>

          {/* Componente Principal */}
          <CurrencyConverter />

          {/* Componente de Informações */}
          <CurrencyInfo />

          {/* Footer */}
          <div className="text-center mt-5 pt-4 border-top">
            <small className="text-muted">
              Projeto Fullstack - ES47B/ES71 | Desenvolvido com React.js e Bootstrap
            </small>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

// Componente principal com Provider
function App() {
  return (
    <CurrencyProvider>
      <AppContent />
    </CurrencyProvider>
  );
}

export default App;