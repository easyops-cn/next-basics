import React from "react";
import { Spin } from "antd";
import classNames from "classnames";
import {
  DropZone,
  DroppingStatusContext,
  DroppingStatus,
} from "@next-core/editor-bricks-helper";
import { useBuilderUIContext } from "../BuilderUIContext";
import { EventStreamCanvas } from "../EventStreamCanvas/EventStreamCanvas";
import { BuilderDataType } from "../interfaces";

import styles from "./BuilderCanvas.module.css";

export function BuilderCanvas(): React.ReactElement {
  const {
    dataType,
    processing,
    fullscreen,
    eventStreamNodeId,
  } = useBuilderUIContext();
  const [droppingStatus, setDroppingStatus] = React.useState<DroppingStatus>(
    {}
  );

  if (!dataType) {
    return null;
  }

  if (dataType === BuilderDataType.UNKNOWN) {
    return <div>Unexpected dataSource</div>;
  }

  return (
    <div
      className={classNames(styles.builderCanvas, {
        [styles.fullscreen]: fullscreen,
      })}
    >
      {eventStreamNodeId ? (
        <EventStreamCanvas nodeId={eventStreamNodeId} />
      ) : (
        <Spin spinning={processing} delay={500}>
          <DroppingStatusContext.Provider
            value={{ droppingStatus, setDroppingStatus }}
          >
            <DropZone isRoot fullscreen={fullscreen} mountPoint="bricks" />
          </DroppingStatusContext.Provider>
        </Spin>
      )}
    </div>
  );
}
