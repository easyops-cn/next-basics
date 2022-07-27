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
  useCurrentTheme,
  useFeatureFlags,
  getRuntime,
  useCurrentApp,
} from "@next-core/brick-kit";

interface BrickIllustrationProps extends IllustrationProps {
  mode: "feedback" | "guide";
  imageStyle?: CSSProperties;
  header?: IllustrationHeader;
  footer?: IllustrationFooter;
  useNewIllustration?: boolean;
}
export function BrickIllustration({
  name,
  category,
  mode,
  header,
  footer,
  imageStyle,
  useNewIllustration,
}: BrickIllustrationProps): React.ReactElement {
  const app = useCurrentApp();
  const theme = useCurrentTheme();
  const [isFeatureFlag] = useFeatureFlags("support-new-illustrations");
  const miscSettings = getRuntime().getMiscSettings();
  const isSupportedApp = (
    (miscSettings["supportedNewIllustrationApps"] || []) as any
  ).includes(app.id);

  const image = useMemo(() => {
    let illustrationConfig: IllustrationProps = { name, category, theme };
    if (isFeatureFlag && isSupportedApp) {
      illustrationConfig = translateIllustrationConfig(
        useNewIllustration,
        illustrationConfig
      );
    }
    return getIllustration(illustrationConfig);
  }, [
    name,
    category,
    theme,
    useNewIllustration,
    isFeatureFlag,
    isSupportedApp,
  ]);

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
        <img src={image} className={styles.imageDefault} style={imageStyle} />
        {renderFooter}
      </div>
    </div>
  );
}
