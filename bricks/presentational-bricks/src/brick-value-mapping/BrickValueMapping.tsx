import React, { useMemo } from "react";
import { Tag } from "antd";
import { isNil, isEmpty } from "lodash";
import classNames from "classnames";
import { GeneralIcon, Link, LinkProps } from "@next-libs/basic-components";
import { MappingValue } from "./index";
import { Color } from "../interfaces/brick-tag";
import cssStyle from "./style.module.css";
import { MenuIcon } from "@next-core/brick-types";

export const circleIcon: MenuIcon = {
  lib: "fa",
  icon: "circle",
  prefix: "fas",
};

interface BrickValueMappingProps {
  value: string | number;
  showBg?: boolean;
  mapping: Record<string | number, MappingValue>;
  showTagCircle?: boolean;
  shape?: "default" | "round";
  link?: LinkProps;
  triggerClickEvent?: boolean;
  handleClick?: () => void;
}

function getMatch(
  rules: Record<string | number, MappingValue>,
  value: string | number
): MappingValue {
  let ret: MappingValue = null;
  if (isNil(rules) || isNil(value)) return ret;
  ret = rules[value];
  if (!ret) {
    const entries = Object.entries(rules);
    const valueStr = value.toString();
    for (const [key, rule] of entries) {
      let ok = false;
      try {
        ok = !!valueStr.match(key);
      } catch (err) {
        // eslint-disable-next-line
        console.warn("BrickValueMapping:", err.message);
        continue;
      }
      if (ok) {
        ret = rule;
        break;
      }
    }
  }
  return ret;
}

export function BrickValueMapping(
  props: BrickValueMappingProps
): React.ReactElement {
  const {
    mapping,
    value,
    shape,
    showTagCircle,
    link,
    triggerClickEvent,
  } = props;
  const showBg = props.showBg !== false;
  const map = useMemo(() => getMatch(mapping, value), [mapping, value]);
  const match = !!map;
  const color = (match && (Color as any)[map.color]) || "";
  const text = (match && map.text) || value;

  const render = () => {
    if (match && map.icon) {
      return (
        <span
          className={cssStyle.wrapIconText}
          style={{ color: `var(--theme-${color}-color)` }}
        >
          <span
            style={{ fontSize: map.iconSize, marginRight: map.text ? 8 : 0 }}
          >
            <GeneralIcon icon={map.icon}></GeneralIcon>
          </span>
          <span>{map.text}</span>
        </span>
      );
    }

    if (color === "" || !showBg) {
      return <span>{text}</span>;
    }

    return (
      <Tag
        color={color}
        className={classNames(cssStyle.customTag, cssStyle.colorTag, {
          [cssStyle.grayTag]: color === "gray",
          [cssStyle.grayInverseTag]: color === "gray-inverse",
          [cssStyle.round]: shape === "round",
          [cssStyle.tagCircleIcon]: showTagCircle,
        })}
      >
        {showTagCircle && (
          <GeneralIcon
            icon={circleIcon}
            style={{ marginRight: "8px", marginLeft: 0 }}
          />
        )}
        {text}
      </Tag>
    );
  };

  const elem = render();
  const handleClick = (event: React.MouseEvent) => {
    if (triggerClickEvent) {
      event.preventDefault();
      props.handleClick?.();
    }
  };

  return isEmpty(link) ? (
    <span
      className={classNames({ [cssStyle.wrapper]: triggerClickEvent })}
      onClick={handleClick}
    >
      {elem}
    </span>
  ) : (
    <Link {...link} onClick={handleClick}>
      {elem}
    </Link>
  );
}
