import React, { CSSProperties } from "react";
import { Icon as LegacyIcon } from "@ant-design/compatible";
import { Result } from "antd";
import { ResultStatusType } from "antd/lib/result";
import { EmptyResult, EmptyResultStatus } from "@next-libs/basic-components";
import {
  getIllustration,
  translateIllustrationConfig,
  IllustrationProps,
} from "@next-core/illustrations";
import { useCurrentTheme, useFeatureFlags } from "@next-core/brick-kit";
import {
  BrickResultStatus,
  IllustrationsStatus,
} from "../interfaces/brick-result";

export interface IllustrationsConfig {
  imageStyle?: CSSProperties;
  name?: string;
  category?: string;
}

interface BrickResultProps {
  status: BrickResultStatus | EmptyResultStatus | IllustrationsStatus;
  title?: string;
  subTitle?: string;
  icon?: string;
  illustrationsConfig?: IllustrationsConfig;
  useNewIllustration?: boolean;
}

export function BrickResult(props: BrickResultProps): React.ReactElement {
  const {
    illustrationsConfig: { name, category, imageStyle },
    useNewIllustration,
  } = props;
  const icon = props.icon ? <LegacyIcon type={props.icon} /> : "";
  const emptyResultStatus = Object.values(EmptyResultStatus);
  const theme = useCurrentTheme();
  const [isFeatureFlag] = useFeatureFlags("support-new-illustrations");
  const image = React.useMemo(() => {
    let illustrationConfig: IllustrationProps = { name, category, theme };
    if (isFeatureFlag) {
      illustrationConfig = translateIllustrationConfig(
        useNewIllustration,
        illustrationConfig
      );
    }
    return getIllustration(illustrationConfig);
  }, [name, category, theme, useNewIllustration, isFeatureFlag]);

  return emptyResultStatus.includes(props.status as EmptyResultStatus) ? (
    <Result
      title={props.title}
      subTitle={props.subTitle}
      icon={<EmptyResult status={props.status as EmptyResultStatus} />}
    >
      <slot id="content" name="content"></slot>
    </Result>
  ) : props.status === "illustrations" ? (
    <Result
      title={props.title}
      subTitle={props.subTitle}
      status={props.status as ResultStatusType}
      icon={<img src={image} style={imageStyle} />}
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
