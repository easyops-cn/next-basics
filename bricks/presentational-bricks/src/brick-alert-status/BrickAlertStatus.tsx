import React from "react";
import { useTranslation } from "react-i18next";
import {
  BrickValueMapping,
  MappingValue
} from "../brick-value-mapping/BrickValueMapping";
import { NS_PRESENTATIONAL_BRICKS, K } from "../i18n/constants";

interface BrickAlertStatusProps {
  status: number;
  recoverType: string;
  isRecover: boolean;
}

export function BrickAlertStatus(
  props: BrickAlertStatusProps
): React.ReactElement {
  const { t } = useTranslation(NS_PRESENTATIONAL_BRICKS);
  const value = props.isRecover
    ? props.recoverType === "manual"
      ? "manualRecover"
      : 2
    : props.status;
  const mapping: { [key: string]: MappingValue } = {
    0: {
      text: t(K.ALERT_MSG_SENDED)
    },
    1: {
      text: t(K.ALERT_CONVERGED)
    },
    2: {
      text: t(K.ALERT_RECOVERED)
    },
    3: {
      text: t(K.ALERT_SHIELDED)
    },
    manualRecover: {
      text: t(K.ALERT_MANUAL_RECOVERED)
    }
  };

  return <BrickValueMapping value={value} mapping={mapping} />;
}
