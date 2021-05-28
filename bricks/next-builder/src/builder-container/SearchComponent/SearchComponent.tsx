import React, { useState, useImperativeHandle, forwardRef } from "react";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import styles from "./SearchComponent.module.css";

export interface SearchComponentProps {
  onSearch?: (value: string) => void;
  placeholder?: string;
  defaultValue?: string;
  inputStyle?: React.CSSProperties;
}

export function LeacySearchComponent(
  { onSearch, placeholder, defaultValue, inputStyle }: SearchComponentProps,
  ref: React.Ref<any>
): React.ReactElement {
  const [q, setQ] = useState<string>(defaultValue);

  const handleSearch = (value: string): void => {
    setQ(value);
    onSearch?.(value);
  };

  useImperativeHandle(ref, () => ({
    handleSearch,
  }));

  return (
    <div className={styles.searchWrapper}>
      <Input
        prefix={<SearchOutlined />}
        style={inputStyle}
        placeholder={placeholder}
        value={q}
        onChange={(e) => handleSearch(e.target.value)}
      />
    </div>
  );
}

export const SearchComponent = forwardRef(LeacySearchComponent);
