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
import { BuilderCanvasType, BuilderDataType } from "../interfaces";

import styles from "./BuilderCanvas.module.css";
import { BuilderCanvasTabs } from "./BuilderCanvasTabs";

export function BuilderCanvas(): React.ReactElement {
  const {
    dataType,
    processing,
    fullscreen,
    eventStreamNodeId,
    canvasType,
  } = useBuilderUIContext();
  const [droppingStatus, setDroppingStatus] = React.useState<DroppingStatus>(
    {}
  );
  const separateCanvas = React.useMemo(
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
        [styles.hasTabs]: separateCanvas,
      })}
    >
      {separateCanvas && <BuilderCanvasTabs />}
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
                separateCanvas={separateCanvas}
                isPortalCanvas={
                  separateCanvas && canvasType === BuilderCanvasType.PORTAL
                }
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
