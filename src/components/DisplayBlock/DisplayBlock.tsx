import { FC } from 'react';
import classNames from 'classnames';
import styles from './DisplayBlock.module.scss';

interface DisplayProps {
  isSkeletonMode: boolean;
  value?: string;
}

export const DisplayBlock: FC<DisplayProps> = ({ isSkeletonMode, value }) => {
  let val = '0';

  if (!isSkeletonMode && value !== undefined) {
    val = value;
  }

  return (
    <div className={classNames(styles.wrap)}>
      <div className={styles.indicator}>{val}</div>
    </div>
  );
};
