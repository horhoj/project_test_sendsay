import { FC } from 'react';
import classNames from 'classnames';
import styles from './DisplayBlock.module.scss';

interface DisplayProps {
  isSkeletonMode: boolean;
}

export const DisplayBlock: FC<DisplayProps> = ({ isSkeletonMode }) => {
  return (
    <div className={classNames(styles.wrap)}>
      <div className={styles.indicator}>{0}</div>
    </div>
  );
};
