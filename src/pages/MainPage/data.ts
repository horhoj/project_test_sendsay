import { getUUID } from '@utils/getUUID';

export interface ElementItem {
  id: string;
  title: string;
  height: number;
}

export const leftELInitialState: ElementItem[] = [
  { id: getUUID(), title: 'test1', height: 60 },
  { id: getUUID(), title: 'test2', height: 60 },
  { id: getUUID(), title: 'test3', height: 230 },
  { id: getUUID(), title: 'test4', height: 60 },
];

export const rightELInitialState: ElementItem[] = [
  { id: getUUID(), title: 'test1', height: 60 },
  { id: getUUID(), title: 'test2', height: 60 },
  { id: getUUID(), title: 'test3', height: 230 },
  { id: getUUID(), title: 'test4', height: 60 },
];
