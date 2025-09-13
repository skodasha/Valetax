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
  isOnline: boolean;
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
  isOnline,
  exchangeRate,
  inverseRate,
  convertedAmount,
}: ResultContainerPropsType) => {
  const hasError = error || (!isOnline && convertedAmount === null);

  const exchangeValueText = `1 ${fromCurrency.code} = ${hasError ? '?' : exchangeRate + ' ' + toCurrency.code}`;
  const inverseValueText = `1 ${toCurrency.code} = ${hasError ? '?' : inverseRate + ' ' + fromCurrency.code}`;

  const getErrorMessage = () => {
    if (error) {
      return error;
    }

    if (!isOnline && convertedAmount === null) {
      return 'No internet connection. Please connect to get exchange rates.';
    }

    return null;
  };

  const errorMessage = getErrorMessage();

  return (
    <Card>
      <h5 className={styles.title}>Conversion result</h5>

      <div className={styles.mainResult}>
        {hasError ? (
          <div className={styles.error}>
            <p>{errorMessage}</p>
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
          {isLoading ? (
            <div className={`${styles.skeleton} ${styles.skeletonRateValue}`} />
          ) : (
            <p className={styles.rateValue}>{exchangeValueText}</p>
          )}
        </div>
        <div className={styles.rate}>
          <p className={styles.rateLabel}>Inverse Rate:</p>
          {isLoading ? (
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
