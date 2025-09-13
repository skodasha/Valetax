import { CurrencyConverter } from '@/features/currency-converter';

import styles from './Home.module.css';

const Home = () => {
  return (
    <div className={styles.home}>
      <div className={styles.header}>
        <h1>Currency converter</h1>
        <p className={styles.subtitle}>Get real-time exchange rates</p>
      </div>
      <CurrencyConverter />
    </div>
  );
};

export default Home;
