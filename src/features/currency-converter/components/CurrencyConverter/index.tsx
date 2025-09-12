import { useState } from 'react';
import { useOnlineStatus } from '@/hooks/useOnlineStatus';
import { useCurrencyRates } from '../../hooks/useCurrencyRates';
import { useDefaultCurrencies } from '../../hooks/useDefaultCurrencies';
import { InputContainer } from '../InputContainer';
import { ResultContainer } from '../ResultContainer';
import { StatusBar } from '../StatusBar';

import styles from './CurrencyConverter.module.css';

export const CurrencyConverter = () => {
  const [amount, setAmount] = useState('1');
  const isOnline = useOnlineStatus();

  const {
    availableCurrencies,
    defaultFromCurrency,
    defaultToCurrency,
    isLoading: isCurrenciesLoading,
    error: currenciesError,
  } = useDefaultCurrencies();
  const [fromCurrency, setFromCurrency] = useState(defaultFromCurrency);
  const [toCurrency, setToCurrency] = useState(defaultToCurrency);

  const {
    error,
    isLoading: isRatesLoading,
    exchangeRate,
    inverseRate,
    convertedAmount,
  } = useCurrencyRates({
    fromCurrency,
    toCurrency,
    amount,
  });

  const handleSwapCurrenciesClick = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  if (isCurrenciesLoading) {
    return <div>Loading...</div>;
  }

  if (!fromCurrency || !toCurrency || currenciesError) {
    return (
      <div>
        {currenciesError || 'Sorry, this service has no available currencies'}
      </div>
    );
  }

  return (
    <div className={styles.currencyConverter}>
      <StatusBar
        isOnline={isOnline}
        baseCurrency={fromCurrency.code}
        isLoading={isRatesLoading}
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
          availableCurrencies={availableCurrencies}
        />
        <ResultContainer
          fromCurrency={fromCurrency}
          toCurrency={toCurrency}
          amount={amount}
          error={error}
          isLoading={isRatesLoading}
          isOnline={isOnline}
          exchangeRate={exchangeRate}
          inverseRate={inverseRate}
          convertedAmount={convertedAmount}
        />
      </div>
    </div>
  );
};
