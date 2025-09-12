import { useState, useEffect, useCallback, useMemo } from 'react';
import { CurrencyType } from '@/types/currency';
import { currencyService, ExchangeRates } from '../services/currencyService';
import { normalizeDecimalSeparator } from '../utils/numberUtils';

type UseCurrencyRatesParams = {
  fromCurrency: CurrencyType;
  toCurrency: CurrencyType;
  amount: string;
};

type UseCurrencyRatesReturn = {
  rates: ExchangeRates | null;
  isLoading: boolean;
  error: string | null;
  exchangeRate: number | null;
  inverseRate: number | null;
  convertedAmount: number | null;
};

export const useCurrencyRates = ({
  fromCurrency,
  toCurrency,
  amount,
}: UseCurrencyRatesParams): UseCurrencyRatesReturn => {
  const [rates, setRates] = useState<ExchangeRates | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRates = useCallback(async (fromCurrency: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const rates = await currencyService.fetchExchangeRates(fromCurrency);
      setRates(rates);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRates(fromCurrency.code);
  }, [fromCurrency, fetchRates]);

  const exchangeRate = useMemo(() => {
    if (!rates) return null;

    const fromRate = rates[fromCurrency.code];
    const toRate = rates[toCurrency.code];

    if (!fromRate || !toRate) return null;

    return parseFloat((toRate / fromRate).toFixed(4));
  }, [rates, fromCurrency.code, toCurrency.code]);

  const inverseRate = useMemo(() => {
    return exchangeRate ? parseFloat((1 / exchangeRate).toFixed(4)) : null;
  }, [exchangeRate]);

  const convertedAmount = useMemo(() => {
    if (!exchangeRate) return null;

    const normalizedAmount = normalizeDecimalSeparator(amount);
    const numericAmount = parseFloat(normalizedAmount) || 1;

    return parseFloat((numericAmount * exchangeRate).toFixed(4));
  }, [amount, exchangeRate]);

  return {
    rates,
    isLoading,
    error,
    exchangeRate,
    inverseRate,
    convertedAmount,
  };
};
