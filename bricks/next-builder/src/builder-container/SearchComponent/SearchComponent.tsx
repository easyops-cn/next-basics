import React, { useState } from "react";
import { Input } from "antd";
import {
  SearchOutlined
} from "@ant-design/icons";
import styles from "./SearchComponent.module.css";

export interface SearchComponentProps {
  onSearch?: (value: string)=>void;
  placeholder?: string;
}

export function SearchComponent({
  onSearch,
  placeholder
}: SearchComponentProps): React.ReactElement {
  const [q, setQ] = useState<string>("");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>)=>{
    const value = event.target.value;
    setQ(value);
    onSearch?.(value);
  };

  return (
    <div className={styles.searchWrapper}>
      <Input
        prefix={<SearchOutlined />}
        placeholder={placeholder}
        value={q}
        onChange={handleSearch}
      />
    </div>
  );
}
