import React, { useState, useEffect } from 'react';
import { 
  Form, 
  Button, 
  Row, 
  Col, 
  InputGroup,
  Card,
  Alert
} from 'react-bootstrap';
import { useCurrency } from '../contexts/CurrencyContext';

const CurrencyConverter = () => {
  const { state, actions } = useCurrency();
  const [localErrors, setLocalErrors] = useState({});

  // Limpar erros quando o usuário começar a digitar
  useEffect(() => {
    if (state.amount && localErrors.amount) {
      setLocalErrors({});
    }
  }, [state.amount, localErrors.amount]);

  const validateForm = () => {
    const errors = {};

    if (!state.amount || state.amount.trim() === '') {
      errors.amount = 'Campo obrigatório';
    } else if (isNaN(state.amount) || parseFloat(state.amount) <= 0) {
      errors.amount = 'Valor deve ser um número maior que 0';
    }

    setLocalErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      actions.performConversion();
    }
  };

  const handleAmountChange = (value) => {
    actions.setAmount(value);
    // Limpa erro global quando usuário digitar
    if (state.error) {
      actions.resetError();
    }
  };

  const popularMoedas = [
    { code: 'USD', name: 'Dólar Americano', flag: '🇺🇸' },
    { code: 'BRL', name: 'Real Brasileiro', flag: '🇧🇷' },
    { code: 'EUR', name: 'Euro', flag: '🇪🇺' },
    { code: 'GBP', name: 'Libra Esterlina', flag: '🇬🇧' },
    { code: 'JPY', name: 'Iene Japonês', flag: '🇯🇵' },
    { code: 'CAD', name: 'Dólar Canadense', flag: '🇨🇦' },
    { code: 'AUD', name: 'Dólar Australiano', flag: '🇦🇺' },
    { code: 'CHF', name: 'Franco Suíço', flag: '🇨🇭' }
  ];

  return (
    <>
      <Card className="shadow-sm mb-4">
        <Card.Body>
          <Card.Title className="text-center mb-4">
            💱 Conversor de Moedas
          </Card.Title>
          
          {/* Alert de erro global */}
          {state.error && (
            <Alert 
              variant="danger" 
              dismissible 
              onClose={actions.resetError}
              className="mb-4"
            >
              <Alert.Heading>⚠️ Erro na Conversão</Alert.Heading>
              {state.error}
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            {/* Campo Valor */}
            <Form.Group className="mb-4">
              <Form.Label className="fw-bold">Valor a converter:</Form.Label>
              <InputGroup hasValidation>
                <InputGroup.Text>💰</InputGroup.Text>
                <Form.Control
                  type="number"
                  step="0.01"
                  min="0.01"
                  placeholder="Ex: 100.00"
                  value={state.amount}
                  onChange={(e) => handleAmountChange(e.target.value)}
                  isInvalid={!!localErrors.amount}
                  disabled={state.loading}
                />
                <Form.Control.Feedback type="invalid">
                  {localErrors.amount}
                </Form.Control.Feedback>
              </InputGroup>
              <Form.Text className="text-muted">
                Digite o valor que deseja converter
              </Form.Text>
            </Form.Group>

            {/* Seleção de Moedas */}
            <Row className="mb-4">
              <Col md={5}>
                <Form.Group>
                  <Form.Label className="fw-bold">Moeda de origem:</Form.Label>
                  <Form.Select
                    value={state.fromCurrency}
                    onChange={(e) => actions.setFromCurrency(e.target.value)}
                    disabled={state.loading}
                  >
                    {popularMoedas.map(moeda => (
                      <option key={moeda.code} value={moeda.code}>
                        {moeda.flag} {moeda.name} ({moeda.code})
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>

              {/* Botão de Trocar */}
              <Col md={2} className="d-flex align-items-end justify-content-center">
                <Button 
                  variant="outline-primary" 
                  onClick={actions.swapCurrencies}
                  className="swap-btn rounded-circle"
                  title="Trocar moedas"
                  disabled={state.loading}
                >
                  ⇄
                </Button>
              </Col>

              {/* Moeda de Destino */}
              <Col md={5}>
                <Form.Group>
                  <Form.Label className="fw-bold">Moeda de destino:</Form.Label>
                  <Form.Select
                    value={state.toCurrency}
                    onChange={(e) => actions.setToCurrency(e.target.value)}
                    disabled={state.loading}
                  >
                    {popularMoedas.map(moeda => (
                      <option key={moeda.code} value={moeda.code}>
                        {moeda.flag} {moeda.name} ({moeda.code})
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            {/* Botão Converter */}
            <div className="d-grid">
              <Button 
                variant="primary" 
                type="submit" 
                disabled={state.loading}
                size="lg"
                className="fw-bold"
              >
                {state.loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" />
                    Convertendo...
                  </>
                ) : (
                  '🔄 Converter Moeda'
                )}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>

      {/* Resultado da Conversão */}
      {state.result && (
        <Card className="border-success shadow-sm">
          <Card.Body className="text-center py-4">
            <Card.Title className="text-success mb-3">
              ✅ Conversão Realizada com Sucesso!
            </Card.Title>
            <div className="display-6 fw-bold text-success mb-3">
              {state.amount} {state.fromCurrency} = {state.result} {state.toCurrency}
            </div>
            {state.lastUpdate && (
              <Card.Text className="text-muted">
                Atualizado em: {state.lastUpdate}
              </Card.Text>
            )}
            <Card.Text className="text-muted small">
              Dados fornecidos pela Exchange Rate API em tempo real
            </Card.Text>
          </Card.Body>
        </Card>
      )}
    </>
  );
};

export default CurrencyConverter;