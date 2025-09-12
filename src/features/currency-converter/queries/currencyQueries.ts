import { useQuery, UseQueryOptions, QueryClient } from '@tanstack/react-query';
import { fetchExchangeRates, ExchangeRates } from '../api/currencyApi';

export const currencyQueryKeys = {
  all: ['currency'] as const,
  exchangeRates: () => [...currencyQueryKeys.all, 'exchangeRates'] as const,
  exchangeRatesByBase: (baseCurrency: string) =>
    [...currencyQueryKeys.exchangeRates(), baseCurrency] as const,
};

export const exchangeRatesQueryOptions = (
  baseCurrency: string
): UseQueryOptions<ExchangeRates> => ({
  queryKey: currencyQueryKeys.exchangeRatesByBase(baseCurrency),
  queryFn: () => fetchExchangeRates(baseCurrency),
  staleTime: 5 * 60 * 1000,
  gcTime: 24 * 60 * 60 * 1000,
  refetchOnWindowFocus: true,
  refetchOnReconnect: true,
  retry: 1,
});

export const useExchangeRates = (baseCurrency: string) => {
  return useQuery(exchangeRatesQueryOptions(baseCurrency));
};

export const refreshExchangeRates = (
  queryClient: QueryClient,
  baseCurrency: string
) => {
  queryClient.invalidateQueries({
    queryKey: currencyQueryKeys.exchangeRatesByBase(baseCurrency),
  });
};

export const refreshAllExchangeRates = (queryClient: QueryClient) => {
  queryClient.invalidateQueries({
    queryKey: currencyQueryKeys.exchangeRates(),
  });
};
