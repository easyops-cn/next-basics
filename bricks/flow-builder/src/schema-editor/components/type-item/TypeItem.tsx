import React, { useEffect, useMemo, useState, useCallback } from "react";
import { Select, Checkbox } from "antd";
import { useTranslation } from "react-i18next";
import { debounce } from "lodash";
import { useContractModels } from "../../hooks/useContractModels";
import { NS_FLOW_BUILDER, K } from "../../../i18n/constants";
import {
  processFilterModes,
  processTypeItemInitValue,
  processTypeItemData,
} from "../../processor";
import { modelRefCache } from "../../constants";
import { ModelFieldItem } from "../../interfaces";

export interface ContractModel {
  name: string;
  namespaceId: string;
  fields: ModelFieldItem[];
  [key: string]: unknown;
}
export interface mixGroupContract {
  group: string;
  items: {
    label?: string;
    value?: string;
  }[];
}

export interface ProcessTypeValue {
  value: string;
  isArray?: boolean;
}

export interface TypeItemProps {
  value?: string;
  onChange?: (value: string) => void;
  disabledModelType?: boolean;
}

export function TypeItem(props: TypeItemProps): React.ReactElement {
  const { disabledModelType } = props;
  const [{ q, modelList }, setQ] = useContractModels({ disabledModelType });
  const [typeValue, setTypeValue] = useState<ProcessTypeValue>(
    processTypeItemInitValue(props.value)
  );

  useEffect(() => {
    setTypeValue(processTypeItemInitValue(props.value));
  }, [props.value]);

  const { t } = useTranslation(NS_FLOW_BUILDER);

  const mixGroupList = useMemo(
    () => processFilterModes(modelList, q),
    [modelList, q]
  );

  const handleChange = (value: string): void => {
    const newValue = {
      ...typeValue,
      value,
    };
    const find = modelList.find((item) => item.name === value);
    find && modelRefCache.set(value, `${find.namespaceId}.${find.name}`);
    setTypeValue(newValue);
    props.onChange(processTypeItemData(newValue));
  };

  const handleSearch = useCallback(
    (value: string): void => {
      setQ(value ?? "");
    },
    [setQ]
  );

  const debounceSearch = useMemo(() => {
    return debounce(handleSearch, 200);
  }, [handleSearch]);

  const handleCheckChange = (checked: boolean): void => {
    const newValue = {
      ...typeValue,
      isArray: checked,
    };

    setTypeValue(newValue);

    props.onChange(processTypeItemData(newValue));
  };

  return (
    <div style={{ display: "flex", gap: 8 }}>
      <Select
        value={typeValue.value}
        style={{ flex: 1, minWidth: 0 }}
        showSearch
        filterOption={false}
        onChange={handleChange}
        onSearch={debounceSearch}
        placeholder={t(K.MODEL_SEARCH_PLANCEHOLDER)}
      >
        {mixGroupList.map((item) => (
          <Select.OptGroup key={item.group} label={item.group}>
            {item.items.map((row) => (
              <Select.Option key={row.value} value={row.value}>
                {row.value}
              </Select.Option>
            ))}
          </Select.OptGroup>
        ))}
      </Select>
      <Checkbox
        checked={typeValue.isArray}
        style={{ marginTop: -4 }}
        onChange={(e) => handleCheckChange(e.target.checked)}
      >
        {t(K.ARRAY)}
      </Checkbox>
    </div>
  );
}
