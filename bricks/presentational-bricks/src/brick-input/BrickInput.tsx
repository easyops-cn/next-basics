import React, { useState, useEffect, useMemo } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
import style from "./BrickInput.module.css";
import { debounce } from "lodash";

export interface BrickInputProps {
  defaultValue?: string;
  value?: string;
  handleValueEmit: any;
  handleValueChange: any;
  placeholder?: string;
  trigger?: "change" | "enter";
  debounceTime: number;
}

export function BrickInput(props: BrickInputProps): React.ReactElement {
  const [inputVal, setInputVal] = useState(props.defaultValue);

  const debounceValueEmit = useMemo(
    () =>
      debounce((value: string): void => {
        props.handleValueEmit(value);
      }, props.debounceTime),
    [props.debounceTime]
  );

  useEffect(() => {
    props.handleValueChange && props.handleValueChange(props.value);
    setInputVal(props.value);
  }, [props.value]);

  const handleChange = ({ target: { value } }: any) => {
    setInputVal(value);
    if (props.trigger !== "enter") {
      debounceValueEmit(value);
    }
    props.handleValueChange && props.handleValueChange(value);
  };

  const handleValEmit = () => {
    if (props.trigger === "enter") {
      props.handleValueEmit(inputVal);
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <Input
        placeholder={props.placeholder}
        className={style.searchInput}
        value={inputVal}
        onChange={handleChange}
        onPressEnter={handleValEmit}
      ></Input>
      <SearchOutlined className={style.searchIcon} />
    </div>
  );
}
