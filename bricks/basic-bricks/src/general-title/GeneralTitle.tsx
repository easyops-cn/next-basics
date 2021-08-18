import React from "react";
import styles from "./GeneralTitle.module.css";
import { BrickAsComponent } from "@next-core/brick-kit";
import { UseBrickConf } from "@next-core/brick-types";
interface GeneralTitleProps {
  mainTitle: string;
  description?: string;
  titleSuffixBrick?: { useBrick: UseBrickConf };
  descPrefixBrick?: { useBrick: UseBrickConf };
  dataSource?: Record<string, any>;
}
export function GeneralTitle(props: GeneralTitleProps): React.ReactElement {
  const {
    mainTitle,
    description,
    titleSuffixBrick,
    descPrefixBrick,
    dataSource,
  } = props;

  return (
    <div>
      {mainTitle && (
        <div className={styles.titleWrapper}>
          <div className={styles.titleContent}>{mainTitle}</div>
          {titleSuffixBrick?.useBrick && (
            <BrickAsComponent
              useBrick={titleSuffixBrick.useBrick}
              data={dataSource}
            />
          )}
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
          <div className={styles.descriptionContent}>{description}</div>
        </div>
      )}
    </div>
  );
}
