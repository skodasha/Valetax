import { useQuery, UseQueryOptions, QueryClient } from '@tanstack/react-query';
import { fetchExchangeRates, ExchangeRates } from '../api/currencyApi';

export const currencyQueryKeys = {
  all: ['currency'] as const,
  exchangeRates: () => [...currencyQueryKeys.all, 'exchangeRates'] as const,
  exchangeRatesByBase: () => [...currencyQueryKeys.exchangeRates()] as const,
};

export const exchangeRatesQueryOptions =
  (): UseQueryOptions<ExchangeRates> => ({
    queryKey: currencyQueryKeys.exchangeRatesByBase(),
    queryFn: () => fetchExchangeRates(),
    staleTime: 1000,
    gcTime: 1000,
    refetchInterval: 5 * 60 * 1000,
    refetchIntervalInBackground: true,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 1,
  });

export const useExchangeRates = () => {
  return useQuery(exchangeRatesQueryOptions());
};

export const refreshExchangeRates = (queryClient: QueryClient) => {
  queryClient.invalidateQueries({
    queryKey: currencyQueryKeys.exchangeRatesByBase(),
  });
};
