import React from 'react';
import { Card, Badge, ListGroup } from 'react-bootstrap';
import { useCurrency } from '../contexts/CurrencyContext';

const CurrencyInfo = () => {
  const { state } = useCurrency();

  const moedasInfo = {
    'USD': { nome: 'Dólar Americano', pais: 'Estados Unidos' },
    'BRL': { nome: 'Real Brasileiro', pais: 'Brasil' },
    'EUR': { nome: 'Euro', pais: 'União Europeia' },
    'GBP': { nome: 'Libra Esterlina', pais: 'Reino Unido' },
    'JPY': { nome: 'Iene Japonês', pais: 'Japão' },
    'CAD': { nome: 'Dólar Canadense', pais: 'Canadá' },
    'AUD': { nome: 'Dólar Australiano', pais: 'Austrália' },
    'CHF': { nome: 'Franco Suíço', pais: 'Suíça' }
  };

  return (
    <Card className="mt-4">
      <Card.Body>
        <Card.Title className="d-flex align-items-center">
          ℹ️ Informações da Conversão
          <Badge bg="primary" className="ms-2">Context API</Badge>
        </Card.Title>
        
        {/* Status atual */}
        <ListGroup variant="flush" className="mb-3">
          <ListGroup.Item className="d-flex justify-content-between align-items-center">
            <span>Moeda de Origem:</span>
            <Badge bg="primary">
              {state.fromCurrency} - {moedasInfo[state.fromCurrency]?.nome}
            </Badge>
          </ListGroup.Item>
          <ListGroup.Item className="d-flex justify-content-between align-items-center">
            <span>Moeda de Destino:</span>
            <Badge bg="success">
              {state.toCurrency} - {moedasInfo[state.toCurrency]?.nome}
            </Badge>
          </ListGroup.Item>
          <ListGroup.Item className="d-flex justify-content-between align-items-center">
            <span>Status:</span>
            <Badge bg={state.loading ? 'warning' : state.error ? 'danger' : 'success'}>
              {state.loading ? 'Convertendo...' : state.error ? 'Erro' : 'Pronto'}
            </Badge>
          </ListGroup.Item>
        </ListGroup>

        {/* Instruções */}
        <Card.Subtitle className="mb-2">📋 Como usar:</Card.Subtitle>
        <ListGroup variant="flush">
          <ListGroup.Item>✅ Digite o valor que deseja converter</ListGroup.Item>
          <ListGroup.Item>✅ Selecione as moedas de origem e destino</ListGroup.Item>
          <ListGroup.Item>✅ Clique em "Converter" para ver o resultado</ListGroup.Item>
          <ListGroup.Item>✅ Use o botão ⇄ para trocar as moedas</ListGroup.Item>
        </ListGroup>

        <div className="mt-3 p-3 bg-light rounded">
          <small className="text-muted">
            <strong>Tecnologias utilizadas:</strong> React.js, useReducer, Context API, Bootstrap, Axios, Exchange Rate API
          </small>
        </div>
      </Card.Body>
    </Card>
  );
};

export default CurrencyInfo;