import React from "react";
import { omit, isEmpty } from "lodash";

import { getHistory, BrickAsComponent } from "@next-core/brick-kit";
import { MenuIcon, UseBrickConf } from "@next-core/brick-types";
import { GeneralIcon } from "@next-libs/basic-components";
import { LinkProps } from "./index";

import style from "./brick-quick-entries.module.css";

export interface BrickQuickEntriesProps {
  row: number;
  column: number;
  links?: LinkProps[];
  useBricks?: UseBrickConf;
  data?: any[];
  containerStyle?: React.CSSProperties;
  mode?: "multiCardGeneral" | "multiCardNoLine" | "default";
}

export function BrickQuickEntries(
  props: BrickQuickEntriesProps
): React.ReactElement {
  const clickLink = (link: LinkProps) => {
    const history = getHistory();
    history.push(link.target);
  };
  const useBricks = Array.isArray(props.useBricks)
    ? props.useBricks
    : [props.useBricks];
  const propsData = Array.isArray(props.data) ? props.data : [props.data];

  const renderLink = (row: number, col: number): React.ReactNode => {
    const index = row * props.column + col;
    const link = props.links[index];
    return link ? (
      <div
        key={index}
        className={style.linkWrapper}
        onClick={() => clickLink(link)}
      >
        <div className={style.link}>
          <div className={style.icon}>
            <GeneralIcon icon={link.icon}></GeneralIcon>
          </div>
          <div className={style.text}>{link.text}</div>
        </div>
      </div>
    ) : (
      <div key={index} className={style.link}></div>
    );
  };

  const renderBrick = (row: number, col: number): React.ReactNode => {
    const index = row * props.column + col;
    const brick = useBricks[index];
    return brick ? (
      <BrickAsComponent key={index} useBrick={brick} data={propsData[index]} />
    ) : (
      <div key={index} className={style.link}></div>
    );
  };

  const render = (): HTMLElement[] => {
    const elements: any[] = [];
    let key = 1000;

    for (let i = 0; i < props.row; ++i) {
      for (let j = 0; j < props.column; ++j) {
        const elem = isEmpty(props.useBricks)
          ? renderLink(i, j)
          : renderBrick(i, j);
        elements.push(elem);
        if (j !== props.column - 1) {
          elements.push(
            <div
              key={key++}
              className={
                props.mode === "multiCardGeneral"
                  ? style.multiCardGeneralVerticalLine
                  : props.mode === "multiCardNoLine"
                  ? ""
                  : style.verticalLine
              }
            ></div>
          );
        }
      }
      if (i !== props.row - 1) {
        for (let j = 0; j < props.column; ++j) {
          elements.push(
            <div
              key={key++}
              className={
                props.mode === "multiCardGeneral" ||
                props.mode === "multiCardNoLine"
                  ? ""
                  : style.horizontalLine
              }
            ></div>
          );
          if (j !== props.column - 1) {
            elements.push(<div key={key++}></div>);
          }
        }
      }
    }

    return elements;
  };

  return (
    <div
      className={
        props.mode === "multiCardGeneral" || props.mode === "multiCardNoLine"
          ? style.multiCardEntranceWrapper
          : style.entranceWrapper
      }
      style={{
        gridTemplateRows: Array(props.row).fill("1fr").join(" 1px "),
        gridTemplateColumns: Array(props.column).fill("1fr").join(" 1px "),
        ...props.containerStyle,
      }}
    >
      {render()}
    </div>
  );
}
