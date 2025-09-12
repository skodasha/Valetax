import styles from './CurrencyGroup.module.css';

type CurrencyGroupProps = {
  label: string;
  currency: string;
  currencyName: string;
  symbol: string;
  onClick: () => void;
};

const CurrencyGroup = ({
  label,
  currency,
  currencyName,
  symbol,
  onClick,
}: CurrencyGroupProps) => {
  return (
    <div className={styles.currencyGroup}>
      <label className={styles.label}>{label}</label>
      <button className={styles.currencyButton} onClick={onClick}>
        <div className={styles.currencyIcon}>{symbol}</div>
        <div className={styles.currencyInfo}>
          <div className={styles.currencyCode}>{currency}</div>
          <div className={styles.currencyName}>{currencyName}</div>
        </div>
      </button>
    </div>
  );
};

export default CurrencyGroup;
