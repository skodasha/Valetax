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
  onSwapCurrenciesClick: () => void;
};

export const InputContainer = ({
  amount,
  toCurrency,
  fromCurrency,
  onAmountChange,
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
            currency={fromCurrency.code}
            currencyName={fromCurrency.name}
            symbol={fromCurrency.symbol}
            // TODO: add onFromCurrencyClick
            onClick={() => {}}
          />

          <button className={styles.swapButton} onClick={onSwapCurrenciesClick}>
            <SwapIcon />
          </button>

          <CurrencyGroup
            label="To"
            currency={toCurrency.code}
            currencyName={toCurrency.name}
            symbol={toCurrency.symbol}
            // TODO: add onToCurrencyClick
            onClick={() => {}}
          />
        </div>
      </div>
    </Card>
  );
};
