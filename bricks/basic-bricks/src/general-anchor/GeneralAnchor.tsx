import React from "react";
import { Anchor, AnchorProps } from "antd";
import { AnchorListType } from "./index";
interface GeneralAnchorProps {
  configProps?: AnchorProps;
  anchorList: AnchorListType[];
  type?: "default" | "radio";
  hasExtraSlot?: boolean;
}
export function GeneralAnchor(props: GeneralAnchorProps): React.ReactElement {
  const { anchorList, configProps, type, hasExtraSlot } = props;
  const { Link } = Anchor;
  const renderAnchorList = (
    anchorList: AnchorListType[],
    type?: "default" | "radio"
  ) => {
    return anchorList.map((item: AnchorListType, i: number) => {
      return (
        <Link title={item.title} href={item.href} target={item.target} key={i}>
          {type === "default" &&
            item.children?.length &&
            renderAnchorList(item.children, type)}
        </Link>
      );
    });
  };
  return type === "default" ? (
    <Anchor offsetTop={56} {...configProps}>
      {renderAnchorList(anchorList, type)}
    </Anchor>
  ) : (
    <Anchor offsetTop={56} {...configProps} className="anchorWrapper">
      <div className="anchorContainer">
        <div className="anchorLinkContainer">
          {renderAnchorList(anchorList, type)}
        </div>
        {hasExtraSlot && (
          <div className="extraContainer">
            <slot name="extra" id="extraSlot" />
          </div>
        )}
      </div>
    </Anchor>
  );
}
