import React from "react";
import { List, Empty, Card, Tooltip } from "antd";
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
  titleBrickConf?: { useBrick: UseBrickConf };
  iconBrickConf?: { useBrick: UseBrickConf };
}

export function InfoDisplayCardList({
  dataSource,
  showIcon,
  optionConf,
  titleBrickConf,
  iconBrickConf,
}: InfoDisplayCardListProps): React.ReactElement {
  const getCardItemDetail = (
    item: CardDetail,
    index: number
  ): React.ReactNode => (
    <div className={styles.infoCardDetailWrapper} key={index}>
      <h5>{item.title}</h5>
      <Tooltip title={item.desc}>
        <p>{item.desc}</p>
      </Tooltip>
    </div>
  );

  const getCardItem = (item: CardItem): React.ReactNode => (
    <Card className={styles.infoCard} hoverable={true}>
      <div className={styles.infoCardWrapper}>
        <div className={styles.infoCardMain}>
          {isEmpty(get(iconBrickConf, "useBrick")) && showIcon && (
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
          {!isEmpty(get(iconBrickConf, "useBrick")) && (
            <BrickAsComponent
              useBrick={iconBrickConf.useBrick}
              data={item}
            ></BrickAsComponent>
          )}
          <div className={styles.infoCardDetail}>
            <div className={styles.infoCardDetailDiv}>
              <h5>{item.title}</h5>
              {!isEmpty(get(titleBrickConf, "useBrick")) && (
                <BrickAsComponent
                  useBrick={titleBrickConf.useBrick}
                  data={item}
                ></BrickAsComponent>
              )}
            </div>
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
    </Card>
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
