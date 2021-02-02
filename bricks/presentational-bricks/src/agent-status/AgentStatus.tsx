import React from "react";
import { useTranslation } from "react-i18next";
import { NS_PRESENTATIONAL_BRICKS, K } from "../i18n/constants";
import { AgentStatusType } from "./index";

import {
  BrickValueMapping,
  MappingValue,
  Color,
} from "../brick-value-mapping/BrickValueMapping";

interface AgentStatusProps {
  value: AgentStatusType;
}

export function AgentStatus(props: AgentStatusProps): React.ReactElement {
  const { t } = useTranslation(NS_PRESENTATIONAL_BRICKS);
  const mapping: { [key: string]: MappingValue } = {
    [AgentStatusType.NORMAL]: {
      text: t(K.AGENT_STATUS_NORMAL),
      color: Color.green,
    },
    [AgentStatusType.ABNORMAL]: {
      text: t(K.AGENT_STATUS_ABNORMAL),
      color: Color.red,
    },
    [AgentStatusType.NOT_INSTALLED]: {
      text: t(K.AGENT_STATUS_NOT_INSTALLED),
      color: Color.gray,
    },
    [AgentStatusType.UNINSTALLED]: {
      text: t(K.AGENT_STATUS_UNINSTALLED),
      color: Color.gray,
    },
    [AgentStatusType.UNDER_MAINTENANCE]: {
      text: t(K.AGENT_STATUS_UNDER_MAINTENANCE),
      color: Color.orange,
    },
  };

  return (
    <BrickValueMapping
      value={props.value}
      mapping={mapping}
      showTagCircle={true}
    />
  );
}
