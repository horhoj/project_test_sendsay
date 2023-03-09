import { FC } from 'react';
import classNames from 'classnames';
import {
  CalculatorOperations,
  OPERATION_LIST,
} from '@entitiesTypes/calculator';
import styles from './OperationsBlock.module.scss';

interface OperationsBlockProps {
  isSkeletonMode: boolean;
  onFn?: (fn: CalculatorOperations) => void;
}

type Dictionary = {
  [k in CalculatorOperations]?: string;
};

const DICTIONARY: Dictionary = {
  '*': 'x',
} as const;

export const OperationsBlock: FC<OperationsBlockProps> = ({
  isSkeletonMode,
  onFn,
}) => {
  const handleOnFn = (fn: CalculatorOperations) => {
    if (onFn) {
      onFn(fn);
    }
  };

  return (
    <div className={classNames(styles.wrap)}>
      {OPERATION_LIST.map((el) => (
        <button
          key={el}
          className={classNames(
            styles.operationBtn,
            !isSkeletonMode && styles.runtimeFnBtn,
          )}
          disabled={isSkeletonMode}
          onClick={() => handleOnFn(el)}
        >
          {DICTIONARY[el] ? DICTIONARY[el] : el}
        </button>
      ))}
    </div>
  );
};
