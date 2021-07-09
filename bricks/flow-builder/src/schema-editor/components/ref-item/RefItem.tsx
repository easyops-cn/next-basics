import React, { useState, useMemo, useCallback, useEffect } from "react";
import { Select } from "antd";
import { debounce, isEmpty } from "lodash";
import { useContractModels } from "../../hooks/useContractModels";
import { ModelFieldItem } from "../../interfaces";
import { processRefItemData, processRefItemInitValue } from "../../processor";

export interface ProcessRefItemValue {
  name?: string;
  field?: string;
}

export interface RefItemProps {
  value?: string;
  onChange?: (value: string) => void;
}

export function RefItem(props: RefItemProps): React.ReactElement {
  const [{ modelList }, setQ] = useContractModels();
  const [fieldList, setFieldList] = useState<ModelFieldItem[]>([]);
  const [refValue, setRefValue] = useState<ProcessRefItemValue>(
    processRefItemInitValue(props.value)
  );

  useEffect(() => {
    const value = processRefItemInitValue(props.value);
    setRefValue(value);
    const find = modelList.find((item) => item.name === value.name);
    find && setFieldList(find.fields);
  }, [modelList, props.value]);

  const processFieldList = useCallback((fieldList: ModelFieldItem[]) => {
    if (!isEmpty(fieldList)) {
      return [{ name: "*" }].concat(fieldList);
    }

    return fieldList;
  }, []);

  const handleModelChange = (value: string): void => {
    const newValue = {
      name: value,
      field: "",
    };
    setRefValue(newValue);
    props.onChange(processRefItemData(newValue));

    const find = modelList.find((item) => item.name === value);
    if (find) {
      setFieldList(find.fields);
    }
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

  const handleFieldChange = (value: string): void => {
    const newValue = {
      ...refValue,
      field: value,
    };

    setRefValue(newValue);
    props.onChange(processRefItemData(newValue));
  };

  return (
    <div style={{ display: "flex", gap: 8 }}>
      <Select
        style={{ flex: 1 }}
        value={refValue.name}
        onChange={handleModelChange}
        onSearch={debounceSearch}
      >
        {modelList.map((item) => (
          <Select.Option key={item.name} value={item.name}>
            {item.name}
          </Select.Option>
        ))}
      </Select>
      <Select
        style={{ flex: 1 }}
        onChange={handleFieldChange}
        value={refValue.field}
      >
        {processFieldList(fieldList)?.map((item) => (
          <Select.Option key={item.name} value={item.name}>
            {item.name}
          </Select.Option>
        ))}
      </Select>
    </div>
  );
}
