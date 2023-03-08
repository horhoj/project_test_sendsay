import { FC } from 'react';
import classNames from 'classnames';
import { OPERATION_LIST } from '@entitiesTypes/calculator';
import styles from './OperationsBlock.module.scss';

interface OperationsBlockProps {
  isSkeletonMode: boolean;
}

export const OperationsBlock: FC<OperationsBlockProps> = ({
  isSkeletonMode,
}) => {
  return (
    <div className={classNames(styles.wrap)}>
      {OPERATION_LIST.map((el) => (
        <button
          key={el}
          className={styles.operationBtn}
          disabled={isSkeletonMode}
        >
          {el}
        </button>
      ))}
    </div>
  );
};
