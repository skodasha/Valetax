import { useState } from 'react';
import {
  DEFAULT_FROM_CURRENCY,
  DEFAULT_TO_CURRENCY,
} from '@/constants/currencies';
import { useOnlineStatus } from '@/hooks/useOnlineStatus';
import { useCurrencyRates } from '../../hooks/useCurrencyRates';
import { InputContainer } from '../InputContainer';
import { ResultContainer } from '../ResultContainer';
import { StatusBar } from '../StatusBar';

import styles from './CurrencyConverter.module.css';

export const CurrencyConverter = () => {
  const [amount, setAmount] = useState('1');
  const [fromCurrency, setFromCurrency] = useState(DEFAULT_FROM_CURRENCY);
  const [toCurrency, setToCurrency] = useState(DEFAULT_TO_CURRENCY);

  const isOnline = useOnlineStatus();

  const { error, isLoading, exchangeRate, inverseRate, convertedAmount } =
    useCurrencyRates({
      fromCurrency,
      toCurrency,
      amount,
    });

  const handleSwapCurrenciesClick = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <div className={styles.currencyConverter}>
      <StatusBar
        isOnline={isOnline}
        baseCurrency={fromCurrency.code}
        isLoading={isLoading}
        error={error}
      />
      <div className={styles.content}>
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
          error={error}
          isLoading={isLoading}
          isOnline={isOnline}
          exchangeRate={exchangeRate}
          inverseRate={inverseRate}
          convertedAmount={convertedAmount}
        />
      </div>
    </div>
  );
};
