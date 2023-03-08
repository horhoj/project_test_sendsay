import { FC, useState } from 'react';
import {
  ElementItem,
  leftELInitialState,
  rightELInitialState,
} from '@pages/MainPage/data';
import classNames from 'classnames';
import { useDND } from '@pages/MainPage/useDND';
import styles from './MainPage.module.scss';

type DndType = 'PaletteToCanvas' | 'CanvasToCanvas';

export const MainPage: FC = () => {
  const [paletteData, setPaletteData] =
    useState<ElementItem[]>(leftELInitialState);
  const [canvasData, setcanvasData] =
    useState<ElementItem[]>(rightELInitialState);

  const dnd = useDND<DndType>({
    onSubmit: (dragOverIndex, dropOverIndex, dndType, e) => {
      console.log(dndType, dragOverIndex, dropOverIndex);
    },
    onHandleDragOver: (dragOverIndex, e) => {
      if (dragOverIndex > 0) {
        e.preventDefault();
      }
    },
  });

  return (
    <div className={styles.wrap}>
      <div>MainPage</div>
      <div className={styles.dndWrap}>
        <div className={styles.columnWrap}>
          {paletteData.map((el, index) => (
            <div
              key={el.id}
              className={styles.elWrap}
              draggable={true}
              onDragStart={dnd.handleOnDragStart(index, 'PaletteToCanvas')}
              onDragEnd={dnd.handleOnDragEnd}
            >
              <div className={styles.item} style={{ height: `${el.height}px` }}>
                {el.title}
              </div>
            </div>
          ))}
        </div>
        <div className={classNames(styles.columnWrap, styles.columnDropWrap)}>
          {canvasData.map((el, index) => (
            <div
              key={el.id}
              className={classNames(
                styles.elWrap,
                index === dnd.dropOverIndex && styles.dropElWrapActive,
              )}
              onDragOver={dnd.handleOnDragOver(index)}
              onDragLeave={dnd.handleOnDragLeave}
              onDrop={dnd.handleOnDrop(index)}
              draggable={true}
              onDragStart={dnd.handleOnDragStart(index, 'CanvasToCanvas')}
              onDragEnd={dnd.handleOnDragEnd}
            >
              <div className={styles.item} style={{ height: `${el.height}px` }}>
                {el.title}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
