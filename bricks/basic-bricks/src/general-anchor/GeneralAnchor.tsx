import React from "react";
import { Anchor, AnchorProps } from "antd";
import { AnchorListType } from "./index";
import { UseBrickConf } from "@next-core/brick-types";
import { BrickAsComponent } from "@next-core/brick-kit";
import styles from "./GeneralAnchor.module.css";
import classnames from "classnames";
interface GeneralAnchorProps {
  configProps?: AnchorProps;
  anchorList: AnchorListType[];
  type?: "default" | "radio";
  extraBrick?: { useBrick: UseBrickConf };
}
export function GeneralAnchor(props: GeneralAnchorProps): React.ReactElement {
  const { anchorList, configProps, type, extraBrick } = props;
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
  return (
    <Anchor
      offsetTop={56}
      {...configProps}
      className={classnames([
        {
          [styles.anchorWrapper]: type !== "default",
        },
      ])}
    >
      {type === "default" ? (
        renderAnchorList(anchorList, type)
      ) : (
        <div className={styles.anchorContainer}>
          <div className={styles.anchorLinkContainer}>
            {renderAnchorList(anchorList, type)}
          </div>
          {extraBrick?.useBrick && (
            <div className={styles.extraContainer}>
              <BrickAsComponent useBrick={extraBrick.useBrick} />
            </div>
          )}
        </div>
      )}
    </Anchor>
  );
}
