import React from "react";
import { List, Empty, Card, Tooltip } from "antd";
import { CardDetail, CardItem } from "./index";
import styles from "./index.module.css";
import { GeneralIcon } from "@next-libs/basic-components";
import { BrickAsComponent, getHistory } from "@next-core/brick-kit";
import { UseBrickConf } from "@next-core/brick-types";
import { isEmpty } from "lodash";
import { parseTemplate } from "@next-libs/cmdb-utils";

interface InfoDisplayCardListProps {
  dataSource: CardItem[];
  showIcon?: boolean;
  optionConf?: { useBrick: UseBrickConf };
  titleBrickConf?: { useBrick: UseBrickConf };
  iconBrickConf?: { useBrick: UseBrickConf };
  detailOfDescBrickConf?: { useBrick: UseBrickConf };
  titleFontSize?: number | string;
  detailDescFontSize?: number | string;
  url?: string;
  urlTemplate?: string;
  target?: string;
  listStyle: React.CSSProperties;
}

export function InfoDisplayCardList({
  dataSource,
  showIcon,
  optionConf,
  titleBrickConf,
  iconBrickConf,
  detailOfDescBrickConf,
  titleFontSize,
  detailDescFontSize,
  url,
  urlTemplate,
  target,
  listStyle,
}: InfoDisplayCardListProps): React.ReactElement {
  const isEmptyDetailOfDescBrickConf = isEmpty(detailOfDescBrickConf?.useBrick);
  const isEmptyIconBrickConf = isEmpty(iconBrickConf?.useBrick);

  const getCardItemDetail = (
    item: CardDetail,
    index: number
  ): React.ReactNode => (
    <div
      className={styles.infoCardDetailWrapper}
      style={{ width: item.width, flexShrink: 0 }}
      key={index}
    >
      <h5>{item.title}</h5>
      {(isEmptyDetailOfDescBrickConf || !item.useBrick) && item.desc && (
        <Tooltip title={item.desc}>
          <p
            style={{
              fontSize: detailDescFontSize ?? "18px",
            }}
          >
            {item.desc}
          </p>
        </Tooltip>
      )}
      {!isEmptyDetailOfDescBrickConf &&
        !!item.useBrick &&
        isEmpty(item.detailBrickConf?.useBrick) && (
          <BrickAsComponent
            useBrick={detailOfDescBrickConf.useBrick}
            data={item}
          ></BrickAsComponent>
        )}
      {!isEmpty(item.detailBrickConf?.useBrick) && (
        <BrickAsComponent
          useBrick={item.detailBrickConf?.useBrick}
          data={item}
        ></BrickAsComponent>
      )}
    </div>
  );
  const handleCardClick = (item: CardItem) => {
    const resultUrl = url || (urlTemplate && parseTemplate(urlTemplate, item));
    if (resultUrl) {
      const history = getHistory();
      if (target && target !== "_self") {
        window.open(resultUrl, target);
      } else {
        history.push(resultUrl);
      }
    }
  };

  const getCardItem = (item: CardItem): React.ReactNode => (
    <Card
      className={styles.infoCard}
      hoverable={true}
      onClick={(e) => handleCardClick(item)}
    >
      <div className={styles.infoCardWrapper}>
        <div className={styles.infoCardMain}>
          {isEmptyIconBrickConf && showIcon && (
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
                size={40}
              />
            </div>
          )}
          {!isEmptyIconBrickConf && (
            <BrickAsComponent
              useBrick={iconBrickConf.useBrick}
              data={item}
            ></BrickAsComponent>
          )}
          <div className={styles.infoCardDetail}>
            <div className={styles.infoCardDetailDiv}>
              <h5
                style={{
                  fontSize: titleFontSize ?? "16px",
                }}
              >
                {item.title}
              </h5>
              {!isEmpty(titleBrickConf?.useBrick) && (
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
          <div
            style={{
              ...(item.detail?.length >= 4
                ? {
                    gridTemplateColumns: `repeat(${item.detail.length}, minmax(0, 1fr))`,
                  }
                : {
                    display: "flex",
                    flexWrap: "wrap",
                  }),
              gap: "var(--toolbar-button-gap)",
            }}
          >
            {item.detail?.map(getCardItemDetail)}
          </div>
          {!isEmpty(optionConf?.useBrick) && (
            <div
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <BrickAsComponent
                useBrick={optionConf.useBrick}
                data={item}
              ></BrickAsComponent>
            </div>
          )}
          {!isEmpty(item.operateItemBrick?.useBrick) && (
            <div>
              <BrickAsComponent
                useBrick={item.operateItemBrick?.useBrick}
                data={item}
              ></BrickAsComponent>
            </div>
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
      style={{ maxWidth: "1300px", ...listStyle }}
    />
  ) : (
    <Empty />
  );
}
