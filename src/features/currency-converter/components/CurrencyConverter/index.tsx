import { useState } from 'react';
import {
  DEFAULT_FROM_CURRENCY,
  DEFAULT_TO_CURRENCY,
} from '@/constants/currencies';
import { InputContainer } from '../InputContainer';
import { ResultContainer } from '../ResultContainer';

import styles from './CurrencyConverter.module.css';

export const CurrencyConverter = () => {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState(DEFAULT_FROM_CURRENCY);
  const [toCurrency, setToCurrency] = useState(DEFAULT_TO_CURRENCY);

  const handleSwapCurrenciesClick = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <div className={styles.currencyConverter}>
      <InputContainer
        amount={amount}
        fromCurrency={fromCurrency}
        toCurrency={toCurrency}
        onAmountChange={setAmount}
        onFromCurrencyChange={setFromCurrency}
        onToCurrencyChange={setToCurrency}
        onSwapCurrenciesClick={handleSwapCurrenciesClick}
      />
      <ResultContainer
        fromCurrency={fromCurrency}
        toCurrency={toCurrency}
        amount={amount}
      />
    </div>
  );
};
