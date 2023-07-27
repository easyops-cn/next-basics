import React, { CSSProperties, useMemo } from "react";
import {
  getIllustration,
  IllustrationProps,
  translateIllustrationConfig,
} from "@next-core/illustrations";
import styles from "./index.module.css";
import classNames from "classnames";
import { Link } from "@next-libs/basic-components";
import { IllustrationFooter, IllustrationHeader } from "./index";
import {
  IconSize,
  IllustrationWrapper,
} from "../brick-result/components/IllustrationWrapper";

interface BrickIllustrationProps extends IllustrationProps {
  mode: "feedback" | "guide";
  imageStyle?: CSSProperties;
  header?: IllustrationHeader;
  footer?: IllustrationFooter;
  useNewIllustration?: boolean;
  size?: IconSize;
}
export function BrickIllustration({
  name,
  category,
  mode,
  header,
  footer,
  imageStyle,
  useNewIllustration,
  size,
}: BrickIllustrationProps): React.ReactElement {
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
        <IllustrationWrapper
          {...{ name, useNewIllustration, category, imageStyle, size }}
        />
        {renderFooter}
      </div>
    </div>
  );
}
