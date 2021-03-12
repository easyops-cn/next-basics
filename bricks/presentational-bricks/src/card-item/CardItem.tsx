import React, { ReactElement } from "react";
import { Card, Avatar } from "antd";
import { GeneralIcon } from "@next-libs/basic-components";
import { MenuIcon } from "@next-core/brick-types";
import classNames from "classnames";
import { isArray, map, isNil } from "lodash";
import { CardLayoutType, Color } from "./index";
import { CardProps } from "antd/lib/card";

interface CardItemProps {
  cardLayoutType?: CardLayoutType;
  cardTitle: string;
  cardSubtitle?: string;
  descriptionList?: string[] | string;
  hideDescCircle?: boolean;
  icon?: MenuIcon;
  iconStyle?: Record<string, any>;
  dataSource: Record<string, any>;
  url?: string;
  showTag?: boolean;
  hideOperate?: boolean;
  tagText?: string;
  tagColor?: Color;
  tagTriangle?: boolean;
  iconColor?: Color;
  descMaxLine?: number;
  hasOperateSlot?: boolean;
  hasBottomRightOperateSlot?: boolean;
  iconSize?: string | number;
  iconOffsetX?: string | number;
  iconOffsetY?: string | number;
  iconOpacity?: number;
  target?: string;
  configProps?: CardProps;
  bordered?: boolean;
  hoverable?: boolean;
  showOperationAreaWhenHovering?: boolean;
  alwaysShowDescription?: boolean;
  descriptionDataType?: "list" | "section";
  disabled?: boolean;
  reverseBgColor?: boolean;
  imgSrc?: string;
  showImg?: boolean;
}

