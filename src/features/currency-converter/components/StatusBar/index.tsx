import { useQueryClient } from '@tanstack/react-query';
import styles from './StatusBar.module.css';
import WifiIcon from '@/assets/icons/wifi-on-icon.svg';
import ClockIcon from '@/assets/icons/clock-icon.svg';
import RefreshIcon from '@/assets/icons/reload-icon.svg';
import { refreshExchangeRates } from '../../queries/currencyQueries';
import { formatLastUpdated } from '../../utils/dateUtils';
import { useLastUpdated } from '../../hooks/useLastUpdated';

type StatusBarProps = {
  isOnline: boolean;
  baseCurrency: string;
  isLoading: boolean;
};

export const StatusBar = ({
  isOnline,
  baseCurrency,
  isLoading,
}: StatusBarProps) => {
  const queryClient = useQueryClient();
  const lastUpdated = useLastUpdated(baseCurrency);

  const handleRefresh = () => {
    if (isLoading) return;
    refreshExchangeRates(queryClient, baseCurrency);
  };

  const formattedLastUpdated = formatLastUpdated(lastUpdated);

  return (
    <div className={styles.statusBar}>
      <div
        className={`${styles.statusIndicator} ${isOnline ? styles.online : styles.offline}`}
      >
        <WifiIcon width={12} height={12} />
        <span>{isOnline ? 'Online' : 'Offline'}</span>
      </div>

      <div className={styles.lastUpdated}>
        <ClockIcon width={12} height={12} />
        <span>Last updated: {formattedLastUpdated}</span>
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
