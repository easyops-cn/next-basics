import React from "react";
import { PlayCircleOutlined } from "@ant-design/icons";
import { Button } from "antd";

import { useTranslation } from "react-i18next";
import { NS_PRESENTATIONAL_BRICKS, K } from "../i18n/constants";

interface BrickCollectionInstanceExecutionProps {
  ids: string[];
  onClick: () => void;
}

export function BrickCollectionInstanceExecution(
  props: BrickCollectionInstanceExecutionProps
): React.ReactElement {
  const { t } = useTranslation(NS_PRESENTATIONAL_BRICKS);
  const buttonText = t(K.COLLECTION_INSTANCE_EXECUTE);

  return (
    <Button disabled={props.ids.length === 0} onClick={props.onClick}>
      <PlayCircleOutlined /> {buttonText}
    </Button>
  );
}
