import React, { useEffect, useRef, useState } from "react";
import { Icon as LegacyIcon } from "@ant-design/compatible";
import { Card, Tooltip, Button } from "antd";
import { CardProps } from "antd/lib/card";
import { isEmpty } from "lodash";
import ResizeObserver from "resize-observer-polyfill";
import { OperationButton } from "../interfaces";
import classNames from "classnames";

export interface GeneralCardProps {
  configProps?: CardProps;
  operationButtons?: OperationButton[];
  hasExtraSlot?: boolean;
  cardTitle?: string;
  fillVertical?: boolean;
  verticalCenter?: boolean;
  isFixedFooter?: boolean;
  compactMode?: boolean;
  cardContentWrapperStyle?: React.CSSProperties;
}

export function GeneralCard({
  configProps,
  operationButtons,
  hasExtraSlot,
  cardTitle,
  fillVertical,
  verticalCenter,
  isFixedFooter,
  compactMode,
  cardContentWrapperStyle,
}: GeneralCardProps): React.ReactElement {
  const [paddingBottom, setPaddingBottom] = useState(0);
  const [fixedStyle, setFixedStyle] = useState({});
  const footerRef = useRef<HTMLDivElement>();
  const renderButtons = (
    operationButtons: OperationButton[]
  ): React.ReactElement[] =>
    operationButtons.map((button, index) => {
      const icon = button.configProps?.icon;
      return (
        <Tooltip title={button.tooltip} key={index}>
          <Button
            {...button.configProps}
            icon={icon && <LegacyIcon type={icon} />}
            id={button.id}
          >
            {button.text}
          </Button>
        </Tooltip>
      );
    });

  const title = cardTitle && (
    <>
      {cardTitle} <slot id="titleSlot" name="titleSuffix" />
    </>
  );

  // istanbul ignore next
  const handleFooter = () => {
    const rootNodeRef = footerRef.current.getRootNode().host;
    const rootNodeRect = rootNodeRef.getBoundingClientRect();
    const top = rootNodeRect.bottom - window.innerHeight;
    if (top <= 0) {
      setFixedStyle({});
    } else {
      setFixedStyle({
        position: "fixed",
        left: rootNodeRect.left,
        bottom: 0,
        width: rootNodeRef.clientWidth,
      });
    }
  };
  // istanbul ignore next
  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      if (
        paddingBottom !== footerRef.current.clientHeight &&
        footerRef.current.clientHeight
      ) {
        setPaddingBottom(footerRef.current.clientHeight);
        if (isFixedFooter) {
          handleFooter();
        }
      }
    });
    resizeObserver.observe(footerRef.current.getRootNode().host);

    if (isFixedFooter) {
      window.addEventListener("scroll", handleFooter);
      window.addEventListener("resize", handleFooter);
    }
    return () => {
      resizeObserver.disconnect();
      if (isFixedFooter) {
        window.removeEventListener("scroll", handleFooter);
        window.removeEventListener("resize", handleFooter);
      }
    };
  }, []);

  const buttons = isEmpty(operationButtons)
    ? null
    : renderButtons(operationButtons);

  const extra =
    hasExtraSlot || !isEmpty(operationButtons) ? (
      <div className="generalCardExtra">
        {buttons}
        <slot id="extraSlot" name="extra" />
      </div>
    ) : null;

  return (
    <Card
      style={{
        ...(fillVertical ? { height: "100%" } : {}),
        ...(verticalCenter
          ? { display: "grid", gridTemplate: "50px auto/auto" }
          : {}),
        paddingBottom,
      }}
      bordered={false}
      extra={extra}
      title={title}
      {...configProps}
      className={classNames("generalCardContainer", {
        compactCardContainer: compactMode,
        generalCardContainerHoverable: configProps?.hoverable,
      })}
    >
      <div
        style={{
          ...(verticalCenter
            ? {
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }
            : {}),
          ...cardContentWrapperStyle,
        }}
      >
        <slot id="contentSlot" name="content" />
      </div>
      <div
        className="generalCardFooter"
        ref={footerRef}
        style={{
          ...fixedStyle,
          ...(paddingBottom ? {} : { padding: 0 }),
        }}
      >
        <slot id="footerSlot" name="footer" />
      </div>
    </Card>
  );
}
