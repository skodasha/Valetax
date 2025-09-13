import { useState } from 'react';
import { useOnlineStatus } from '@/hooks/useOnlineStatus';
import { useCurrencyRates } from '../../hooks/useCurrencyRates';
import { useDefaultCurrencies } from '../../hooks/useDefaultCurrencies';
import { CurrencyType } from '../../api/currencyApi';
import { InputContainer } from '../InputContainer';
import { ResultContainer } from '../ResultContainer';
import { StatusBar } from '../StatusBar';

import styles from './CurrencyConverter.module.css';

export const CurrencyConverter = () => {
  const isOnline = useOnlineStatus();

  const {
    availableCurrencies,
    defaultFromCurrency,
    defaultToCurrency,
    isLoading: isCurrenciesLoading,
    error: currenciesError,
    preferenceAmount,
    updatePreferences,
  } = useDefaultCurrencies();

  const [amount, setAmount] = useState(preferenceAmount || '1');
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

  const handleAmountChange = (newAmount: string) => {
    setAmount(newAmount);
    updatePreferences({ amount: newAmount });
  };

  const handleFromCurrencyChange = (currency: CurrencyType) => {
    setFromCurrency(currency);
    updatePreferences({ fromCurrency: currency });
  };

  const handleToCurrencyChange = (currency: CurrencyType) => {
    setToCurrency(currency);
    updatePreferences({ toCurrency: currency });
  };

  const handleSwapCurrenciesClick = () => {
    const newFromCurrency = toCurrency;
    const newToCurrency = fromCurrency;

    setFromCurrency(newFromCurrency);
    setToCurrency(newToCurrency);

    updatePreferences({
      fromCurrency: newFromCurrency,
      toCurrency: newToCurrency,
    });
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
      <StatusBar isOnline={isOnline} isLoading={isRatesLoading} error={error} />
      <div className={styles.content}>
        <InputContainer
          amount={amount}
          isLoading={isCurrenciesLoading}
          fromCurrency={fromCurrency}
          toCurrency={toCurrency}
          onAmountChange={handleAmountChange}
          onFromCurrencyChange={handleFromCurrencyChange}
          onToCurrencyChange={handleToCurrencyChange}
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
