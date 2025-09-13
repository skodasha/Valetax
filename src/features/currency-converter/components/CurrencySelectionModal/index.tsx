import { useState, useMemo, useEffect, useRef, useCallback } from 'react';
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
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

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

  const handleCurrencySelect = useCallback(
    (currency: CurrencyType) => {
      onSelectCurrency(currency);
      onClose();
    },
    [onSelectCurrency, onClose]
  );

  const handleClose = useCallback(() => {
    setSearchQuery('');
    setHighlightedIndex(-1);
    onClose();
  }, [onClose]);

  const scrollToItem = (index: number) => {
    const item = itemRefs.current[index];
    if (item && listRef.current) {
      const listRect = listRef.current.getBoundingClientRect();
      const itemRect = item.getBoundingClientRect();

      if (itemRect.bottom > listRect.bottom) {
        item.scrollIntoView({ behavior: 'smooth', block: 'end' });
      } else if (itemRect.top < listRect.top) {
        item.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  useEffect(() => {
    setHighlightedIndex(-1);
  }, [filteredCurrencies]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setHighlightedIndex(prev => {
            const nextIndex =
              prev < filteredCurrencies.length - 1 ? prev + 1 : 0;
            scrollToItem(nextIndex);
            return nextIndex;
          });
          break;
        case 'ArrowUp':
          e.preventDefault();
          setHighlightedIndex(prev => {
            const nextIndex =
              prev > 0 ? prev - 1 : filteredCurrencies.length - 1;
            scrollToItem(nextIndex);
            return nextIndex;
          });
          break;
        case 'Enter':
          e.preventDefault();
          if (
            highlightedIndex >= 0 &&
            highlightedIndex < filteredCurrencies.length
          ) {
            handleCurrencySelect(filteredCurrencies[highlightedIndex]);
          }
          break;
        case 'Escape':
          e.preventDefault();
          handleClose();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [
    isOpen,
    filteredCurrencies,
    highlightedIndex,
    handleClose,
    handleCurrencySelect,
  ]);

  const handleMouseEnter = (index: number) => {
    setHighlightedIndex(index);
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
            ref={searchInputRef}
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className={styles.searchField}
          />
        </div>

        <div className={styles.list} ref={listRef}>
          {filteredCurrencies.map((currency, index) => (
            <div
              key={currency.code}
              ref={el => {
                itemRefs.current[index] = el;
              }}
              className={`${styles.item} ${
                selectedCurrency?.code === currency.code ? styles.selected : ''
              } ${index === highlightedIndex ? styles.highlighted : ''}`}
              onClick={() => handleCurrencySelect(currency)}
              onMouseEnter={() => handleMouseEnter(index)}
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
