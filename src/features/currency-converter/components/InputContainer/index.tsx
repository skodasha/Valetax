import { Card } from '@/components/Card';
import SwapIcon from '@/assets/icons/switch-icon.svg';
import { CurrencyType } from '@/types/currency';
import CurrencyGroup from '../CurrencyGroup';

import styles from './InputContainer.module.css';

type InputContainerPropsType = {
  amount: string;
  toCurrency: CurrencyType;
  fromCurrency: CurrencyType;
  onAmountChange: (value: string) => void;
  onFromCurrencyChange: (currency: CurrencyType) => void;
  onToCurrencyChange: (currency: CurrencyType) => void;
  onSwapCurrenciesClick: () => void;
};

export const InputContainer = ({
  amount,
  toCurrency,
  fromCurrency,
  onAmountChange,
  onFromCurrencyChange,
  onToCurrencyChange,
  onSwapCurrenciesClick,
}: InputContainerPropsType) => {
  return (
    <Card>
      <div className={styles.inputContainer}>
        <div className={styles.amountSection}>
          <label className={styles.label}>Amount</label>
          <input
            type="number"
            className={styles.amountInput}
            value={amount}
            onChange={e => onAmountChange(e.target.value)}
            placeholder="Enter amount"
          />
        </div>

        <div className={styles.currenciesSection}>
          <CurrencyGroup
            label="From"
            currency={fromCurrency}
            onCurrencyChange={onFromCurrencyChange}
          />

          <button className={styles.swapButton} onClick={onSwapCurrenciesClick}>
            <SwapIcon />
          </button>

          <CurrencyGroup
            label="To"
            currency={toCurrency}
            onCurrencyChange={onToCurrencyChange}
          />
        </div>
      </div>
    </Card>
  );
};
