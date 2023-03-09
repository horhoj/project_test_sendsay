import { FC } from 'react';
import classNames from 'classnames';
import { DIGITS_LIST } from '@entitiesTypes/calculator';
import styles from './DigitsBlock.module.scss';

interface DigitsProps {
  isSkeletonMode: boolean;
}

export const DigitsBlock: FC<DigitsProps> = ({ isSkeletonMode }) => {
  return (
    <div className={classNames(styles.wrap)}>
      {DIGITS_LIST.map((el) => (
        <button
          key={el}
          style={{ gridArea: `d${el === ',' ? 'x' : el}` }}
          className={styles.operationBtn}
          disabled={isSkeletonMode}
        >
          {el}
        </button>
      ))}
    </div>
  );
};
