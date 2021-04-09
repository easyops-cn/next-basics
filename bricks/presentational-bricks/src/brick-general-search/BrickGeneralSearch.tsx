import React, { useState, useEffect, forwardRef, useCallback } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Input, Button } from "antd";
import style from "./index.module.css";
import { Size, Shape } from "./index";
import classNames from "classnames";
import { debounce } from "lodash";

interface TestGeneralSearchProps {
  onUpdate: (value: string) => void;
  onChange: (value: string) => void;
  query: string;
  size: Size;
  shape: Shape;
  placeholder: string;
  inputStyle?: any;
  buttonStyle?: any;
  disableAutofocus?: boolean;
  debounceTime?: number;
}

const sizeClassMap = {
  small: {
    default: {
      input: "small",
      btn: "small",
    },
    round: {
      input: "small",
      btn: "small",
    },
  },
  default: {
    default: {
      input: "default",
      btn: "default",
    },
    round: {
      input: "default",
      btn: "small",
    },
  },
  large: {
    default: {
      input: "large",
      btn: "large",
    },
    round: {
      input: "large",
      btn: "default",
    },
  },
  extraLarge: {
    default: {
      input: "large",
      btn: "large",
    },
    round: {
      input: "large",
      btn: "large",
    },
  },
};

export const BrickGeneralSearch = forwardRef<Input, TestGeneralSearchProps>(
  function BrickGeneralSearch(props, ref): React.ReactElement {
    const [query, setQuery] = useState(props.query);

    const handleOnSearch = () => {
      props.onUpdate(query);
    };

    const debounceValueEmit = useCallback(
      props.debounceTime
        ? debounce((value: string): void => {
            props.onChange(value);
          }, props.debounceTime)
        : props.onChange,
      [props.debounceTime]
    );

    const handleOnChange = (e) => {
      debounceValueEmit(e.target.value);
      setQuery(e.target.value);
    };

    useEffect(() => {
      if (props.query !== query) {
        debounceValueEmit(props.query);
        setQuery(props.query);
      }
    }, [props.query]);

    return (
      <span
        className={classNames(style.searchInputContainer, {
          [style.roundSearchInputContainer]: props.shape === "round",
          [style.roundSmallSearchInputContainer]:
            props.shape === "round" && props.size === "small",
          [style.roundExtraLargeInputContainer]:
            props.shape === "round" && props.size === "extraLarge",
          [style.largeSearchInputContainer]:
            props.shape === "default" && props.size === "large",
        })}
      >
        <Input
          ref={ref}
          className={style.searchInput}
          size={sizeClassMap[props.size][props.shape].input as any}
          onPressEnter={handleOnSearch}
          value={query}
          onChange={handleOnChange}
          placeholder={props.placeholder}
          style={props.inputStyle}
          autoFocus={!props.disableAutofocus}
        />
        <Button
          type="link"
          {...(props.shape === "round" && { shape: "circle" })}
          icon={<SearchOutlined />}
          size={sizeClassMap[props.size][props.shape].btn as any}
          onClick={handleOnSearch}
          className={style.searchBtn}
          style={props.buttonStyle}
        />
      </span>
    );
  }
);
