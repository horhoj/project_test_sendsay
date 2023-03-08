export const PALETTE_DATA = [
  'display',
  'operations',
  'digits',
  'result',
] as const;

export type CalculatorBlockType = (typeof PALETTE_DATA)[number];

export const OPERATION_LIST = ['/', 'X', '-', '+'] as const;

export type CalculatorOperationItem = (typeof OPERATION_LIST)[number];

export const DIGITS_LIST = [
  '7',
  '8',
  '9',
  '4',
  '5',
  '6',
  '1',
  '2',
  '3',
  ',',
  '0',
] as const;

export const RESULT = '=';
