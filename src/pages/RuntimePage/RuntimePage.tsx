import { FC, Fragment, useRef, useState } from 'react';
import { useAppSelector } from '@store/hooks';
import { calculatorSlice } from '@store/Calculator';
import { DisplayBlock } from '@components/DisplayBlock';
import { OperationsBlock } from '@components/OperationsBlock';
import { DigitsBlock } from '@components/DigitsBlock';
import { ResultBlock } from '@components/ResultBlock';
import {
  CalculatorDigits,
  CalculatorOperations,
} from '@entitiesTypes/calculator';
import styles from './RuntimePage.module.scss';

const MAX_DIGITS = 10;

export const RuntimePage: FC = () => {
  const calculatorBlockIdList = useAppSelector(
    calculatorSlice.selectors.getCalculatorBlockIdList,
  );

  const [value, setValue] = useState<string>('0');

  const calcReg1 = useRef<string>('');
  const calcReg2 = useRef<string>('');
  const calcRegOperation = useRef<string | null>(null);

  const handleOnDigit = (fn: CalculatorDigits) => {
    //если в числе уже есть точка, то тогда ее не вводим второй раз
    if (fn === '.' && calcReg1.current.includes('.')) {
      return;
    }
    //если число превышает максимальное кол-во разрядов
    if (calcReg1.current.length >= MAX_DIGITS) {
      return;
    }
    //если в первом регистре 0 и введено 0
    if (calcReg1.current === '0' && fn === '0') {
      return;
    }
    //иначе записываем в первый регистр калькулятора
    if (fn === '.' && calcReg1.current === '') {
      calcReg1.current = '0' + fn;
      setValue(calcReg1.current);
      return;
    }

    if (calcReg1.current === '0') {
      if (fn === '.') {
        calcReg1.current += fn;
      } else {
        calcReg1.current = fn;
      }
      setValue(calcReg1.current);
      return;
    }

    if (calcReg1.current !== '0') {
      calcReg1.current += fn;
      setValue(calcReg1.current);
    }
  };

  const handleOnOperation = (fn: CalculatorOperations) => {
    // если регистр операции не пуст, то тогда ничего не делаем
    if (calcRegOperation.current !== null) {
      return;
    }

    //если первый регистр пуст, то тогда тоже ничего не делаем
    if (calcReg1.current === '') {
      return;
    }

    //если нажата клавиша операции, то копируем текущее число из первого регистра во второй регистр
    calcReg2.current = calcReg1.current;
    //обнуляем первый регистр
    calcReg1.current = '';
    //и пишем в регистр операций, текущую операцию
    calcRegOperation.current = fn;
  };

  const handleOnResult = () => {
    // если регистр операции пуст, то тогда ничего не делаем
    if (calcRegOperation.current === null) {
      return;
    }
    //если второй регистр пуст, то тогда тоже ничего не делаем
    if (calcReg2.current === '') {
      return;
    }
    //если первый регистр пуст, то тогда тоже ничего не делаем
    if (calcReg1.current === '') {
      return;
    }
    //вычисляем результат
    const result = eval(
      `${calcReg2.current}${calcRegOperation.current}${calcReg1.current}`,
    );
    //обнуляем все регистры
    calcReg1.current = '';
    calcReg2.current = '';
    calcRegOperation.current = null;
    //пишем в первый регистр результат
    // calcReg1.current = result;
    //делаем проверки на вывод результата
    let resultView = result;

    if (result === Infinity || result === -Infinity || Number.isNaN(result)) {
      resultView = 'Не определено';
      calcReg1.current = '';
      setValue(resultView);
      return;
    }

    if (result >= Math.pow(10, MAX_DIGITS)) {
      resultView = 'Переполнение';
      calcReg1.current = '';
      setValue(resultView);
      return;
    }
    setValue(String(resultView).slice(0, MAX_DIGITS + 1));
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.runtime}>
        {calculatorBlockIdList.map((el) => (
          <Fragment key={el}>
            {el === 'display' && (
              <DisplayBlock isSkeletonMode={false} value={value} />
            )}
            {el === 'operations' && (
              <OperationsBlock
                isSkeletonMode={false}
                onFn={handleOnOperation}
              />
            )}
            {el === 'digits' && (
              <DigitsBlock isSkeletonMode={false} onFn={handleOnDigit} />
            )}
            {el === 'result' && (
              <ResultBlock isSkeletonMode={false} onFn={handleOnResult} />
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
};
