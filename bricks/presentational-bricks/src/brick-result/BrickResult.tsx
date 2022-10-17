import React, { CSSProperties } from "react";
import { Icon as LegacyIcon } from "@ant-design/compatible";
import { Result } from "antd";
import { ResultStatusType } from "antd/lib/result";
import { EmptyResultStatus } from "@next-libs/basic-components/EmptyResultStatus";
import {
  BrickResultStatus,
  IllustrationsStatus,
} from "../interfaces/brick-result";
import {
  IconSize,
  IllustrationWrapper,
} from "./components/IllustrationWrapper";
export interface IllustrationsConfig {
  imageStyle?: CSSProperties;
  name?: string;
  category?: string;
  size?: IconSize;
}

interface BrickResultProps {
  status: BrickResultStatus | EmptyResultStatus | IllustrationsStatus;
  title?: string;
  subTitle?: string;
  icon?: string;
  illustrationsConfig?: IllustrationsConfig;
  useNewIllustration?: boolean;
  emptyResultSize?: IconSize;
}

const emptyResultStatusMap: {
  [key in EmptyResultStatus]: { name: string; category: string };
} = {
  [EmptyResultStatus.BrowserTooOld]: {
    name: "browser-version-low",
    category: "easyops2",
  },
  [EmptyResultStatus.NoData]: { name: "no-content", category: "easyops2" },
  [EmptyResultStatus.Empty]: { name: "create-content", category: "easyops2" },
  [EmptyResultStatus.NoHistoryVersion]: {
    name: "no-history",
    category: "easyops2",
  },
  [EmptyResultStatus.NoVisitRecord]: {
    name: "search-no-content-dynamic",
    category: "easyops2",
  },
  [EmptyResultStatus.SearchEmpty]: {
    name: "search-empty",
    category: "easyops2",
  },
  [EmptyResultStatus.WelcomeToCreate]: {
    name: "add-app",
    category: "easyops2",
  },
};

export function BrickResult(props: BrickResultProps): React.ReactElement {
  const emptyResultStatus = Object.values(EmptyResultStatus);
  const icon = props.icon ? <LegacyIcon type={props.icon} /> : "";

  return emptyResultStatus.includes(props.status as EmptyResultStatus) ? (
    <Result
      title={props.title}
      subTitle={props.subTitle}
      icon={
        <IllustrationWrapper
          useNewIllustration={props.useNewIllustration}
          size={props.emptyResultSize || IconSize.Middle}
          {...emptyResultStatusMap[props.status as EmptyResultStatus]}
        />
      }
    >
      <slot id="content" name="content"></slot>
    </Result>
  ) : props.status === "illustrations" ? (
    <Result
      title={props.title}
      subTitle={props.subTitle}
      status={props.status as ResultStatusType}
      icon={
        <IllustrationWrapper
          useNewIllustration={props.useNewIllustration}
          {...(props.illustrationsConfig || {})}
        />
      }
    >
      <slot id="content" name="content"></slot>
    </Result>
  ) : (
    <Result
      title={props.title}
      subTitle={props.subTitle}
      status={props.status as ResultStatusType}
      {...(icon ? { icon } : {})}
    >
      <slot id="content" name="content"></slot>
    </Result>
  );
}
