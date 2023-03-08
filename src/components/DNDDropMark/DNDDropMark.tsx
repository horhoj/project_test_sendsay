import { FC } from 'react';
import classNames from 'classnames';
import styles from './DNDDropMark.module.scss';

interface DNDDropMarkProps {
  isTop: boolean;
}

export const DNDDropMark: FC<DNDDropMarkProps> = ({ isTop }) => {
  return (
    <div
      className={classNames(
        styles.wrap,
        isTop ? styles.isTop : styles.isBottom,
      )}
    >
      <div className={styles.internalWrap}>
        <div className={classNames(styles.marker, styles.markerLeft)} />
        <div className={classNames(styles.marker, styles.markerRight)} />
      </div>
    </div>
  );
};
