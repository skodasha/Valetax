import { useState, useMemo } from 'react';
import { CurrencyType } from '@/types/currency';
import CloseIcon from '@/assets/icons/close-icon.svg';
import SearchIcon from '@/assets/icons/search-icon.svg';
import CheckIcon from '@/assets/icons/ok-icon.svg';

import styles from './CurrencySelectionModal.module.css';

type CurrencySelectionModalProps = {
  isOpen: boolean;
  onClose: () => void;
  availableCurrencies: CurrencyType[];
  onSelectCurrency: (currency: CurrencyType) => void;
  selectedCurrency?: CurrencyType;
};

export const CurrencySelectionModal = ({
  isOpen,
  onClose,
  availableCurrencies,
  onSelectCurrency,
  selectedCurrency,
}: CurrencySelectionModalProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCurrencies = useMemo(() => {
    if (!searchQuery.trim()) {
      return availableCurrencies;
    }

    const query = searchQuery.toLowerCase();
    return availableCurrencies.filter(
      currency =>
        currency.name.toLowerCase().includes(query) ||
        currency.code.toLowerCase().includes(query)
    );
  }, [searchQuery, availableCurrencies]);

  const handleCurrencySelect = (currency: CurrencyType) => {
    onSelectCurrency(currency);
    onClose();
  };

  const handleClose = () => {
    setSearchQuery('');
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.overlay} onClick={handleClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.header}>
          <h5 className={styles.title}>Select currency</h5>
          <button className={styles.close} onClick={handleClose}>
            <CloseIcon />
          </button>
        </div>

        <p className={styles.description}>
          Choose a currency from the list below or use the search bar to find a
          specific currency.
        </p>

        <div className={styles.search}>
          <SearchIcon />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className={styles.searchField}
          />
        </div>

        <div className={styles.list}>
          {filteredCurrencies.map(currency => (
            <div
              key={currency.code}
              className={`${styles.item} ${
                selectedCurrency?.code === currency.code ? styles.selected : ''
              }`}
              onClick={() => handleCurrencySelect(currency)}
            >
              <div className={styles.itemIcon}>
                <span className={styles.symbol}>{currency.symbol}</span>
              </div>
              <div className={styles.itemContent}>
                <div className={styles.itemCode}>{currency.code}</div>
                <div className={styles.itemName}>{currency.name}</div>
              </div>
              {selectedCurrency?.code === currency.code && (
                <CheckIcon width={18} height={18} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
