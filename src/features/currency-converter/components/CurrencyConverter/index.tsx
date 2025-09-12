import { useState } from 'react';
import {
  DEFAULT_FROM_CURRENCY,
  DEFAULT_TO_CURRENCY,
} from '@/constants/currencies';
import { CurrencyType } from '@/types/currency';
import { InputContainer } from '../InputContainer';
import { ResultContainer } from '../ResultContainer';

import styles from './CurrencyConverter.module.css';

export const CurrencyConverter = () => {
  const [amount, setAmount] = useState<string>('1');
  const [fromCurrency, setFromCurrency] = useState(DEFAULT_FROM_CURRENCY);
  const [toCurrency, setToCurrency] = useState(DEFAULT_TO_CURRENCY);

  const handleAmountChange = (value: string) => {
    setAmount(value);
  };

  const handleFromCurrencyChange = (currency: CurrencyType) => {
    setFromCurrency(currency);
  };

  const handleToCurrencyChange = (currency: CurrencyType) => {
    setToCurrency(currency);
  };

  const handleSwapCurrenciesClick = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
  };

  return (
    <div className={styles.currencyConverter}>
      <InputContainer
        amount={amount}
        fromCurrency={fromCurrency}
        toCurrency={toCurrency}
        onAmountChange={handleAmountChange}
        onFromCurrencyChange={handleFromCurrencyChange}
        onToCurrencyChange={handleToCurrencyChange}
        onSwapCurrenciesClick={handleSwapCurrenciesClick}
      />
      <ResultContainer />
    </div>
  );
};
