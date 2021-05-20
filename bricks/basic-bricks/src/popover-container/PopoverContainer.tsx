import React, { useState, useEffect, useRef } from "react";
import { UseBrickConf, MenuIcon } from "@next-core/brick-types";
import { BrickAsComponent } from "@next-core/brick-kit";
import { GeneralIcon } from "@next-libs/basic-components";
import styles from "./PopoverContainer.module.css";
import { Popover } from "antd";
import { TooltipPlacement } from "antd/lib/tooltip";
import { ActionType } from "rc-trigger/lib/interface";
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
}

export function PopoverContainer(
  props: PopoverContainerProps
): React.ReactElement {
  const customElementRef = useRef<HTMLDivElement>();
  const [visible, setVisible] = useState(props.visible);
  const trigger = props.trigger ?? "click";
  const ref = React.createRef<HTMLDivElement>();

  useEffect(() => {
    setVisible(props.visible);
  }, [props.visible]);

  const popoverBrickNode = (
    <>
      {props.popoverBrick?.useBrick && (
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
            useBrick={props.popoverBrick.useBrick}
            parentRefForUseBrickInPortal={ref}
          />
        </div>
      )}
    </>
  );

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
      })}
      ref={ref}
    >
      {props.triggerByIcon && displayBrickNode}
      <Popover
        visible={visible}
        placement={props.placement ?? "bottom"}
        content={popoverBrickNode}
        trigger={trigger}
        overlayClassName={props.showPopoverBg ? "" : styles.customOverlay}
        onVisibleChange={onVisibleChange}
      >
        <div
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
