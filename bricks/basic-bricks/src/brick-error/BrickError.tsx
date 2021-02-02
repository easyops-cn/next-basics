import React from "react";
import { useTranslation } from "react-i18next";
import { NS_BASIC_BRICKS, K } from "../i18n/constants";

export interface BrickErrorProps {
  errorType: string;
  errorMessage: string;
  brickName: string;
  isLegacyTemplate?: boolean;
}

export function BrickError({
  errorType,
  errorMessage,
  brickName,
  isLegacyTemplate,
}: BrickErrorProps): React.ReactElement {
  const { t } = useTranslation(NS_BASIC_BRICKS);

  return (
    <div>
      <p style={{ fontSize: "125%", marginBottom: "10px" }}>
        {t(isLegacyTemplate ? K.LEGACY_TEMPLATE_ERROR : K.BRICK_ERROR)}
      </p>
      <p>{`<${brickName}> ${errorType}: ${errorMessage}`}</p>
    </div>
  );
}
