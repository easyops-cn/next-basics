import React from "react";
import { Icon as LegacyIcon } from "@ant-design/compatible";
import { Collapse } from "antd";
import { GeneralIcon } from "@next-libs/basic-components";
import { MenuIcon } from "@next-core/brick-types";
import classNames from "classnames";

interface BrickCollapseCardProps {
  title: string;
  expandActiveText?: string;
  expandInactiveText?: string;
  expandActiveIcon?: string;
  expandInactiveIcon?: string;
  isActive?: boolean;
  containerStyle?: any;
  headerStyle?: any;
  contentStyle?: any;
  dataSource?: Record<string, any>;
  hasHeaderSlot?: boolean;
  titleIcon?: MenuIcon | string;
  descriptionList?: descriptionsItemProps[];
  titleWithIconAndDesc?: boolean;
  verticalCenter?: boolean;
}

export interface descriptionsItemProps {
  label: string;
  text: string;
}

const getIconNode = (
  icon: MenuIcon | string,
  className: string
): React.ReactElement => {
  if (typeof icon === "string")
    return <LegacyIcon type={icon} className={className} />;
  if (typeof icon === "object")
    return (
      <span className={className}>
        <GeneralIcon icon={icon} />
      </span>
    );
};

const getExtraNode = (props: BrickCollapseCardProps): React.ReactElement => {
  return (
    <span className="toggleCollapse">
      <span className="expandText">
        {props.isActive ? props.expandActiveText : props.expandInactiveText}
      </span>
      {getIconNode(
        props.isActive ? props.expandActiveIcon : props.expandInactiveIcon,
        "expandIcon"
      )}
    </span>
  );
};

const getDescriptionNode = (
  descriptionList: descriptionsItemProps[]
): React.ReactElement[] => {
  return descriptionList.map((item, i) => (
    <span className="descriptionItem" key={i}>
      <span className="descriptionItemLabel">
        {item.label && item.label + ":"}
      </span>
      <span className="descriptionItemText">{item.text}</span>
    </span>
  ));
};

const getHeaderWithIconAndDescNode = (
  props: BrickCollapseCardProps
): React.ReactElement => {
  return (
    <>
      <div className="headerIcon">{getIconNode(props.titleIcon, "")}</div>
      <div className="headerContent">
        <div className="cardTitle">{props.title}</div>
        <div className="descriptionList">
          {props.descriptionList && getDescriptionNode(props.descriptionList)}
        </div>
      </div>
    </>
  );
};

const getHeaderNode = (props: BrickCollapseCardProps): React.ReactElement => {
  if (props.hasHeaderSlot) return <slot id="headerSlot" name="header" />;
  return (
    <div className="collapseTitle">
      {props.titleWithIconAndDesc
        ? getHeaderWithIconAndDescNode(props)
        : props.title}
    </div>
  );
};

export function BrickCollapseCard(
  props: BrickCollapseCardProps
): React.ReactElement {
  return (
    <Collapse activeKey={props.isActive ? "content" : ""} ghost={true}>
      <Collapse.Panel
        style={props.containerStyle}
        forceRender={true}
        key="content"
        showArrow={false}
        header={getHeaderNode(props)}
        extra={getExtraNode(props)}
      >
        <div
          className={classNames("contentContainer", {
            verticalCenter: props.verticalCenter,
          })}
          style={props.contentStyle}
        >
          <slot id="contentSlot" name="content" />
        </div>
      </Collapse.Panel>
    </Collapse>
  );
}
