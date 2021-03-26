import React, { useState, useEffect } from "react";
import { Tag, Tooltip } from "antd";
import { TagProps } from "antd/lib/tag";
import { CheckableTagProps } from "antd/lib/tag/CheckableTag";
import classNames from "classnames";
import style from "./index.module.css";
import { isArray, differenceBy } from "lodash";
import { GeneralIcon } from "@next-libs/basic-components";
import { Icon as LegacyIcon } from "@ant-design/compatible";
import { MenuIcon } from "@next-core/brick-types";

export const circleIcon: MenuIcon = {
  lib: "fa",
  icon: "circle",
  prefix: "fas",
};

export enum TagTypeProps {
  Tag = "Tag",
  CheckableTag = "CheckableTag",
}

export type TagListType = {
  key: string;
  label: string;
  icon?: any;
  checked?: boolean;
  color?: string;
  disabled?: boolean;
  disabledTooltip?: string;
}[];

export interface BrickTagProps extends TagProps {
  componentType?: TagTypeProps;
  configProps?: TagProps | CheckableTagProps;
  tagList: TagListType;
  textEllipsis?: boolean;
  tagStyle?: any;
  tagCheckedStyle?: any;
  tagHoverStyle?: any;
  handleOnChange?: (items: TagListType) => void;
  handleOnClose?: (current, tagList: TagListType) => void;
  multipleCheck?: boolean;
  label?: string;
  defaultCheckedTag?: string | string[];
  showTagCircle?: boolean;
  shape?: "default" | "round";
  closable?: boolean;
  disabledTooltip?: string;
  cancelable?: boolean;
}

export function BrickTag(props: BrickTagProps): React.ReactElement {
  const {
    componentType,
    tagList,
    configProps,
    defaultCheckedTag,
    showTagCircle,
    color,
    closable,
    cancelable,
  } = props;

  const [checkedTag, setCheckedTag] = useState([]);
  const [closedTag, setClosedTag] = useState(tagList);

  useEffect(() => {
    setCheckedTag(
      defaultCheckedTag
        ? isArray(defaultCheckedTag)
          ? defaultCheckedTag
          : [defaultCheckedTag]
        : []
    );
  }, [defaultCheckedTag]);

  const [hoverTag, setHoverTag] = useState(null);

  const onChange = (item, checked) => {
    const key = item.key;
    let nextCheckedTag: string[];
    if (props.multipleCheck) {
      nextCheckedTag = checked
        ? [...checkedTag, key]
        : checkedTag.filter((t) => t !== key);
    } else {
      if (!cancelable && !checked) {
        return;
      }
      nextCheckedTag = checked ? [key] : [];
    }
    const nextCheckedItems = tagList?.filter((item) =>
      nextCheckedTag?.includes(item.key)
    );
    props.handleOnChange(nextCheckedItems);
  };

  const onClose = (item) => {
    const newClosedTag = differenceBy(closedTag, [item], "key");
    setClosedTag(newClosedTag);
    props?.handleOnClose(item, newClosedTag);
  };

  const onMouseEnter = (item, e) => {
    setHoverTag(item.key);
  };

  const onMouseLeave = (item, e) => {
    setHoverTag(null);
  };

  const renderTag = (TypeComponent: any, tagList: TagListType) =>
    tagList.map((item) => {
      let restProps: any = {};
      const hover = hoverTag === item.key;
      if (TypeComponent === Tag) {
        restProps = {
          style: {
            ...props.tagStyle,
            ...(hover ? props.tagHoverStyle : {}),
          },
        };
      } else {
        const checked = checkedTag.includes(item.key);
        restProps = {
          style: {
            ...props.tagStyle,
            ...(checked ? props.tagCheckedStyle : {}),
            ...(hover ? props.tagHoverStyle : {}),
          },
          checked,
          onChange: (c) => onChange(item, c),
        };
      }
      const specificColor = item.color || color;
      const tagNode = (
        <TypeComponent
          key={item.key}
          className={classNames({
            [style.grayTag]: specificColor === "gray" || item.disabled,
            [style.round]: props.shape === "round",
            [style.closableTag]: closable && TypeComponent === Tag,
            [style.tagCircleIcon]: showTagCircle,
            [style.colorTag]:
              specificColor && !closable && TypeComponent === Tag,
            [style.disabledTag]: item.disabled,
          })}
          icon={
            !showTagCircle &&
            item.icon &&
            typeof item.icon === "string" && <LegacyIcon type={item.icon} />
          }
          closable={closable}
          {...(closable ? { onClose: () => onClose(item) } : {})}
          color={!closable && specificColor}
          {...configProps}
          {...restProps}
          onMouseEnter={(e) => onMouseEnter(item, e)}
          onMouseLeave={(e) => onMouseLeave(item, e)}
        >
          {!showTagCircle && item.icon && typeof item.icon === "object" && (
            <GeneralIcon
              icon={item.icon}
              style={{ marginRight: "7px", marginLeft: 0 }}
            />
          )}
          {showTagCircle && (
            <GeneralIcon
              icon={circleIcon}
              style={{ marginRight: "7px", marginLeft: 0 }}
            />
          )}
          {item.label}
        </TypeComponent>
      );
      return (props.disabledTooltip || item.disabledTooltip) &&
        item.disabled ? (
        <Tooltip
          key={item.key}
          title={item.disabledTooltip || props.disabledTooltip}
        >
          {tagNode}
        </Tooltip>
      ) : (
        tagNode
      );
    });

  return (
    <div
      className={classNames(style.brickTag, {
        [style.tagTextOverflow]: props.textEllipsis,
      })}
    >
      {props.label && <span className={style.tagsLabel}>{props.label}</span>}
      {componentType === TagTypeProps.CheckableTag
        ? renderTag(Tag.CheckableTag, tagList)
        : renderTag(Tag, tagList)}
    </div>
  );
}
