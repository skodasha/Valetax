import { Card } from '@/components/Card';

import styles from './ResultContainer.module.css';

export const ResultContainer = () => {
  return (
    <Card>
      <div className={styles.resultContainer}>
        <h5 className={styles.title}>Conversion result</h5>
      </div>
    </Card>
  );
};
