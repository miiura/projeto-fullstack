import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { CurrencyProvider, useCurrency } from './contexts/CurrencyContext';
import CurrencyConverter from './components/CurrencyConverter';
import CurrencyInfo from './components/CurrencyInfo';
import 'bootstrap/dist/css/bootstrap.min.css';



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

function App() {
  return (
    <CurrencyProvider>
      <AppContent />
    </CurrencyProvider>
  );
}

export default App;