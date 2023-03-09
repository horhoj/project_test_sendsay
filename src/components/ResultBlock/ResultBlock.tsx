import { FC } from 'react';
import classNames from 'classnames';
import { CalculatorResult, RESULT } from '@entitiesTypes/calculator';
import styles from './ResultBlock.module.scss';

interface ResultBlockProps {
  isSkeletonMode: boolean;
  onFn?: (fn: CalculatorResult) => void;
}

export const ResultBlock: FC<ResultBlockProps> = ({ isSkeletonMode, onFn }) => {
  const handleOnFn = (fn: CalculatorResult) => {
    if (onFn) {
      onFn(fn);
    }
  };

  return (
    <div className={classNames(styles.wrap)}>
      <button
        className={classNames(
          styles.resultBtn,
          !isSkeletonMode && styles.runtimeFnBtn,
        )}
        disabled={isSkeletonMode}
        onClick={() => handleOnFn('=')}
      >
        {RESULT}
      </button>
    </div>
  );
};
