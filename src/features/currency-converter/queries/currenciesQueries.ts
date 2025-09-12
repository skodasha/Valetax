import { useQuery, UseQueryOptions, QueryClient } from '@tanstack/react-query';
import { fetchAllCurrencies, CurrencyType } from '../api/currencyApi';

export const currenciesQueryKeys = {
  all: ['currencies'] as const,
  list: () => [...currenciesQueryKeys.all, 'list'] as const,
};

export const currenciesQueryOptions = (): UseQueryOptions<CurrencyType[]> => ({
  queryKey: currenciesQueryKeys.list(),
  queryFn: () => fetchAllCurrencies(),
  staleTime: 0,
  gcTime: 7 * 24 * 60 * 60 * 1000,
  refetchOnWindowFocus: true,
  refetchOnReconnect: true,
  retry: 2,
});

export const useCurrencies = () => {
  return useQuery(currenciesQueryOptions());
};

export const refreshCurrencies = (queryClient: QueryClient) => {
  queryClient.invalidateQueries({
    queryKey: currenciesQueryKeys.list(),
  });
};
