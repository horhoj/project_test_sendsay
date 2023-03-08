import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SLICE_NAME } from '@store/Calculator/types';
import { CalculatorBlockType } from '@entitiesTypes/calculator';

interface InitialState {
  calculatorBlockIdList: CalculatorBlockType[];
}

const initialState: InitialState = {
  calculatorBlockIdList: [],
};

export const { actions, reducer } = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    addBlockId: (
      state,
      action: PayloadAction<{
        blockType: CalculatorBlockType;
        position: number;
      }>,
    ) => {
      if (action.payload.blockType === 'display') {
        state.calculatorBlockIdList.unshift('display');
        return;
      }
      state.calculatorBlockIdList
        .splice(action.payload.position, 0, action.payload.blockType)
        .filter((el) => el !== 'display')
        .unshift('display');
    },

    deleteBlockId: (state, action: PayloadAction<number>) => {
      state.calculatorBlockIdList = state.calculatorBlockIdList.filter(
        (_, index) => index !== action.payload,
      );
    },

    swapBlocks: (
      state,
      action: PayloadAction<{ dragId: number; dropId: number }>,
    ) => {
      const { dragId, dropId } = action.payload;
      const tmp = state.calculatorBlockIdList.splice(dragId, 1);
      state.calculatorBlockIdList.splice(dropId, 0, ...tmp);
    },
  },
});
