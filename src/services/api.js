import axios from 'axios';

const API_KEY = 'de6e266639de39f3cd8a2aa1';
const BASE_URL = 'https://api.exchangerate-api.com/v4/latest';

/**
 * Converte um valor entre duas moedas
 */
export const convertCurrency = async (fromCurrency, toCurrency, amount) => {
  try {
    // Validações iniciais
    if (!fromCurrency || !toCurrency) {
      throw new Error('Moedas de origem e destino são obrigatórias');
    }
    
    if (!amount || amount <= 0) {
      throw new Error('Valor deve ser maior que zero');
    }

    console.log(`Convertendo: ${amount} ${fromCurrency} para ${toCurrency}`);
    
    // Fazer requisição para a API
    const response = await axios.get(`${BASE_URL}/${fromCurrency}`);
    
    // Verificar se a resposta é válida
    if (!response.data || !response.data.rates) {
      throw new Error('Resposta inválida da API');
    }
    
    const rate = response.data.rates[toCurrency];
    
    if (!rate) {
      throw new Error(`Taxa de câmbio para ${toCurrency} não encontrada`);
    }
    
    // Calcular resultado
    const result = (amount * rate).toFixed(2);
    const timestamp = new Date().toLocaleTimeString();
    
    console.log(`Conversão realizada: ${amount} ${fromCurrency} = ${result} ${toCurrency}`);
    
    return {
      result,
      rate,
      timestamp
    };
    
  } catch (error) {
    console.error('Erro na conversão:', error);
    
    // Tratamento de erros específicos
    if (error.response && error.response.status === 429) {
      throw new Error('Limite de requisições excedido. Tente novamente em alguns instantes.');
    } else if (error.code === 'NETWORK_ERROR') {
      throw new Error('Erro de conexão. Verifique sua internet.');
    } else {
      throw new Error(error.message || 'Erro ao converter moeda. Tente novamente.');
    }
  }
};

/**
 * Busca lista de moedas suportadas
 */
export const getSupportedCurrencies = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/USD`);
    return {
      currencies: Object.keys(response.data.rates),
      baseCurrency: response.data.base
    };
  } catch (error) {
    throw new Error('Erro ao buscar lista de moedas: ' + error.message);
  }
};