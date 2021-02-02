import React from "react";
import classNames from "classnames";
import { Input } from "antd";
import styles from "./SearchBar.module.css";
import { SearchOutlined } from "@ant-design/icons";

export interface SearchBarProps {
  onChange: (value: string) => void;
}

export function SearchBar(props: SearchBarProps): React.ReactElement {
  const [focus, setFocus] = React.useState(false);

  const searchInputRef = React.useCallback((element) => {
    if (element) {
      // Wait for portal mounted first.
      Promise.resolve().then(() => {
        try {
          element.focus();
        } catch (e) {
          // Do nothing.
        }
      });
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    props.onChange(e.target.value);
  };

  const handleClick = (e: React.MouseEvent): void => {
    e.stopPropagation();
  };

  const handleKeyDown = (e: React.KeyboardEvent): void => {
    const key =
      e.key ||
      /* istanbul ignore next: compatibility */ e.keyCode ||
      /* istanbul ignore next: compatibility */ e.which;
    if (
      [
        "Tab",
        "Enter",
        "ArrowLeft",
        "ArrowUp",
        "ArrowRight",
        "ArrowDown",
        9,
        13,
        37,
        38,
        39,
        40,
      ].includes(key)
    ) {
      e.preventDefault();
    }
  };

  const handleFocus = (): void => {
    setFocus(true);
  };

  const handleBlur = (): void => {
    setFocus(false);
  };

  return (
    <div
      className={classNames(styles.searchBar, {
        [styles.focus]: focus,
      })}
    >
      <div className={styles.inputContainer} onClick={handleClick}>
        <Input
          placeholder="通过名称/关键字搜索"
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          onBlur={handleBlur}
          prefix={<SearchOutlined />}
          ref={searchInputRef}
        />
      </div>
    </div>
  );
}
