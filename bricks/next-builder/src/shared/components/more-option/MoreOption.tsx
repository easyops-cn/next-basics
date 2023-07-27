import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { EditOutlined } from "@ant-design/icons";
import { InputNumber } from "antd";
import { NS_NEXT_BUILDER, K } from "../../../i18n/constants";
import styles from "./MoreOption.module.css";

export interface MoreOptionProps {
  itemsCount?: number;
  onBlur?(itemsCount: number): void;
}

export function MoreOption(props: MoreOptionProps): React.ReactElement {
  const { itemsCount = 20, onBlur } = props;
  const [count, setCount] = useState(itemsCount);
  const { t } = useTranslation(NS_NEXT_BUILDER);
  const [edit, setEdit] = useState(false);

  const handleClick = (): void => {
    setEdit(true);
  };

  const handleBlur = (): void => {
    setEdit(false);
    onBlur?.(count);
  };

  return (
    <div className={styles.optionWrapper}>
      {t(K.CONTRACT_OPTIONS_TIPS_PREFIX)}{" "}
      {edit ? (
        <InputNumber
          autoFocus={true}
          style={{ width: 65 }}
          value={count}
          onBlur={handleBlur}
          onChange={(value) => setCount(value as number)}
        />
      ) : (
        <span>
          {count} <EditOutlined onClick={handleClick} />
        </span>
      )}{" "}
      {t(K.CONTRACT_OPTIONS_TIPS_SUFFIX)}
    </div>
  );
}
