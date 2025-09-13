import { useMemo } from 'react';
import { BASE_CURRENCY, CurrencyType, ExchangeRates } from '../api/currencyApi';
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

  const { data: rates, isLoading, error, isFetching } = useExchangeRates();

  const currencyError = useMemo(() => {
    if (!rates || !fromCurrencyCode || !toCurrencyCode) {
      return null;
    }

    const available = new Set([BASE_CURRENCY, ...Object.keys(rates)]);
    const unknown = [fromCurrencyCode, toCurrencyCode].filter(
      c => !available.has(c)
    );

    if (unknown.length) {
      const error = `Unknown ${unknown.length > 1 ? 'currencies' : 'currency'}: ${unknown.join(', ')}. Please select from available currencies.`;
      return error;
    }

    return null;
  }, [rates, fromCurrencyCode, toCurrencyCode]);

  const exchangeRate = useMemo(() => {
    if (!rates || !fromCurrencyCode || !toCurrencyCode || currencyError)
      return null;

    if (
      fromCurrencyCode === BASE_CURRENCY &&
      toCurrencyCode === BASE_CURRENCY
    ) {
      return 1;
    }

    if (fromCurrencyCode === BASE_CURRENCY) {
      const toRate = rates[toCurrencyCode];
      return toRate ? parseFloat(toRate.toFixed(6)) : null;
    }

    if (toCurrencyCode === BASE_CURRENCY) {
      const fromRate = rates[fromCurrencyCode];
      return fromRate ? parseFloat((1 / fromRate).toFixed(6)) : null;
    }

    const fromRate = rates[fromCurrencyCode];
    const toRate = rates[toCurrencyCode];

    if (!fromRate || !toRate) return null;

    return parseFloat((toRate / fromRate).toFixed(6));
  }, [rates, fromCurrencyCode, toCurrencyCode, currencyError]);

  const inverseRate = useMemo(() => {
    return exchangeRate ? parseFloat((1 / exchangeRate).toFixed(4)) : null;
  }, [exchangeRate]);

  const convertedAmount = useMemo(() => {
    if (!exchangeRate || currencyError) return null;

    const normalizedAmount = normalizeDecimalSeparator(amount);
    const numericAmount = parseFloat(normalizedAmount) || 1;

    return parseFloat((numericAmount * exchangeRate).toFixed(4));
  }, [amount, exchangeRate, currencyError]);

  return {
    rates: rates || null,
    isLoading: isLoading || isFetching,
    error: error?.message || currencyError,
    exchangeRate,
    inverseRate,
    convertedAmount,
  };
};
