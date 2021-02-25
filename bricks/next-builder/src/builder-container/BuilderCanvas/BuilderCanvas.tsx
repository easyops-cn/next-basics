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

import styles from "./BuilderCanvas.module.css";
import { EventStreamCanvas } from "../EventStreamCanvas/EventStreamCanvas";

export interface BuilderCanvasProps {
  dataSource?: BuilderRouteOrBrickNode[];
}

export function BuilderCanvas({
  dataSource,
}: BuilderCanvasProps): React.ReactElement {
  const {
    processing,
    fullscreen,
    eventStreamActiveNodeUid,
  } = useBuilderUIContext();
  const [droppingStatus, setDroppingStatus] = React.useState<DroppingStatus>(
    {}
  );
  const manager = useBuilderDataManager();
  const valid =
    dataSource?.length === 1 &&
    ["bricks", "custom-template"].includes(dataSource[0].type);

  React.useEffect(() => {
    if (valid) {
      manager.dataInit(dataSource[0]);
    }
  }, [dataSource, manager, valid]);

  if (!valid) {
    // eslint-disable-next-line no-console
    console.error("Unexpected dataSource", dataSource);
    return <div>Unexpected dataSource</div>;
  }

  return (
    <div
      className={classNames(styles.builderCanvas, {
        [styles.fullscreen]: fullscreen,
      })}
    >
      {eventStreamActiveNodeUid ? (
        <EventStreamCanvas nodeUid={eventStreamActiveNodeUid} />
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
