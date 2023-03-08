import { FC } from 'react';
import classNames from 'classnames';
import { useDND } from '@utils/useDND';
import { DNDDropMark } from '@components/DNDDropMark';
import { PALETTE_DATA } from '@entitiesTypes/calculator';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { calculatorSlice } from '@store/Calculator';
import { PaletteItemContainer } from '@components/PaletteItemContainer';
import { EmptyCanvas } from '@components/EmptyCanvas';
import styles from './ConstructorPage.module.scss';

type DndType = 'PaletteToCanvas' | 'CanvasToCanvas';

export const ConstructorPage: FC = () => {
  const calculatorBlockIdList = useAppSelector(
    calculatorSlice.selectors.getCalculatorBlockIdList,
  );
  const dispatch = useAppDispatch();

  const dnd = useDND<DndType>({
    onSubmit: (dragOverIndex, dropOverIndex, dndType) => {
      if (dndType === 'PaletteToCanvas') {
        dispatch(
          calculatorSlice.actions.addBlockId({
            blockType: PALETTE_DATA[dragOverIndex],
            position: dropOverIndex,
          }),
        );
        return;
      }
      if (dndType === 'CanvasToCanvas') {
        dispatch(
          calculatorSlice.actions.swapBlocks({
            dragId: dragOverIndex,
            dropId: dropOverIndex,
          }),
        );
      }
    },
    onHandleDragOver: (dragOverIndex, e) => {
      if (calculatorBlockIdList[dragOverIndex] !== 'display') {
        e.preventDefault();
      }
    },
  });

  const handleDeleteElFromCanvas = (index: number) => {
    dispatch(calculatorSlice.actions.deleteBlockId(index));
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.dndWrap}>
        <div className={styles.columnWrap}>
          {PALETTE_DATA.map((el, index) => {
            const isDraggable = !calculatorBlockIdList.includes(el);
            const classList = classNames(
              styles.elWrap,
              !isDraggable && styles.isDraggableBlock,
              isDraggable && styles.showDragCursor,
              isDraggable && styles.showDragStyle,
            );

            return (
              <div
                key={el}
                className={classList}
                draggable={isDraggable}
                onDragStart={dnd.handleOnDragStart(index, 'PaletteToCanvas')}
                onDragEnd={dnd.handleOnDragEnd}
              >
                <div className={styles.item}>
                  <PaletteItemContainer calculatorBlockType={el} />
                </div>
              </div>
            );
          })}
        </div>
        <div className={classNames(styles.columnWrap, styles.columnDropWrap)}>
          {calculatorBlockIdList.map((el, index) => {
            const isDraggable = el !== 'display';

            const classList = classNames(
              styles.elWrap,
              isDraggable && styles.showDragCursor,
              index === dnd.dragOverIndex &&
                dnd.dndType === 'CanvasToCanvas' &&
                styles.isDraggableBlock,
            );

            const isShowDNDDropMark =
              index === dnd.dropOverIndex &&
              styles.dropElWrapActive &&
              el !== 'display';

            let isTop = true;
            if (
              dnd.dndType === 'CanvasToCanvas' &&
              dnd.dragOverIndex !== null &&
              dnd.dropOverIndex !== null &&
              dnd.dragOverIndex < dnd.dropOverIndex
            ) {
              isTop = false;
            }

            return (
              <div
                key={el}
                className={classList}
                onDragOver={dnd.handleOnDragOver(index)}
                onDragLeave={dnd.handleOnDragLeave}
                onDrop={dnd.handleOnDrop(index)}
                draggable={isDraggable}
                onDragStart={dnd.handleOnDragStart(index, 'CanvasToCanvas')}
                onDragEnd={dnd.handleOnDragEnd}
                onDoubleClick={() => handleDeleteElFromCanvas(index)}
              >
                {isShowDNDDropMark && <DNDDropMark isTop={isTop} />}
                <div className={styles.item}>
                  <PaletteItemContainer calculatorBlockType={el} />
                </div>
              </div>
            );
          })}
          {calculatorBlockIdList.length < PALETTE_DATA.length && (
            <div
              className={styles.last}
              onDragOver={dnd.handleOnDragOver(calculatorBlockIdList.length)}
              onDragLeave={dnd.handleOnDragLeave}
              onDrop={dnd.handleOnDrop(calculatorBlockIdList.length)}
              draggable={false}
              onDragStart={dnd.handleOnDragStart(
                calculatorBlockIdList.length,
                'CanvasToCanvas',
              )}
              onDragEnd={dnd.handleOnDragEnd}
              onDoubleClick={() =>
                handleDeleteElFromCanvas(calculatorBlockIdList.length)
              }
            >
              {calculatorBlockIdList.length === dnd.dropOverIndex &&
                calculatorBlockIdList.length > 0 &&
                styles.dropElWrapActive && <DNDDropMark isTop={true} />}
              <div
                className={classNames(
                  styles.last,
                  calculatorBlockIdList.length === 0 &&
                    styles.columnDropEmptyWrap,
                  dnd.dropOverIndex === 0 &&
                    calculatorBlockIdList.length === 0 &&
                    styles.columnDropEmptyWrapActive,
                )}
              >
                {calculatorBlockIdList.length === 0 && <EmptyCanvas />}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
