import { useMemo } from 'react';
import { CurrencyType } from '../api/currencyApi';
import { useCurrencies } from '../queries/currenciesQueries';

type UseDefaultCurrenciesReturn = {
  availableCurrencies: CurrencyType[];
  isLoading: boolean;
  error: string | null;
  defaultFromCurrency?: CurrencyType;
  defaultToCurrency?: CurrencyType;
};

export const useDefaultCurrencies = (): UseDefaultCurrenciesReturn => {
  const { data: availableCurrencies = [], isLoading, error } = useCurrencies();

  const defaultFromCurrency = useMemo(() => {
    return (
      availableCurrencies.find(currency => currency.code === 'USD') ||
      availableCurrencies?.[0]
    );
  }, [availableCurrencies]);

  const defaultToCurrency = useMemo(() => {
    return (
      availableCurrencies.find(currency => currency.code === 'EUR') ||
      availableCurrencies?.[1]
    );
  }, [availableCurrencies]);

  return {
    availableCurrencies,
    isLoading,
    error: error ? error.message : null,
    defaultFromCurrency,
    defaultToCurrency,
  };
};
