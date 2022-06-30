import React, { useState } from "react";
import { Input, Select, InputNumber } from "antd";
import { isNumber, isEmpty, isNil } from "lodash";
import { FormItemWrapper, FormItemWrapperProps } from "@next-libs/forms";
// Todo: use @next-libs/constants
import { Unit, UnitType, UNIT_MAP } from "./libs/constants";

import cssStyle from "./style.module.css";

export interface InputWithUnitProps extends FormItemWrapperProps {
  value: number;
  unit: string;
  unitType: UnitType;
  placeholder?: string;
  precision?: number;
  availableUnits?: string[];
  inputBoxStyle?: React.CSSProperties;
  useAutoCalculate?: boolean;
  inputNumberMin?: number;
  onChange?: (value: number) => void;
}

export function InputGroup(
  props: InputWithUnitProps,
  ref: any
): React.ReactElement {
  const originUnits = UNIT_MAP[props.unitType] ?? [];
  let units: Unit[] = originUnits;
  if (!isEmpty(props.availableUnits) && !isEmpty(units)) {
    if (units.some((u) => props.availableUnits.includes(u.id))) {
      units = units.filter((u) => props.availableUnits.includes(u.id));
    }
  }
  const baseUnit = originUnits.find((unit) => unit.id === props.unit);
  if (!baseUnit) {
    throw new Error(
      `InputWithUnit: invalid unit '${props.unit}' as type of '${props.unitType}'`
    );
  }
  const precision = props.precision ?? 0;

  const [inputNumber, setInputNumber] = useState<number>();
  const [selectUnit, setSelectUnit] = useState<string>();
  const [min, setMin] = useState<number>(Number.MIN_SAFE_INTEGER);

  const transformUnit = (n: number, currentUnit: string): number => {
    const select = units.find((unit) => unit.id === currentUnit);
    const factor = select.divisor / baseUnit.divisor;
    return n * factor;
  };

  const updateToMaxUnit = (n: number): void => {
    const value = n * baseUnit.divisor;

    let index = 0;
    for (; index < units.length; ++index) {
      if (value < units[index].divisor) {
        break;
      }
    }

    index = Math.max(1, index);
    let suitableUnit: any;
    if (selectUnit && !props.useAutoCalculate) {
      suitableUnit = originUnits.find((unit) => unit.id === selectUnit);
    } else {
      suitableUnit = units[index - 1];
    }
    if (precision === 0 && value % suitableUnit.divisor > 0) {
      setInputNumber(props.value);
      setSelectUnit(props.unit);
      return;
    }
    if (props?.inputNumberMin) {
      const min =
        (props.inputNumberMin * baseUnit.divisor) / suitableUnit.divisor;
      setMin(min);
    }
    const smaller = +(value / suitableUnit.divisor).toFixed(precision);
    setInputNumber(smaller);
    setSelectUnit(suitableUnit.id);
  };

  const handleChange = (n: number): void => {
    setInputNumber(n);
    let value = n;
    if (isNumber(n)) {
      value = transformUnit(n, selectUnit);
    }
    props.onChange?.(value);
  };

  const handleSelectChange = (value: string): void => {
    if (isNumber(inputNumber)) {
      const n = transformUnit(inputNumber, value);
      props.onChange?.(n);
    }
    setSelectUnit(value);
  };

  React.useEffect(() => {
    if (!isNil(props.value)) {
      if (isNumber(props.value)) {
        updateToMaxUnit(props.value);
      } else {
        handleChange("" as any);
      }
    }
  }, [props.value]);

  return (
    <div ref={ref}>
      <Input.Group compact className={cssStyle.inputGroup}>
        <InputNumber
          placeholder={props.placeholder}
          value={inputNumber}
          onChange={handleChange}
          min={min}
          style={props.inputBoxStyle}
        />
        <Select
          value={selectUnit}
          onChange={handleSelectChange}
          className={cssStyle.selectGroup}
        >
          {units.map((unit) => (
            <Select.Option key={unit.id} value={unit.id}>
              {unit.display}
            </Select.Option>
          ))}
        </Select>
      </Input.Group>
    </div>
  );
}

const RefInputGroup = React.forwardRef(InputGroup);

export function InputWithUnit(props: InputWithUnitProps): React.ReactElement {
  return (
    <FormItemWrapper {...props}>
      <RefInputGroup
        placeholder={props.placeholder}
        value={props.value}
        precision={props.precision}
        availableUnits={props.availableUnits}
        unit={props.unit}
        unitType={props.unitType}
        onChange={props.onChange}
        inputBoxStyle={props.inputBoxStyle}
        inputNumberMin={props.inputNumberMin}
        useAutoCalculate={props.useAutoCalculate}
      />
    </FormItemWrapper>
  );
}
