import { FC } from 'react';
import classNames from 'classnames';
import { RESULT } from '@entitiesTypes/calculator';
import styles from './ResultBlock.module.scss';

interface ResultBlockProps {
  isSkeletonMode: boolean;
}

export const ResultBlock: FC<ResultBlockProps> = ({ isSkeletonMode }) => {
  return (
    <div className={classNames(styles.wrap)}>
      <button className={styles.resultBtn} disabled={isSkeletonMode}>
        {RESULT}
      </button>
    </div>
  );
};
