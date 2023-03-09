import { FC } from 'react';
import classNames from 'classnames';
import { CalculatorDigits, DIGITS_LIST } from '@entitiesTypes/calculator';
import styles from './DigitsBlock.module.scss';

interface DigitsProps {
  isSkeletonMode: boolean;
  onFn?: (fn: CalculatorDigits) => void;
}

export const DigitsBlock: FC<DigitsProps> = ({ isSkeletonMode, onFn }) => {
  const handleOnFn = (fn: CalculatorDigits) => {
    if (onFn) {
      onFn(fn);
    }
  };

  return (
    <div className={classNames(styles.wrap)}>
      {DIGITS_LIST.map((el) => (
        <button
          key={el}
          style={{ gridArea: `d${el === '.' ? 'x' : el}` }}
          className={classNames(
            styles.operationBtn,
            !isSkeletonMode && styles.runtimeFnBtn,
          )}
          disabled={isSkeletonMode}
          onClick={() => handleOnFn(el)}
        >
          {el}
        </button>
      ))}
    </div>
  );
};
