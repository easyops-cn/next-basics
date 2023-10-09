import React, { useState, useEffect, useRef } from "react";
import { UseBrickConf, MenuIcon } from "@next-core/brick-types";
import { BrickAsComponent } from "@next-core/brick-kit";
import { GeneralIcon } from "@next-libs/basic-components";
import styles from "./PopoverContainer.module.css";
import { Popover } from "antd";
import { TooltipPlacement } from "antd/lib/tooltip";
import { ActionType, AlignType } from "rc-trigger/lib/interface";
import classNames from "classnames";
import { merge } from "lodash";

interface PopoverContainerProps {
  data?: any;
  visible?: boolean;
  displayBrick: {
    useBrick: UseBrickConf;
    data?: any;
  };
  popoverBrick: {
    useBrick: UseBrickConf;
    data?: any;
  };
  popoverTitleBrick?: {
    useBrick: UseBrickConf;
  };
  align?: AlignType;
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
  onVisibleChange?: (visible: boolean) => void;
  popoverIcon?: MenuIcon;
  placement?: TooltipPlacement;
  trigger?: ActionType | ActionType[];
  showPopoverBg?: boolean;
  popoverContentStyle?: Record<string, any>;
  triggerByIcon?: boolean;
  showIcon?: "always" | "never" | "hover";
  related?: boolean;
  highlighted?: boolean;
  faded?: boolean;
  transferGraphAttrs?: boolean;
  zIndex?: number;
  itemMouseEnter?: () => void;
  itemMouseLeave?: () => void;
  transferVisible?: boolean;
}

export function PopoverContainer(
  props: PopoverContainerProps
): React.ReactElement {
  const customElementRef = useRef<HTMLDivElement>();
  const [visible, setVisible] = useState(props.visible);
  const trigger = props.trigger ?? "click";
  const ref = useRef<HTMLDivElement>();

  useEffect(() => {
    setVisible(props.visible);
  }, [props.visible]);

  const popoverBrickNode = React.useMemo(() => {
    let useBrick = props.popoverBrick?.useBrick;
    if (!useBrick) {
      return null;
    }
    if (props.transferVisible) {
      useBrick = [].concat(useBrick).map((v) => ({
        ...v,
        properties: { ...(v.properties ?? {}), useBrickVisible: visible },
      }));
    }
    return (
      <div
        className={styles.popoverBrick}
        style={
          props.popoverContentStyle ?? {
            width: 200,
          }
        }
      >
        <BrickAsComponent
          data={props.popoverBrick.data ?? props.data}
          useBrick={useBrick}
          parentRefForUseBrickInPortal={ref}
        />
      </div>
    );
  }, [props.popoverBrick, visible, props.transferVisible]);

  useEffect(() => {
    const handleClick = (): void => {
      customElementRef.current?.parentNode?.dispatchEvent(
        new MouseEvent("click")
      );
    };
    const handleMouseover = (): void => {
      customElementRef.current?.parentNode?.dispatchEvent(
        new MouseEvent("mouseover", {
          bubbles: true,
        })
      );
    };
    if (!props.triggerByIcon) {
      if (props.trigger === "click") {
        customElementRef.current?.addEventListener("click", handleClick);
      } else if (props.trigger === "hover") {
        customElementRef.current?.addEventListener(
          "mouseover",
          handleMouseover
        );
      }
    }
    return () => {
      customElementRef.current?.removeEventListener(
        "mouseover",
        handleMouseover
      );
      customElementRef.current?.removeEventListener("click", handleClick);
    };
  }, [props.triggerByIcon, props.trigger]);

  const onVisibleChange = (value: boolean) => {
    setVisible(value);
    props.onVisibleChange && props.onVisibleChange(value);
  };

  const processedUseBrickOfDisplayBrick = React.useMemo(() => {
    let useBrick = props.displayBrick?.useBrick;
    if (!useBrick) {
      return null;
    }
    if (props.transferGraphAttrs) {
      const graphAttrs = {
        properties: {
          related: props.related,
          faded: props.faded,
          highlighted: props.highlighted,
        },
      };
      if (Array.isArray(useBrick)) {
        useBrick.map((v) => merge({}, v, graphAttrs));
      } else {
        useBrick = merge({}, useBrick, graphAttrs);
      }
    }
    return useBrick;
  }, [
    props.displayBrick,
    props.transferGraphAttrs,
    props.faded,
    props.highlighted,
    props.related,
  ]);

  const displayBrickNode = (
    <>
      {props.displayBrick?.useBrick && (
        <div className={classNames(styles.displayBrick)} ref={customElementRef}>
          <BrickAsComponent
            data={props.displayBrick.data ?? props.data}
            useBrick={processedUseBrickOfDisplayBrick}
          />
        </div>
      )}
    </>
  );

  return (
    <div
      className={classNames({
        [styles.displayBrickContainer]: props.triggerByIcon,
        [styles.displayBrickContainerFaded]:
          props.transferGraphAttrs && props.faded,
      })}
      ref={ref}
      onMouseEnter={props.itemMouseEnter}
      onMouseLeave={props.itemMouseLeave}
    >
      {props.triggerByIcon && displayBrickNode}
      <Popover
        visible={visible}
        placement={props.placement ?? "bottom"}
        content={popoverBrickNode}
        trigger={trigger}
        overlayClassName={props.showPopoverBg ? "" : styles.customOverlay}
        onVisibleChange={onVisibleChange}
        zIndex={props.zIndex ?? 1030}
        align={props.align}
        getPopupContainer={props.getPopupContainer}
        {...(props.popoverTitleBrick?.useBrick
          ? {
              title: (
                <BrickAsComponent
                  useBrick={props.popoverTitleBrick.useBrick}
                  data={props.data}
                />
              ),
            }
          : {})}
      >
        <div
          data-testid="trigger-container"
          className={classNames(styles.cursorPointer, {
            [styles.displayBrickContainer]: !props.triggerByIcon,
          })}
        >
          {!props.triggerByIcon && displayBrickNode}
          {props.showIcon !== "never" && (
            <div
              className={classNames(styles.editIcon, {
                [styles.editIconVisible]:
                  props.showIcon === "always" || visible,
              })}
            >
              <GeneralIcon
                icon={
                  props.popoverIcon ?? {
                    lib: "fa",
                    icon: "pencil-alt",
                    prefix: "fas",
                  }
                }
              />
            </div>
          )}
        </div>
      </Popover>
    </div>
  );
}
