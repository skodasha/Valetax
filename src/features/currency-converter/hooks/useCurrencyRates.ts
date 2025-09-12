import { useState, useEffect } from 'react';
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
  loading: boolean;
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRates = async (fromCurrency: string) => {
    try {
      setLoading(true);
      setError(null);

      const rates = await currencyService.fetchExchangeRates(fromCurrency);
      setRates(rates);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRates(fromCurrency.code);
  }, [fromCurrency]);

  const getExchangeRate = (
    from: CurrencyType,
    to: CurrencyType
  ): number | null => {
    if (!rates) return null;

    const fromRate = rates[from.code];
    const toRate = rates[to.code];

    if (!fromRate || !toRate) return null;

    return parseFloat((toRate / fromRate).toFixed(4));
  };

  const getInverseRate = (
    from: CurrencyType,
    to: CurrencyType
  ): number | null => {
    const exchangeRate = getExchangeRate(from, to);
    return exchangeRate ? parseFloat((1 / exchangeRate).toFixed(4)) : null;
  };

  const getConvertedAmount = (
    amount: string,
    exchangeRate: number | null
  ): number | null => {
    if (!exchangeRate) return null;

    const normalizedAmount = normalizeDecimalSeparator(amount);
    const numericAmount = parseFloat(normalizedAmount) || 1;

    return parseFloat((numericAmount * exchangeRate).toFixed(4));
  };

  const exchangeRate = getExchangeRate(fromCurrency, toCurrency);
  const inverseRate = getInverseRate(fromCurrency, toCurrency);
  const convertedAmount = getConvertedAmount(amount, exchangeRate);

  return {
    rates,
    loading,
    error,
    exchangeRate,
    inverseRate,
    convertedAmount,
  };
};
