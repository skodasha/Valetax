import { useMemo } from 'react';
import styles from './StatusBar.module.css';
import WifiIcon from '@/assets/icons/wifi-on-icon.svg';
import ClockIcon from '@/assets/icons/clock-icon.svg';
import RefreshIcon from '@/assets/icons/reload-icon.svg';

type StatusBarProps = {
  isOnline: boolean;
  lastUpdated: Date | null;
  onRefresh: () => void;
  isLoading?: boolean;
};

export const StatusBar = ({
  isOnline,
  lastUpdated,
  onRefresh,
  isLoading = false,
}: StatusBarProps) => {
  const formattedLastUpdated = useMemo(() => {
    if (!lastUpdated) return 'Never';

    return lastUpdated.toLocaleString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  }, [lastUpdated]);

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
        className={`${styles.refreshButton} ${isLoading ? styles.loading : ''}`}
        onClick={onRefresh}
        disabled={isLoading || !isOnline}
      >
        <RefreshIcon width={12} height={12} />
        <span>Refresh rates</span>
      </button>
    </div>
  );
};
