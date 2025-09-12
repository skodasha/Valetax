import { useQueryClient } from '@tanstack/react-query';
import styles from './StatusBar.module.css';
import WifiIcon from '@/assets/icons/wifi-on-icon.svg';
import ClockIcon from '@/assets/icons/clock-icon.svg';
import RefreshIcon from '@/assets/icons/reload-icon.svg';
import { useDebounce } from '@/hooks/useDebounce';
import { refreshExchangeRates } from '../../queries/currencyQueries';
import { formatLastUpdated } from '../../utils/dateUtils';
import { useLastUpdated } from '../../hooks/useLastUpdated';

type StatusBarProps = {
  isOnline: boolean;
  baseCurrency: string;
  isLoading: boolean;
  error: string | null;
};

export const StatusBar = ({
  isOnline,
  baseCurrency,
  isLoading,
  error,
}: StatusBarProps) => {
  const queryClient = useQueryClient();
  const lastUpdated = useLastUpdated(baseCurrency);

  const handleRefreshInternal = () => {
    if (isLoading) return;
    refreshExchangeRates(queryClient, baseCurrency);
  };

  const handleRefresh = useDebounce(handleRefreshInternal, 500);

  const formattedLastUpdated = formatLastUpdated(lastUpdated);

  const getLastUpdatedMessage = () => {
    if (error) {
      return error;
    }

    if (!formattedLastUpdated) {
      return isOnline ? 'Loading rates...' : 'No cached rates available';
    }

    return isOnline
      ? `Last updated: ${formattedLastUpdated}`
      : `Using cached rates from ${formattedLastUpdated}`;
  };

  return (
    <div className={styles.statusBar}>
      <div
        className={`${styles.statusIndicator} ${isOnline ? styles.online : styles.offline}`}
      >
        {isOnline && <WifiIcon width={12} height={12} />}
        <span>{isOnline ? 'Online' : 'Offline'}</span>
      </div>

      <div className={styles.lastUpdated}>
        <ClockIcon width={12} height={12} />
        <span>{getLastUpdatedMessage()}</span>
      </div>

      <button
        className={styles.refreshButton}
        onClick={handleRefresh}
        disabled={!isOnline}
      >
        <RefreshIcon width={12} height={12} />
        <span>Refresh rates</span>
      </button>
    </div>
  );
};
