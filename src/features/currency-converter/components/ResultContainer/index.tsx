import { Card } from '@/components/Card';
import { CurrencyType } from '@/types/currency';
import { normalizeDecimalSeparator } from '../../utils/numberUtils';

import styles from './ResultContainer.module.css';

type ResultContainerPropsType = {
  fromCurrency: CurrencyType;
  toCurrency: CurrencyType;
  amount: string;
  error: string | null;
  isLoading: boolean;
  exchangeRate: number | null;
  inverseRate: number | null;
  convertedAmount: number | null;
};

export const ResultContainer = ({
  fromCurrency,
  toCurrency,
  amount,
  error,
  isLoading,
  exchangeRate,
  inverseRate,
  convertedAmount,
}: ResultContainerPropsType) => {
  const exchangeValueText = `1 ${fromCurrency.code} = ${exchangeRate} ${toCurrency.code}`;
  const inverseValueText = `1 ${toCurrency.code} = ${inverseRate} ${fromCurrency.code}`;

  return (
    <Card>
      <h5 className={styles.title}>Conversion result</h5>

      <div className={styles.mainResult}>
        {error ? (
          <div className={styles.error}>
            <p>Error loading exchange rates</p>
          </div>
        ) : isLoading ? (
          <div className={`${styles.skeleton} ${styles.skeletonAmount}`} />
        ) : (
          <h3 className={styles.amount}>
            {`${toCurrency.symbol} ${convertedAmount}`}
          </h3>
        )}
        <p className={styles.base}>
          {`${normalizeDecimalSeparator(amount) || '1'} ${fromCurrency.code} =`}
        </p>
      </div>

      <div className={styles.divider} />

      <div className={styles.rates}>
        <div className={styles.rate}>
          <p className={styles.rateLabel}>Exchange Rate:</p>
          {error || isLoading ? (
            <div className={`${styles.skeleton} ${styles.skeletonRateValue}`} />
          ) : (
            <p className={styles.rateValue}>{exchangeValueText}</p>
          )}
        </div>
        <div className={styles.rate}>
          <p className={styles.rateLabel}>Inverse Rate:</p>
          {error || isLoading ? (
            <div className={`${styles.skeleton} ${styles.skeletonRateValue}`} />
          ) : (
            <p className={styles.rateValue}>{inverseValueText}</p>
          )}
        </div>
      </div>

      <div className={styles.divider} />

      <div className={styles.disclaimer}>
        Rates are for informational purposes only and may not reflect real-time
        market rates
      </div>
    </Card>
  );
};
