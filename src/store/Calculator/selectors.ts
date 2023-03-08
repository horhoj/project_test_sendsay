import { RootState } from '@store/types';

export const getCalculatorBlockIdList = (state: RootState) =>
  state.calculator.calculatorBlockIdList;
