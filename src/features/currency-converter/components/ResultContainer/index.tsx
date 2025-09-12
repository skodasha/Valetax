import { Card } from '@/components/Card';
import { CurrencyType } from '@/types/currency';
import { useCurrencyRates } from '../../hooks/useCurrencyRates';

import styles from './ResultContainer.module.css';
import { normalizeDecimalSeparator } from '../../utils/numberUtils';

type ResultContainerPropsType = {
  fromCurrency: CurrencyType;
  toCurrency: CurrencyType;
  amount: string;
};

export const ResultContainer = ({
  fromCurrency,
  toCurrency,
  amount,
}: ResultContainerPropsType) => {
  const { exchangeRate, inverseRate, convertedAmount } = useCurrencyRates({
    fromCurrency,
    toCurrency,
    amount,
  });

  const exchangeValueText = `1 ${fromCurrency.code} = ${exchangeRate} ${toCurrency.code}`;
  const inverseValueText = `1 ${toCurrency.code} = ${inverseRate} ${fromCurrency.code}`;

  return (
    <Card>
      <h5 className={styles.title}>Conversion result</h5>

      <div className={styles.mainResult}>
        <h3
          className={styles.amount}
        >{`${toCurrency.symbol} ${convertedAmount}`}</h3>

        <p
          className={styles.base}
        >{` ${normalizeDecimalSeparator(amount) || '1'} ${fromCurrency.code} =`}</p>
      </div>

      <div className={styles.divider} />

      <div className={styles.rates}>
        <div className={styles.rate}>
          <p className={styles.rateLabel}>Exchange Rate:</p>
          <p className={styles.rateValue}>{exchangeValueText}</p>
        </div>
        <div className={styles.rate}>
          <p className={styles.rateLabel}>Inverse Rate:</p>
          <p className={styles.rateValue}>{inverseValueText}</p>
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
