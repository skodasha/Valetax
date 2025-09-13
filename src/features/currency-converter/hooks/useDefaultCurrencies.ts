import { useMemo, useCallback } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { CurrencyType } from '../api/currencyApi';
import { useCurrencies } from '../queries/currenciesQueries';

type CurrencyPreferences = {
  fromCurrency?: CurrencyType;
  toCurrency?: CurrencyType;
  amount: string;
};

type UseDefaultCurrenciesReturn = {
  availableCurrencies: CurrencyType[];
  isLoading: boolean;
  error: string | null;
  defaultFromCurrency?: CurrencyType;
  defaultToCurrency?: CurrencyType;
  preferenceAmount: string;
  updatePreferences: (updates: Partial<CurrencyPreferences>) => void;
  clearPreferences: () => void;
};

const STORAGE_KEY = 'valetax-currency-preferences';

const DEFAULT_PREFERENCES: CurrencyPreferences = {
  amount: '1',
};

export const useDefaultCurrencies = (): UseDefaultCurrenciesReturn => {
  const { data: availableCurrencies = [], isLoading, error } = useCurrencies();

  const [preferences, setPreferences, clearPreferences] =
    useLocalStorage<CurrencyPreferences>(STORAGE_KEY, DEFAULT_PREFERENCES);

  const updatePreferences = useCallback(
    (updates: Partial<CurrencyPreferences>) => {
      setPreferences(prev => ({ ...prev, ...updates }));
    },
    [setPreferences]
  );

  const defaultFromCurrency = useMemo(() => {
    return (
      preferences.fromCurrency ||
      availableCurrencies.find(currency => currency.code === 'USD') ||
      availableCurrencies?.[0]
    );
  }, [availableCurrencies, preferences.fromCurrency]);

  const defaultToCurrency = useMemo(() => {
    return (
      preferences.toCurrency ||
      availableCurrencies.find(currency => currency.code === 'EUR') ||
      availableCurrencies?.[1]
    );
  }, [availableCurrencies, preferences.toCurrency]);

  return {
    availableCurrencies,
    isLoading,
    error: error ? error.message : null,
    defaultFromCurrency,
    defaultToCurrency,
    preferenceAmount: preferences.amount,
    updatePreferences,
    clearPreferences,
  };
};
