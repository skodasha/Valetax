import { useState, useEffect } from 'react';
import { Card } from '@/components/Card';
import SwapIcon from '@/assets/icons/switch-icon.svg';
import { CurrencyType } from '@/types/currency';
import { useDebounce } from '@/hooks/useDebounce';
import { handleAmountKeyDown } from '../../utils/numberUtils';
import CurrencyGroup from '../CurrencyGroup';

import styles from './InputContainer.module.css';

type InputContainerPropsType = {
  amount: string;
  availableCurrencies: CurrencyType[];
  toCurrency: CurrencyType;
  fromCurrency: CurrencyType;
  isLoading: boolean;
  onAmountChange: (value: string) => void;
  onFromCurrencyChange: (currency: CurrencyType) => void;
  onToCurrencyChange: (currency: CurrencyType) => void;
  onSwapCurrenciesClick: () => void;
};

const MAX_AMOUNT_LENGTH = 11;

export const InputContainer = ({
  amount,
  availableCurrencies,
  toCurrency,
  fromCurrency,
  onAmountChange,
  onFromCurrencyChange,
  onToCurrencyChange,
  onSwapCurrenciesClick,
}: InputContainerPropsType) => {
  const [inputValue, setInputValue] = useState(amount);

  const debouncedOnAmountChange = useDebounce(onAmountChange, 250);

  const handleInputChange = (value: string) => {
    if (value.length <= MAX_AMOUNT_LENGTH) {
      setInputValue(value);
      debouncedOnAmountChange(value);
    }
  };

  useEffect(() => {
    setInputValue(amount);
  }, [amount]);

  return (
    <Card>
      <div className={styles.inputContainer}>
        <div className={styles.amountSection}>
          <label className={styles.label}>Amount</label>
          <input
            type="text"
            className={styles.amountInput}
            value={inputValue}
            onChange={e => handleInputChange(e.target.value)}
            onKeyDown={e => handleAmountKeyDown(e, inputValue)}
            placeholder="Enter amount"
            maxLength={MAX_AMOUNT_LENGTH}
          />
        </div>

        <div className={styles.currenciesSection}>
          <CurrencyGroup
            label="From"
            availableCurrencies={availableCurrencies}
            currency={fromCurrency}
            onCurrencyChange={onFromCurrencyChange}
          />

          <button className={styles.swapButton} onClick={onSwapCurrenciesClick}>
            <SwapIcon />
          </button>

          <CurrencyGroup
            label="To"
            availableCurrencies={availableCurrencies}
            currency={toCurrency}
            onCurrencyChange={onToCurrencyChange}
          />
        </div>
      </div>
    </Card>
  );
};
