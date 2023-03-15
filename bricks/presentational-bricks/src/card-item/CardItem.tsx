import React, { ReactElement, useCallback } from "react";
import { Card, Avatar } from "antd";
import { GeneralIcon, Link } from "@next-libs/basic-components";
import { MenuIcon } from "@next-core/brick-types";
import classNames from "classnames";
import { isArray, map, isNil, find } from "lodash";
import { CardLayoutType, Color } from "./index";
import { CardProps } from "antd/lib/card";

interface CardItemProps {
  cardLayoutType?: CardLayoutType;
  cardTitle: string;
  cardSubtitle?: string;
  descriptionList?: string[] | string;
  topInformation?: string;
  hideDescCircle?: boolean;
  icon?: MenuIcon;
  iconStyle?: Record<string, any>;
  dataSource: Record<string, any>;
  url?: string;
  href?: string;
  showTag?: boolean;
  hideOperate?: boolean;
  tagText?: string;
  tagColor?: Color;
  tagTriangle?: boolean;
  iconColor?: Color;
  descMaxLine?: number;
  hasOperateSlot?: boolean;
  hasBottomRightOperateSlot?: boolean;
  onlyOperateSlot?: boolean;
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
  imgSize?: number;
  shape?: "circle" | "square" | "round-square";
  useLinkBehavior?: boolean;
  disabledLink?: boolean;
  onClick?: () => void;
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
    shape,
    onlyOperateSlot,
    url,
    href,
    target,
    disabledLink,
    useLinkBehavior,
    onClick,
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
  const imgSize = props.imgSize;

  // 标题和标题后的slot
  const cardTitle = (
    <div className="cardTitleWithTagSlot">
      <div className="cardTitle" title={props.cardTitle}>
        {props.cardTitle}
      </div>
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
    <span
      className="iconContainer"
      style={{
        border: "1px solid #d9d9d9",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: `${size}px`,
        height: `${size}px`,
      }}
    >
      <Avatar
        src={props.imgSrc}
        size={imgSize ?? size}
        shape={shape === "square" ? shape : "circle"}
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
        shape={shape}
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
                  title={item}
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
            title={descriptionList}
            style={{
              height:
                descMaxLine *
                  (descriptionDataType === "list" ? lineHeight : 20) -
                3,
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
      className={classNames(
        "operateContainer",
        !onlyOperateSlot && "operatingArea",
        {
          hideOperate: props.hideOperate,
          showOperationAreaWhenHovering: props.showOperationAreaWhenHovering,
        }
      )}
    >
      <slot id="operateSlot" name="operate" />
    </div>
  );
  // 右上角区域的slot
  const topRightOperateArea = (
    <div
      style={
        props.topInformation
          ? { position: "absolute", top: "10px", right: "24px" }
          : {}
      }
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
  //底部扩展区域
  const bottomExtraOperateArea = (
    <div
      style={{ marginTop: "10px" }}
      className={classNames("operateContainer", "operatingArea", {
        hideOperate: props.hideOperate,
        showOperationAreaWhenHovering: props.showOperationAreaWhenHovering,
      })}
    >
      <slot id="extraBottomOperateSlot" name="extraOperate"></slot>
    </div>
  );
  // 下方区域的slot组合
  const bottomOperateArea = (
    <div
      className={classNames(!onlyOperateSlot && "operateArea", {
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
      {props.icon ? bottomLeftOperateArea : bottomOperateArea}
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
      bodyStyle={
        props.topInformation
          ? { padding: "0px 24px 10px 16px" }
          : { padding: "16px 24px 10px 16px" }
      }
      {...configProps}
      bordered={bordered}
    >
      {topRightTag}
      {props.topInformation && (
        <div className="smallTitle">
          <span className="smallTitleText">{props.topInformation}</span>
        </div>
      )}
      <div
        className="cardHeaderContainer"
        style={isNil(descriptionList) ? { marginBottom: "16px" } : {}}
      >
        {props.showImg ? avatarImg(40) : avatarIcon(40)}
        <div className="titleWrapper">
          {titleWithOperateArea}
          {props.cardSubtitle && subtitle}
          <slot id="" name="afterSubtitle" />
        </div>
      </div>
      {(!isNil(descriptionList) || alwaysShowDescription) && description()}
      {bottomOperateArea}
      {bottomExtraOperateArea}
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
      {bottomExtraOperateArea}
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
          <slot id="afterSubtitleSlot" name="afterSubtitle" />
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

  // CardLayoutType.BLOCK_ICON_ALIGN_LEFT
  const cardNodeF = (
    <Card
      hoverable={hoverable}
      className={classNames("cardItem", "cardItemF", {
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
      case CardLayoutType.BLOCK_ICON_ALIGN_LEFT:
        return cardNodeF;
    }
  };

  const handleNativeClick = useCallback(
    (e: MouseEvent | React.MouseEvent) => {
      const foundOperatingArea = find(
        (e as MouseEvent).composedPath(),
        (element: HTMLElement) => {
          return element.classList?.contains("operateContainer");
        }
      ) as HTMLElement;
      if (foundOperatingArea) {
        e.preventDefault();
        return;
      }
      onClick?.();
    },
    [onClick]
  );

  return useLinkBehavior ? (
    <Link
      to={url}
      href={href}
      target={target}
      disabled={disabledLink}
      onClick={handleNativeClick}
      useNativeEvent
    >
      {getCardNode()}
    </Link>
  ) : (
    getCardNode()
  );
}
