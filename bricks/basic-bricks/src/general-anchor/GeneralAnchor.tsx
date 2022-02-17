import React, { useEffect, useRef, useState } from "react";
import { Anchor, AnchorProps } from "antd";
import { AnchorListType } from "./index";
import { UseBrickConf } from "@next-core/brick-types";
import { BrickAsComponent, getHistory } from "@next-core/brick-kit";
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
  const { configProps, type, extraBrick, handleClick, handleChange } = props;
  const { Link } = Anchor;

  const getHref = (hash: string) => {
    const isHash = (hash || "").startsWith("#");
    if (!isHash) {
      return hash;
    }
    const history = getHistory();
    return history.createHref({
      ...history.location,
      hash,
    });
  };

  const activeLink = useRef(getHref(location.hash));
  const [anchorList, setAnchorList] = useState([]);
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
      props?.anchorList.find((item) => item.href.includes(location.hash))
        ?.href || "";

    if (initHash) {
      const sharpLinkMatch = sharpMatcherRegx.exec(initHash.toString());
      const target = document.getElementById(sharpLinkMatch[1]);

      if (target) {
        setTimeout(() => {
          window.scrollTo({
            top: target.offsetTop - (configProps?.offsetTop || 56),
          });
        });
        handleChange(initHash);
      }
    }
  }, []);

  useEffect(() => {
    if (props?.anchorList?.length) {
      const anchorList = props.anchorList.map((anchor) => ({
        ...anchor,
        href: getHref(anchor.href),
      }));
      setAnchorList([...anchorList]);
    }
  }, [props?.anchorList]);

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
      getCurrentAnchor={() => activeLink.current}
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
