import React from "react";
import styles from "./GeneralTitle.module.css";
import { BrickAsComponent } from "@next-core/brick-kit";
import { UseBrickConf } from "@next-core/brick-types";
import { Link } from "@next-libs/basic-components";

interface GeneralTitleProps {
  mainTitle: string;
  subTitle?: string;
  description?: string;
  url?: string;
  target?: string;
  titleSuffixBrick?: { useBrick: UseBrickConf };
  descPrefixBrick?: { useBrick: UseBrickConf };
  dataSource?: Record<string, any>;
  descSuffixBrick?: { useBrick: UseBrickConf };
}

export function GeneralTitle(props: GeneralTitleProps): React.ReactElement {
  const {
    mainTitle,
    description,
    titleSuffixBrick,
    descPrefixBrick,
    dataSource,
    subTitle,
    url,
    target,
    descSuffixBrick,
  } = props;
  return (
    <div>
      {mainTitle && (
        <div className={styles.titleWrapper}>
          {url ? (
            <Link to={url} target={target} className={styles.titleContentUrl}>
              {mainTitle}
            </Link>
          ) : (
            <div className={styles.titleContent}>{mainTitle}</div>
          )}
          {titleSuffixBrick?.useBrick && (
            <BrickAsComponent
              useBrick={titleSuffixBrick.useBrick}
              data={dataSource}
            />
          )}
        </div>
      )}
      {subTitle && (
        <div className={styles.subTitleWrapper}>
          <div className={styles.subTitleContent}>{subTitle}</div>
        </div>
      )}
      {description && (
        <div className={styles.descriptionWrapper}>
          {descPrefixBrick?.useBrick && (
            <BrickAsComponent
              useBrick={descPrefixBrick.useBrick}
              data={dataSource}
            />
          )}
          <div
            className={styles.descriptionContent}
            style={{
              marginLeft: descPrefixBrick?.useBrick ? "5px" : "",
              marginRight: descSuffixBrick?.useBrick ? "5px" : "",
            }}
          >
            {description}
          </div>
          {descSuffixBrick?.useBrick && (
            <BrickAsComponent
              useBrick={descSuffixBrick.useBrick}
              data={dataSource}
            />
          )}
        </div>
      )}
    </div>
  );
}
