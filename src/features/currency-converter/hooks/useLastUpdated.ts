import { useState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { currencyQueryKeys } from '../queries/currencyQueries';

export const useLastUpdated = (): Date | null => {
  const queryClient = useQueryClient();
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  useEffect(() => {
    const queryKey = currencyQueryKeys.exchangeRatesByBase();

    const updateLastUpdated = () => {
      const queryState = queryClient.getQueryState(queryKey);
      const newLastUpdated = queryState?.dataUpdatedAt
        ? new Date(queryState.dataUpdatedAt)
        : null;
      setLastUpdated(newLastUpdated);
    };

    updateLastUpdated();

    const unsubscribe = queryClient.getQueryCache().subscribe(event => {
      if (
        event?.query?.queryKey &&
        JSON.stringify(event.query.queryKey) === JSON.stringify(queryKey)
      ) {
        updateLastUpdated();
      }
    });

    return unsubscribe;
  }, [queryClient]);

  return lastUpdated;
};
