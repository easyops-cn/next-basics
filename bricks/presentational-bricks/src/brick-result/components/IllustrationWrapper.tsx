import React, { CSSProperties } from "react";
import {
  getIllustration,
  translateIllustrationConfig,
  IllustrationProps,
} from "@next-core/illustrations";
import {
  useCurrentTheme,
  useFeatureFlags,
  getRuntime,
  useCurrentApp,
} from "@next-core/brick-kit";

export enum IconSize {
  Small = "small",
  Middle = "middle",
  Large = "large",
  XLarge = "xlarge",
  Unset = "unset",
}

export interface IllustrationWrapperProps {
  imageStyle?: CSSProperties;
  name?: string;
  category?: string;
  size?: IconSize;
  useNewIllustration?: boolean;
}

const iconSizeMap: { [key in IconSize]: { maxWidth?: string } } = {
  [IconSize.Small]: {
    maxWidth: "120px",
  },
  [IconSize.Middle]: {
    maxWidth: "250px",
  },
  [IconSize.Large]: {
    maxWidth: "500px",
  },
  [IconSize.XLarge]: {
    maxWidth: "1000px",
  },
  [IconSize.Unset]: {},
};

export function IllustrationWrapper(
  props: IllustrationWrapperProps
): React.ReactElement {
  const {
    name,
    category,
    size = "middle",
    imageStyle,
    useNewIllustration,
  } = props;

  const app = useCurrentApp();
  const theme = useCurrentTheme();
  const [isFeatureFlag] = useFeatureFlags("support-new-illustrations");
  const miscSettings = getRuntime().getMiscSettings();
  const isSupportedApp =
    ((miscSettings["supportedNewIllustrationApps"] || []) as any).includes(
      app.id
    ) || !!app.config?.supportNewIllustrations;

  const image = React.useMemo(() => {
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

  return (
    <img
      src={image}
      style={{
        objectFit: "contain",
        ...iconSizeMap[size as IconSize],
        ...imageStyle,
      }}
    />
  );
}
