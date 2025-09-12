import { useMemo } from 'react';
import { CurrencyType, ExchangeRates } from '../api/currencyApi';
import { useExchangeRates } from '../queries/currencyQueries';
import { normalizeDecimalSeparator } from '../utils/numberUtils';

type UseCurrencyRatesParams = {
  fromCurrency?: CurrencyType;
  toCurrency?: CurrencyType;
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
  const fromCurrencyCode = fromCurrency?.code || '';
  const toCurrencyCode = toCurrency?.code || '';

  const {
    data: rates,
    isLoading,
    error,
    isFetching,
  } = useExchangeRates(fromCurrencyCode);

  const exchangeRate = useMemo(() => {
    if (!rates) return null;

    const fromRate = rates[fromCurrencyCode];
    const toRate = rates[toCurrencyCode];

    if (!fromRate || !toRate) return null;

    return parseFloat((toRate / fromRate).toFixed(4));
  }, [rates, fromCurrencyCode, toCurrencyCode]);

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
    rates: rates || null,
    isLoading: isLoading || isFetching,
    error: error?.message || null,
    exchangeRate,
    inverseRate,
    convertedAmount,
  };
};
