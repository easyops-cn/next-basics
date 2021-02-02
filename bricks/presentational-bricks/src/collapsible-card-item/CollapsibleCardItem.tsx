import React from "react";
import { MenuIcon } from "@next-core/brick-types";
import { GeneralIcon } from "@next-libs/basic-components";

interface CollapsibleCardItemProps {
  cardTitle: string;
  cardDesc?: string;
  isActive?: boolean;
  icon?: MenuIcon;
  iconStyle?: Record<string, any>;
  customHeader?: boolean;
  contentStyle?: Record<string, any>;
  showSubscript?: boolean;
  subscriptIconConfig?: MenuIcon;
  hideOperate?: boolean;
}

export function CollapsibleCardItem(
  props: CollapsibleCardItemProps
): React.ReactElement {
  return (
    <div className="brickCollapsibleCardContainer">
      <div
        className="headerContainer"
        style={props.isActive ? { borderBottom: "solid 1px #e8e8e8" } : {}}
      >
        {props.showSubscript && (
          <div className="subscriptContainer">
            <GeneralIcon icon={props.subscriptIconConfig}></GeneralIcon>
          </div>
        )}
        <div className="collapsibleCardItemInfo">
          {props.customHeader ? (
            <slot id="headerSlot" name="header" />
          ) : (
            <>
              {props.icon && (
                <i style={props.iconStyle} className="collapsibleCardItemIcon">
                  <GeneralIcon icon={props.icon} />
                </i>
              )}
              <div className="collapsibleTitle">
                {props.cardTitle}
                {props.cardDesc && <>（{props.cardDesc}）</>}
              </div>
            </>
          )}
        </div>
        {!props.hideOperate && (
          <div className="operatingArea">
            <slot id="operateSlot" name="operate" />
          </div>
        )}
      </div>
      {props.isActive && (
        <div className="contentContainer" style={props.contentStyle}>
          <slot id="contentSlot" name="content" />
        </div>
      )}
    </div>
  );
}
