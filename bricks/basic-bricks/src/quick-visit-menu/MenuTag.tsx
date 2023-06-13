import React, { useState, useEffect } from "react";
import styles from "./index.module.css";
import { StarOutlined, StarFilled } from "@ant-design/icons";
import { Tooltip } from "antd";
import { K, NS_BASIC_BRICKS } from "../i18n/constants";
import { useTranslation } from "react-i18next";

interface MenuTagProps {
  menu: Record<string, unknown>;
  handleCollect?: (item: Record<string, unknown>) => void;
  target?: string;
  handleMenuClick: (item: Record<string, unknown>) => void;
  handleMenuRemove: (item: Record<string, unknown>) => void;
}
export function MenuTag(props: MenuTagProps): React.ReactElement {
  const { menu, handleCollect, handleMenuClick, handleMenuRemove } = props;
  const [selected, setSelected] = useState(false);
  const { t } = useTranslation(NS_BASIC_BRICKS);

  useEffect(() => {
    const { isFavourite } = menu;
    setSelected(isFavourite as boolean);
  }, [menu]);
  const handleOnStarClick = () => {
    setSelected(true);
    handleCollect(menu);
  };
  const handleOnTextClick = () => {
    handleMenuClick(menu);
  };
  const handleOnRemove = () => {
    setSelected(false);
    handleMenuRemove(menu);
  };
  const { text } = menu;
  return (
    <div className={styles.tag}>
      <div className={styles.textContainer} onClick={handleOnTextClick}>
        <Tooltip
          trigger={text?.length > 20 ? "hover" : []}
          title={text}
          mouseLeaveDelay={2}
        >
          {text}
        </Tooltip>
      </div>
      {!selected && (
        <div
          className={styles.operation}
          data-testid="collect-btn"
          onClick={handleOnStarClick}
        >
          <Tooltip title={t(K.ADD_TO_QUICK_ACCESS)}>
            <StarOutlined className={styles.collectStar} />
          </Tooltip>
        </div>
      )}
      {selected && (
        <div
          className={styles.operation}
          data-testid="remove-btn"
          onClick={handleOnRemove}
        >
          <Tooltip title={t(K.REMOVE_FROM_QUICK_ACCESS)}>
            <StarFilled className={styles.favouriteStar} />
          </Tooltip>
        </div>
      )}
    </div>
  );
}
