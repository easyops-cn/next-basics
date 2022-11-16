import React from "react";
import { useTranslation } from "react-i18next";
import { NS_PRESENTATIONAL_BRICKS, K } from "../i18n/constants";
import { UseBrickConf } from "@next-core/brick-types";
import { BrickAsComponent, getHistory } from "@next-core/brick-kit";
import { Collapse } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import styles from "./CollapseInfoList.module.css";

const { Panel } = Collapse;

export type InfoDetail = {
  key: string;
  title: string;
  detail: string;
};

interface CollapseInfoListProps {
  dataSource: InfoDetail[];
  onChange?: (key: string[]) => void;
  titleBrick?: { useBrick: UseBrickConf };
  extraBrick?: { useBrick: UseBrickConf };
}

export function CollapseInfoList({
  dataSource,
  titleBrick,
  extraBrick,
  onChange,
}: CollapseInfoListProps): React.ReactElement {
  const { t } = useTranslation(NS_PRESENTATIONAL_BRICKS);

  const getPanelTitle = (data: InfoDetail): React.ReactNode => {
    if (titleBrick?.useBrick) {
      return (
        <span style={{ display: "flex", alignItems: "flex-start" }}>
          {data.title}
          <BrickAsComponent
            useBrick={titleBrick.useBrick}
            data={data}
          ></BrickAsComponent>
        </span>
      );
    }
    return data.title;
  };

  return (
    <Collapse
      expandIcon={({ isActive }) => (
        <CaretRightOutlined rotate={isActive ? 90 : 0} />
      )}
      defaultActiveKey={dataSource[0].key}
      onChange={onChange}
      bordered={false}
      className={styles.collapseWrapper}
      data-testid="collapse-wrapper"
    >
      {dataSource?.map((data) => (
        <Panel
          header={getPanelTitle(data)}
          key={data.key}
          extra={
            extraBrick?.useBrick ? (
              <BrickAsComponent
                useBrick={extraBrick.useBrick}
                data={data}
              ></BrickAsComponent>
            ) : (
              ""
            )
          }
        >
          <p>{data.detail}</p>
        </Panel>
      ))}
    </Collapse>
  );
}
