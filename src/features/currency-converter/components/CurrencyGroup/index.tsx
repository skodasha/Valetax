import { useState } from 'react';
import { CurrencyType } from '@/types/currency';
import { CurrencySelectionModal } from '../CurrencySelectionModal';
import styles from './CurrencyGroup.module.css';

type CurrencyGroupProps = {
  label: string;
  currency: CurrencyType;
  onCurrencyChange: (currency: CurrencyType) => void;
  availableCurrencies: CurrencyType[];
};

const CurrencyGroup = ({
  label,
  currency,
  onCurrencyChange,
  availableCurrencies,
}: CurrencyGroupProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCurrencyClick = () => {
    setIsModalOpen(true);
  };

  const handleCurrencySelect = (selectedCurrency: CurrencyType) => {
    onCurrencyChange(selectedCurrency);
    setIsModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className={styles.currencyGroup}>
        <label className={styles.label}>{label}</label>
        <button className={styles.currencyButton} onClick={handleCurrencyClick}>
          <div className={styles.currencyIcon}>
            <span className={styles.symbol}>{currency.symbol}</span>
          </div>
          <div className={styles.currencyInfo}>
            <div className={styles.currencyCode}>{currency.code}</div>
            <div className={styles.currencyName}>{currency.name}</div>
          </div>
        </button>
      </div>

      <CurrencySelectionModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSelectCurrency={handleCurrencySelect}
        selectedCurrency={currency}
        availableCurrencies={availableCurrencies}
      />
    </>
  );
};

export default CurrencyGroup;
