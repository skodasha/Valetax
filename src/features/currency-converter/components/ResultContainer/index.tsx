import { Card } from '@/components/Card';
import { CurrencyType } from '@/types/currency';
import styles from './ResultContainer.module.css';

type ResultContainerPropsType = {
  fromCurrency: CurrencyType;
  toCurrency: CurrencyType;
  exchangeRate: string;
  inverseRate: string;
};

export const ResultContainer = ({
  fromCurrency,
  toCurrency,
  exchangeRate,
  inverseRate,
}: ResultContainerPropsType) => {
  const exchangeValue = `1 ${fromCurrency.code} = ${exchangeRate} ${toCurrency.code}`;
  const inverseValue = `1 ${toCurrency.code} = ${inverseRate} ${fromCurrency.code}`;

  return (
    <Card>
      <h5 className={styles.title}>Conversion result</h5>

      <div className={styles.mainResult}>
        <h3
          className={styles.amount}
        >{`${toCurrency.symbol} ${exchangeRate}`}</h3>
        <p className={styles.base}>{`1 ${fromCurrency.code} =`}</p>
      </div>

      <div className={styles.divider} />

      <div className={styles.rates}>
        <div className={styles.rate}>
          <p className={styles.rateLabel}>Exchange Rate:</p>
          <p className={styles.rateValue}>{exchangeValue}</p>
        </div>
        <div className={styles.rate}>
          <p className={styles.rateLabel}>Inverse Rate:</p>
          <p className={styles.rateValue}>{inverseValue}</p>
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
