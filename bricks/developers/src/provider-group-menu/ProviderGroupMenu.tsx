import React, { useState } from "react";
import { HashLink } from "@next-libs/basic-components";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";
import classNames from "classnames";
import styles from "./ProviderGroupMenu.module.css";

export interface ProviderGroupMenuProps {
  itemList: string[];
  onFold?: (show: boolean) => void;
  containerStyle?: React.CSSProperties;
}

export function ProviderGroupMenu(
  props: ProviderGroupMenuProps
): React.ReactElement {
  const { itemList, onFold, containerStyle = {} } = props;
  const [fold, setFold] = useState(false);

  const handleClick = (): void => {
    const curFold = !fold;
    setFold(curFold);
    onFold?.(curFold);
  };

  return (
    <div>
      <span
        onClick={handleClick}
        className={classNames(styles.customIcon, { [styles.fasten]: fold })}
      >
        {fold ? <LeftOutlined /> : <RightOutlined />}
      </span>

      <div
        style={{
          display: fold ? "none" : "block",
          marginTop: 40,
          ...containerStyle,
        }}
      >
        {itemList?.map((name) => (
          <div key={name} className={styles.itemWrapper} title={name}>
            <HashLink to={`#${name}`} className={styles.item}>
              {name}
            </HashLink>
          </div>
        ))}
      </div>
    </div>
  );
}
