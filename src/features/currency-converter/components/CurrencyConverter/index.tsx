import { ResultContainer } from '../ResultContainer';
import { InputContainer } from '../InputContainer';

import styles from './CurrencyConverter.module.css';

export const CurrencyConverter = () => {
  return (
    <div className={styles.currencyConverter}>
      <InputContainer />
      <ResultContainer />
    </div>
  );
};
