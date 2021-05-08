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
import { BuilderCanvasTabs } from "./BuilderCanvasTabs";

import styles from "./BuilderCanvas.module.css";

export function BuilderCanvas(): React.ReactElement {
  const {
    dataType,
    processing,
    fullscreen,
    eventStreamNodeId,
    canvasIndex,
  } = useBuilderUIContext();
  const [droppingStatus, setDroppingStatus] = React.useState<DroppingStatus>(
    {}
  );
  const independentPortalCanvas = React.useMemo(
    () => dataType !== BuilderDataType.ROUTE_OF_ROUTES && !eventStreamNodeId,
    [dataType, eventStreamNodeId]
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
        [styles.hasTabs]: independentPortalCanvas,
      })}
    >
      {independentPortalCanvas && <BuilderCanvasTabs />}
      <div className={styles.builderCanvasInner}>
        {eventStreamNodeId ? (
          <EventStreamCanvas nodeId={eventStreamNodeId} />
        ) : (
          <Spin spinning={processing} delay={500}>
            <DroppingStatusContext.Provider
              value={{ droppingStatus, setDroppingStatus }}
            >
              <DropZone
                isRoot
                independentPortalCanvas={independentPortalCanvas}
                canvasIndex={canvasIndex}
                fullscreen={fullscreen}
                mountPoint={
                  dataType === BuilderDataType.ROUTE_OF_ROUTES
                    ? "routes"
                    : "bricks"
                }
              />
            </DroppingStatusContext.Provider>
          </Spin>
        )}
      </div>
    </div>
  );
}
