import React from "react";
import { List, Empty } from "antd";
import { CardDetail, CardItem } from "./index";
import styles from "./index.module.css";
import { GeneralIcon } from "@next-libs/basic-components";
import { BrickAsComponent } from "@next-core/brick-kit";
import { UseBrickConf } from "@next-core/brick-types";
import { get, isEmpty } from "lodash";

interface InfoDisplayCardListProps {
  dataSource: CardItem[];
  showIcon?: boolean;
  optionConf?: { useBrick: UseBrickConf };
}

export function InfoDisplayCardList({
  dataSource,
  showIcon,
  optionConf,
}: InfoDisplayCardListProps): React.ReactElement {
  const getCardItemDetail = (item: CardDetail, index: number): React.ReactNode => (
    <div className={styles.infoCardDetailWrapper} key={index}>
      <h5>{item.title}</h5>
      <p>{item.desc}</p>
    </div>
  );

  const getCardItem = (item: CardItem): React.ReactNode => (
    <div className={styles.infoCardWrapper}>
      <div className={styles.infoCardMain}>
        {showIcon && (
          <div className={styles.cardIcon}>
            <GeneralIcon
              icon={
                item.icon || {
                  lib: "antd",
                  icon: "question",
                  theme: "outlined",
                }
              }
              bg={true}
              shape="square"
              size={44}
            />
          </div>
        )}
        <div className={styles.infoCardDetail}>
          <h5>{item.title}</h5>
          <p>{item.desc}</p>
        </div>
      </div>
      <div className={styles.infoCardRightSection}>
        <div>{item.detail?.map(getCardItemDetail)}</div>
        {!isEmpty(get(optionConf, "useBrick")) && (
          <BrickAsComponent
            useBrick={optionConf.useBrick}
            data={item}
          ></BrickAsComponent>
        )}
      </div>
    </div>
  );

  return dataSource?.length > 0 ? (
    <List
      itemLayout="horizontal"
      dataSource={dataSource}
      renderItem={(item) => getCardItem(item)}
    />
  ) : (
    <Empty />
  );
}
