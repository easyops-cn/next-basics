import React, { useEffect } from "react";
import { Select } from "antd";
import { useCurModel } from "../../hooks/useCurModel";

export interface RefRequiredItem {
  value?: string[];
  onChange?: (value: string[]) => void;
  model: string;
}

export function RefRequiredItem(props: RefRequiredItem): React.ReactElement {
  const [{ modelData }, setModelName] = useCurModel(props.model);

  useEffect(() => {
    setModelName(props.model);
  }, [props.model, setModelName]);

  const handleChange = (value: string[]): void => {
    props.onChange?.(value);
  };

  return (
    <div>
      <Select mode="tags" value={props.value} onChange={handleChange}>
        {modelData.fields?.map((item) => (
          <Select.Option key={item.name} value={`${props.model}.${item.name}`}>
            {item.name}
          </Select.Option>
        ))}
      </Select>
    </div>
  );
}