export function CardItem(props: CardItemProps): React.ReactElement {
  const cardLayoutType =
    props.cardLayoutType || CardLayoutType.ICON_AS_BACKGROUND;
  const {
    descriptionList,
    hideDescCircle,
    iconColor,
    hasOperateSlot,
    hasBottomRightOperateSlot,
    configProps = {},
    bordered,
    hoverable,
    alwaysShowDescription,
    descriptionDataType,
    reverseBgColor,
  } = props;
  const hasBottomSlot =
    cardLayoutType === CardLayoutType.ICON_AS_BACKGROUND
      ? hasOperateSlot
      : hasOperateSlot || hasBottomRightOperateSlot;
  const defaultDescMaxLine = hasBottomSlot ? 2 : 3;
  const descMaxLine = isNil(props.descMaxLine)
    ? defaultDescMaxLine
    : props.descMaxLine;
  const iconSize = props.iconSize || "100px";
  const iconOffsetX = props.iconOffsetX || 0;
  const iconOffsetY = props.iconOffsetY || 0;
  const iconOpacity = props.iconOpacity || 0.45;

  // 标题和标题后的slot
  const cardTitle = (
    <div className="cardTitleWithTagSlot">
      <div className="cardTitle">{props.cardTitle}</div>
      <slot id="afterTitleSlot" name="afterTitle" />
    </div>
  );
  // 副标题
  const subtitle = <div className="cardSubtitle">{props.cardSubtitle}</div>;
  const cardIconAsBackground = (
    <span className="iconContainer">
      <div
        className="cardIcon"
        style={{
          width: iconSize,
          height: iconSize,
          lineHeight: iconSize,
          fontSize: iconSize,
          right: iconOffsetX,
          bottom: iconOffsetY,
          opacity: iconOpacity,
          ...props.iconStyle,
        }}
      >
        <GeneralIcon icon={props.icon} />
      </div>
    </span>
  );

  const topRightTag = (
    <>
      {props.showTag && (
        <div
          className={classNames("cardTag", props.tagColor, {
            tagTriangle: props.tagTriangle,
          })}
        >
          {props.tagText}
        </div>
      )}
    </>
  );

  const avatarImg = (size: number): React.ReactElement => (
    <span className="iconContainer">
      <Avatar
        src={props.imgSrc}
        size={size}
        style={{ border: "1px solid #d9d9d9", borderRadius: "50%" }}
      />
    </span>
  );

  const avatarIcon = (size: number): React.ReactElement => (
    <span className="iconContainer">
      <GeneralIcon
        icon={{ color: iconColor, ...props.icon }}
        bg={true}
        size={size}
        reverseBgColor={reverseBgColor}
        showEmptyIcon={true}
      />
    </span>
  );
  // 描述信息
  const description = (lineHeight = 23): React.ReactElement => {
    const marginBottomZero = !hasBottomSlot;
    return (
      <>
        {isArray(descriptionList) ? (
          <ul
            className="descList"
            style={{
              height: descMaxLine * lineHeight,
              ...(marginBottomZero ? { marginBottom: 0 } : {}),
            }}
          >
            {map(descriptionList, (item) => {
              return (
                <li
                  key={item}
                  className={classNames({
                    withCircle: !hideDescCircle,
                  })}
                >
                  {item}
                </li>
              );
            })}
          </ul>
        ) : (
          <div
            className="desc"
            style={{
              height:
                descMaxLine *
                (descriptionDataType === "list" ? lineHeight : 20),
              WebkitLineClamp: descMaxLine,
              ...(marginBottomZero ? { marginBottom: 0 } : {}),
            }}
          >
            {descriptionList}
          </div>
        )}
      </>
    );
  };
  // 左下方区域的slot
  const bottomLeftOperateArea = (
    <div
      className={classNames("operateContainer", "operatingArea", {
        hideOperate: props.hideOperate,
        showOperationAreaWhenHovering: props.showOperationAreaWhenHovering,
      })}
    >
      <slot id="operateSlot" name="operate" />
    </div>
  );
  // 右上角区域的slot
  const topRightOperateArea = (
    <div
      className={classNames("operateContainer", "topRightOperatingArea", {
        hideOperate: props.hideOperate,
        showOperationAreaWhenHovering: props.showOperationAreaWhenHovering,
      })}
    >
      <slot id="topRightOperateSlot" name="topRightOperate" />
    </div>
  );
  // 右下角区域的slot
  const bottomRightOperateArea = (
    <div
      className={classNames("operateContainer", {
        hideOperate: props.hideOperate,
        showOperationAreaWhenHovering: props.showOperationAreaWhenHovering,
      })}
    >
      <slot id="bottomRightOperateSlot" name="bottomRightOperate" />
    </div>
  );
  // 下方区域的slot组合
  const bottomOperateArea = (
    <div
      className={classNames("operateArea", {
        hideOperate: props.hideOperate,
        showOperationAreaWhenHovering: props.showOperationAreaWhenHovering,
      })}
    >
      {bottomLeftOperateArea}
      {bottomRightOperateArea}
    </div>
  );
  // Todo(Lynette): 富媒体，卡片可包含照片、图形等。storyboard中暂时还没支持配置图片。

  const titleWithOperateArea = (
    <div className="operateArea">
      {cardTitle}
      {topRightOperateArea}
    </div>
  );
  // CardLayoutType.ICON_AS_BACKGROUND
  // 使用场景的描述数据为数组
  const cardNodeA = (
    <Card
      hoverable={hoverable}
      className={classNames("cardItem", "cardItemA", {
        noBordered: !bordered,
        noHover: !hoverable || props.disabled,
        disabledCard: props.disabled,
      })}
      bodyStyle={{ padding: "20px" }}
      {...configProps}
      bordered={bordered}
    >
      {topRightTag}
      {titleWithOperateArea}
      {description()}
      {cardIconAsBackground}
      {bottomLeftOperateArea}
    </Card>
  );

  // CardLayoutType.ICON_SMALL_ALIGN_LEFT
  const cardNodeB = (
    <Card
      hoverable={hoverable}
      className={classNames("cardItem", "cardItemB", {
        noBordered: !bordered,
        noHover: !hoverable || props.disabled,
        disabledCard: props.disabled,
      })}
      bodyStyle={{ padding: "20px" }}
      {...configProps}
      bordered={bordered}
    >
      {topRightTag}
      <div className="cardHeaderContainer">
        {props.showImg ? avatarImg(40) : avatarIcon(40)}
        <div className="titleWrapper">
          {titleWithOperateArea}
          {props.cardSubtitle && subtitle}
        </div>
      </div>
      {(!isNil(descriptionList) || alwaysShowDescription) && description()}
      {bottomOperateArea}
    </Card>
  );

  // CardLayoutType.ICON_ALIGN_RIGHT
  const cardNodeC = (
    <Card
      hoverable={hoverable}
      className={classNames("cardItem", "cardItemC", {
        noBordered: !bordered,
        noHover: !hoverable || props.disabled,
        disabledCard: props.disabled,
      })}
      bodyStyle={{ padding: "20px" }}
      {...configProps}
      bordered={bordered}
    >
      {topRightTag}
      <div className="cardHeaderContainer">
        <div className="titleWrapper">
          {cardTitle}
          {(!isNil(descriptionList) || alwaysShowDescription) && description()}
        </div>
        {props.showImg ? avatarImg(70) : avatarIcon(70)}
      </div>
      {bottomOperateArea}
    </Card>
  );

  // CardLayoutType.ICON_ALIGN_LEFT
  // 使用场景的描述数据为数组或为空
  const cardNodeD = (
    <Card
      hoverable={hoverable}
      className={classNames("cardItem", "cardItemD", {
        noBordered: !bordered,
        noHover: !hoverable || props.disabled,
        disabledCard: props.disabled,
      })}
      bodyStyle={{ padding: "20px" }}
      {...configProps}
      bordered={bordered}
    >
      {topRightTag}
      <div className="cardHeaderContainer">
        {props.showImg ? avatarImg(54) : avatarIcon(54)}
        <div className="titleWrapper">
          {titleWithOperateArea}
          {props.cardSubtitle && subtitle}
          {(!isNil(descriptionList) || alwaysShowDescription) &&
            description(20)}
        </div>
      </div>
      {bottomOperateArea}
    </Card>
  );

  // CardLayoutType.ICON_ALIGN_MIDDLE
  const cardNodeE = (
    <Card
      hoverable={hoverable}
      className={classNames("cardItem", "cardItemE", {
        noBordered: !bordered,
        noHover: !hoverable || props.disabled,
        disabledCard: props.disabled,
      })}
      bodyStyle={{ padding: "28px" }}
      {...configProps}
      bordered={bordered}
    >
      {topRightTag}
      <div className="cardHeaderContainer">
        {topRightOperateArea}
        {props.showImg ? avatarImg(54) : avatarIcon(48)}
      </div>
      {cardTitle}
      {(!isNil(descriptionList) || alwaysShowDescription) && description(20)}
      {bottomLeftOperateArea}
    </Card>
  );

  const getCardNode = (): ReactElement => {
    switch (cardLayoutType) {
      case CardLayoutType.ICON_AS_BACKGROUND:
        return cardNodeA;
      case CardLayoutType.ICON_SMALL_ALIGN_LEFT:
        return cardNodeB;
      case CardLayoutType.ICON_ALIGN_RIGHT:
        return cardNodeC;
      case CardLayoutType.ICON_ALIGN_LEFT:
        return cardNodeD;
      case CardLayoutType.ICON_ALIGN_MIDDLE:
        return cardNodeE;
    }
  };

  return getCardNode();
}
