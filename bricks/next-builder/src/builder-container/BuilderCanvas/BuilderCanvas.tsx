import React from "react";
import { Spin } from "antd";
import classNames from "classnames";
import {
  DropZone,
  DroppingStatusContext,
  DroppingStatus,
  useBuilderDataManager,
} from "@next-core/editor-bricks-helper";
import { BuilderRouteOrBrickNode } from "@next-core/brick-types";
import { useBuilderUIContext } from "../BuilderUIContext";
import { EventStreamCanvas } from "../EventStreamCanvas/EventStreamCanvas";

import styles from "./BuilderCanvas.module.css";

export interface BuilderCanvasProps {
  dataSource?: BuilderRouteOrBrickNode[];
}

export function BuilderCanvas({
  dataSource,
}: BuilderCanvasProps): React.ReactElement {
  const { processing, fullscreen, eventStreamNodeId } = useBuilderUIContext();
  const [droppingStatus, setDroppingStatus] = React.useState<DroppingStatus>(
    {}
  );
  const manager = useBuilderDataManager();
  const [initialized, setInitialized] = React.useState(false);
  const [valid, setValid] = React.useState(true);

  React.useEffect(() => {
    const validity =
      dataSource?.length === 1 &&
      ["bricks", "custom-template"].includes(dataSource[0].type);
    setValid(validity);
    if (validity) {
      manager.dataInit(dataSource[0]);
    }
    setInitialized(true);
  }, [dataSource, manager]);

  if (!valid) {
    // eslint-disable-next-line no-console
    console.error("Unexpected dataSource", dataSource);
    return <div>Unexpected dataSource</div>;
  }

  if (!initialized) {
    return null;
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
