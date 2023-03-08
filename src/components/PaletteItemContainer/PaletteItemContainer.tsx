import { FC } from 'react';
import { CalculatorBlockType } from '@entitiesTypes/calculator';
import { DisplayBlock } from '@components/DisplayBlock';
import { OperationsBlock } from '@components/OperationsBlock';
import { DigitsBlock } from '@components/DigitsBlock';
import { ResultBlock } from '@components/ResultBlock';

interface PaletteItemContainerProps {
  calculatorBlockType: CalculatorBlockType;
}

export const PaletteItemContainer: FC<PaletteItemContainerProps> = ({
  calculatorBlockType,
}) => {
  return (
    <div style={{ pointerEvents: 'none' }}>
      {calculatorBlockType === 'display' && (
        <DisplayBlock isSkeletonMode={true} />
      )}
      {calculatorBlockType === 'operations' && (
        <OperationsBlock isSkeletonMode={true} />
      )}
      {calculatorBlockType === 'digits' && (
        <DigitsBlock isSkeletonMode={true} />
      )}
      {calculatorBlockType === 'result' && (
        <ResultBlock isSkeletonMode={true} />
      )}
    </div>
  );
};
