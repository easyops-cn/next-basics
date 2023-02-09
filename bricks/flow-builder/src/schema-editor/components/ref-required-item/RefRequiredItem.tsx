import React, { useEffect } from "react";
import { Select } from "antd";
import { useCurModel } from "../../hooks/useCurModel";

export interface RefRequiredItem {
  value?: string[];
  prefix?: string;
  onChange?: (value: string[]) => void;
  model: string;
}

export function RefRequiredItem(props: RefRequiredItem): React.ReactElement {
  const { prefix, model, value } = props;
  const [{ modelData }, setModelName] = useCurModel(model);

  useEffect(() => {
    setModelName(model);
  }, [model, setModelName]);

  const handleChange = (value: string[]): void => {
    props.onChange?.(value);
  };

  return (
    <div>
      <Select mode="tags" value={value} onChange={handleChange}>
        {modelData.fields?.map((item) => (
          <Select.Option
            key={item.name}
            value={`${prefix ? prefix + "." : ""}${model}.${item.name}`}
          >
            {item.name}
          </Select.Option>
        ))}
      </Select>
    </div>
  );
}
