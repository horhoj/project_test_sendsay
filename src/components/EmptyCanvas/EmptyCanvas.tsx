import { FC } from 'react';
import emptyCanvasIcon from '@assets/img/empty-canvas__icon.svg';
import styles from './EmptyCanvas.module.scss';

export const EmptyCanvas: FC = () => {
  return (
    <div className={styles.wrap}>
      <img
        src={emptyCanvasIcon}
        alt="emptyCanvasIcon"
        className={styles.icon}
      />
      <div className={styles.blueTitle}>Перетащите сюда</div>
      <div className={styles.text}>любой элемент </div>
      <div className={styles.text}>из левой панели</div>
    </div>
  );
};
