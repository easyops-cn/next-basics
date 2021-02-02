import React, { CSSProperties, useMemo } from "react";
import { getIllustration, IllustrationProps } from "@next-core/illustrations";
import styles from "./index.module.css";
import classNames from "classnames";
import { Link } from "@next-libs/basic-components";
import { IllustrationFooter, IllustrationHeader } from "./index";

interface BrickIllustrationProps extends IllustrationProps {
  mode: "feedback" | "guide";
  imageStyle?: CSSProperties;
  header?: IllustrationHeader;
  footer?: IllustrationFooter;
}
export function BrickIllustration({
  name,
  category,
  mode,
  header,
  footer,
  imageStyle,
}: BrickIllustrationProps): React.ReactElement {
  const image = useMemo(() => {
    return getIllustration({ name, category });
  }, [name, category]);

  const renderHeader = useMemo(() => {
    return (
      header && (
        <div className={styles.header}>
          <div className={styles.title}>{header?.title}</div>
          {header?.description && (
            <div className={styles.description}>{header?.description}</div>
          )}
        </div>
      )
    );
  }, [header]);

  const renderFooter = useMemo(() => {
    return (
      footer && (
        <div className={styles.footer}>
          <span className={styles.text}>{footer?.text}</span>
          <Link to={footer?.url}>{footer?.label} </Link>
        </div>
      )
    );
  }, [footer]);

  return (
    <div className={styles.illustrationWrapper}>
      <div
        className={classNames({
          [styles.feedback]: mode === "feedback",
          [styles.guide]: mode === "guide",
        })}
      >
        {renderHeader}
        <img src={image} style={imageStyle} />
        {renderFooter}
      </div>
    </div>
  );
}
