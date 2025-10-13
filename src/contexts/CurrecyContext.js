import React, { createContext, useReducer, useContext } from 'react';
import currencyReducer, { initialState, ACTION_TYPES } from '../reducers/currencyReducer';
import { convertCurrency } from '../services/api';

// Criar Context
const CurrencyContext = createContext();

// Provider Component
export const CurrencyProvider = ({ children }) => {
  const [state, dispatch] = useReducer(currencyReducer, initialState);

  // Ações disponíveis para os componentes
  const actions = {
    setAmount: (amount) => {
      dispatch({ type: ACTION_TYPES.SET_AMOUNT, payload: amount });
    },
    
    setFromCurrency: (currency) => {
      dispatch({ type: ACTION_TYPES.SET_FROM_CURRENCY, payload: currency });
    },
    
    setToCurrency: (currency) => {
      dispatch({ type: ACTION_TYPES.SET_TO_CURRENCY, payload: currency });
    },
    
    swapCurrencies: () => {
      dispatch({ type: ACTION_TYPES.SWAP_CURRENCIES });
    },
    
    resetError: () => {
      dispatch({ type: ACTION_TYPES.RESET_ERROR });
    },
    
    performConversion: async () => {
      // Validação local antes de chamar a API
      if (!state.amount || state.amount.trim() === '') {
        dispatch({ 
          type: ACTION_TYPES.CONVERT_ERROR, 
          payload: 'Por favor, digite um valor para converter' 
        });
        return;
      }
      
      const amountValue = parseFloat(state.amount);
      if (isNaN(amountValue) || amountValue <= 0) {
        dispatch({ 
          type: ACTION_TYPES.CONVERT_ERROR, 
          payload: 'Por favor, digite um valor numérico maior que zero' 
        });
        return;
      }
      
      if (state.fromCurrency === state.toCurrency) {
        dispatch({ 
          type: ACTION_TYPES.CONVERT_ERROR, 
          payload: 'Selecione moedas diferentes para conversão' 
        });
        return;
      }

      try {
        const conversionResult = await convertCurrency(
          state.fromCurrency, 
          state.toCurrency, 
          amountValue
        );
        
        dispatch({ 
          type: ACTION_TYPES.CONVERT_SUCCESS, 
          payload: conversionResult 
        });
        
      } catch (error) {
        dispatch({ 
          type: ACTION_TYPES.CONVERT_ERROR, 
          payload: error.message 
        });
      }
    }
  };

  // Valor fornecido pelo Context
  const contextValue = {
    state,
    actions
  };

  return (
    <CurrencyContext.Provider value={contextValue}>
      {children}
    </CurrencyContext.Provider>
  );
};

// Hook personalizado para usar o Context
export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  
  if (!context) {
    throw new Error('useCurrency deve ser usado dentro de um CurrencyProvider');
  }
  
  return context;
};

export default CurrencyContext;