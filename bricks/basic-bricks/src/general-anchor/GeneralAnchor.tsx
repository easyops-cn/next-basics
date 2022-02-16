import React, { useEffect, useState } from "react";
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
  handleClick?: (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    arg: AnchorListType
  ) => void;
  handleChange?: (currentActiveLink: string) => void;
}
export function GeneralAnchor(props: GeneralAnchorProps): React.ReactElement {
  const {
    anchorList,
    configProps,
    type,
    extraBrick,
    handleClick,
    handleChange,
  } = props;
  const { Link } = Anchor;
  const [activeLink, setActiveLink] = useState("");
  const renderAnchorList = (
    anchorList: AnchorListType[],
    type?: "default" | "radio"
  ) => {
    return anchorList.map((item: AnchorListType, i: number) => {
      return (
        <span key={i} onClick={(e) => handleClick(e, item)}>
          <Link
            title={item.title}
            href={item.href}
            target={item.target}
            key={i}
          >
            {type === "default" &&
              item.children?.length &&
              renderAnchorList(item.children, type)}
          </Link>
        </span>
      );
    });
  };

  useEffect(() => {
    /* TODO(astrid): 初始锚点无法滚动到对应位置 */
    const sharpMatcherRegx = /#([\S ]+)$/;
    const initHash =
      anchorList.find((item) => item.href.includes(activeLink || location.hash))
        ?.href || "";
    if (initHash) {
      setActiveLink(initHash);
      const sharpLinkMatch = sharpMatcherRegx.exec(initHash.toString());
      const target = document.getElementById(sharpLinkMatch[1]);
      if (target) {
        setTimeout(() => {
          window.scrollTo({
            top: target.offsetTop - (configProps?.offsetTop || 56),
          });
        });
        handleChange(activeLink);
      }
    }
  }, []);

  return (
    <Anchor
      offsetTop={56}
      {...configProps}
      className={classnames([
        {
          [styles.anchorWrapper]: type !== "default",
        },
      ])}
      onChange={handleChange}
      getCurrentAnchor={() => activeLink}
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
