import React, { useEffect, useState } from "react";
import { Input } from "antd";
import { useTranslation } from "react-i18next";
import update from "immutability-helper";
import { defaults } from "lodash";
import { NS_FLOW_BUILDER, K } from "../../../i18n/constants";
import { numberTypeList } from "../../constants";
import {
  NumberValidatorInput,
  NumberCompareItem,
} from "./NumberValidatorInput";

export interface ProcessValidateField {
  compare?: NumberCompareItem[];
  pattern?: string;
  type?: string;
}

export interface FieldValidatorItemProps {
  value?: ProcessValidateField;
  onChange?: (value: ProcessValidateField) => void;
}

export function FieldValidatorItem({
  value = {},
  onChange,
}: FieldValidatorItemProps): React.ReactElement {
  const { t } = useTranslation(NS_FLOW_BUILDER);
  const [fieldValue, setFieldValue] = useState<ProcessValidateField>(
    defaults(value, { compare: [] })
  );

  useEffect(() => {
    setFieldValue(defaults(value, { compare: [] }));
  }, [value]);

  const handleRegChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    const newFeildValue = update(fieldValue, { pattern: { $set: value } });
    setFieldValue(newFeildValue);

    onChange(newFeildValue);
  };

  const handleAdd = (): void => {
    const newFeildValue = update(fieldValue, {
      compare: { $push: [{ method: undefined, value: undefined }] },
    });
    setFieldValue(newFeildValue);
    onChange?.(newFeildValue);
  };

  const handleRemove = (index: number): void => {
    const newFeildValue = update(fieldValue, {
      compare: { $splice: [[index, 1]] },
    });

    setFieldValue(newFeildValue);
    onChange?.(newFeildValue);
  };

  const handleNumberValidatorChange = (list: NumberCompareItem[]): void => {
    const newFeildValue = {
      ...fieldValue,
      compare: list,
    };
    setFieldValue(newFeildValue);
    onChange?.(newFeildValue);
  };

  return (
    <div>
      {fieldValue.type === "string" && (
        <Input
          placeholder={t(K.PATTERN_INPUT_PLANCEHOLDER)}
          value={fieldValue.pattern}
          onChange={handleRegChange}
        />
      )}
      {numberTypeList.includes(fieldValue.type) && (
        <NumberValidatorInput
          value={fieldValue.compare}
          onAdd={handleAdd}
          onRemove={handleRemove}
          onChange={handleNumberValidatorChange}
        />
      )}
    </div>
  );
}
