import { DragEvent, useState } from 'react';

interface UseDNDPayload<D> {
  onSubmit: (
    dragOverIndex: number,
    dropOverIndex: number,
    dndType: D,
    e: DragEvent<HTMLDivElement>,
  ) => void;
  onHandleDragOver: (
    dragOverIndex: number,
    e: DragEvent<HTMLDivElement>,
  ) => void;
}

export const useDND = <D>({ onSubmit, onHandleDragOver }: UseDNDPayload<D>) => {
  const [isDrag, setIsDrag] = useState<boolean>(false);

  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [dropOverIndex, setDropOverIndex] = useState<number | null>(null);
  const [dndType, setDndType] = useState<D | null>(null);

  const handleOnDragStart = (index: number, dndType: D) => () => {
    setDragOverIndex(index);
    setIsDrag(true);
    setDndType(dndType);
  };

  const handleOnDragEnd = () => {
    if (!isDrag) {
      return;
    }
    setIsDrag(false);
    setDropOverIndex(null);
    setDragOverIndex(null);
    setDndType(null);
  };

  const handleOnDragOver =
    (index: number) => (e: DragEvent<HTMLDivElement>) => {
      if (!isDrag) {
        return;
      }
      onHandleDragOver(index, e);

      setDropOverIndex(index);
    };

  const handleOnDragLeave = () => {
    if (!isDrag) {
      return;
    }
    setDropOverIndex(null);
  };

  const handleOnDrop = (index: number) => (e: DragEvent<HTMLDivElement>) => {
    if (!isDrag) {
      return;
    }
    if (dragOverIndex !== null && dropOverIndex !== null && dndType !== null) {
      setTimeout(() => {
        onSubmit(dragOverIndex, index, dndType, e);
      }, 20);
    }
  };

  return {
    isDrag,
    dropOverIndex,
    dragOverIndex,
    dndType,
    handleOnDragStart,
    handleOnDragOver,
    handleOnDragLeave,
    handleOnDrop,
    handleOnDragEnd,
  } as const;
};
