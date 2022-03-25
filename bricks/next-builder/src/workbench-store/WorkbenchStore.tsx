// istanbul ignore file
// For temporary usage only, will change soon.
import React, { forwardRef, useEffect, useImperativeHandle } from "react";
import type {
  BuilderCustomTemplateNode,
  BuilderRouteOrBrickNode,
} from "@next-core/brick-types";
import {
  type BuilderDataManager,
  useBuilderDataManager,
  type BuilderRuntimeNode,
  type EventDetailOfNodeReorder,
} from "@next-core/editor-bricks-helper";
import { BuilderDataType } from "../builder-container/interfaces";
import { useHoverOnBrick } from "./useHoverOnBrick";
import { useListenOnPreviewMessage } from "./useListenOnPreviewMessage";

export interface WorkbenchStoreProps {
  dataSource?: BuilderRouteOrBrickNode[];
  templateSources?: BuilderCustomTemplateNode[];
  onNodeClick?(event: CustomEvent<BuilderRuntimeNode>): void;
  onNodeReorder?(event: CustomEvent<EventDetailOfNodeReorder>): void;
}

export function LegacyWorkbenchStore(
  {
    dataSource,
    templateSources,
    onNodeClick,
    onNodeReorder,
  }: WorkbenchStoreProps,
  ref: React.Ref<BuilderDataManager>
): React.ReactElement {
  const manager = useBuilderDataManager();

  useImperativeHandle(ref, () => manager);

  useEffect(() => {
    let type = BuilderDataType.UNKNOWN;
    let rootNode: BuilderRouteOrBrickNode;
    if (dataSource?.length === 1) {
      rootNode = dataSource[0];
      switch (rootNode.type) {
        case "bricks":
          type = BuilderDataType.ROUTE_OF_BRICKS;
          break;
        case "routes":
          type = BuilderDataType.ROUTE_OF_ROUTES;
          break;
        case "redirect":
          type = BuilderDataType.ROUTE_OF_REDIRECT;
          break;
        case "custom-template":
          type = BuilderDataType.CUSTOM_TEMPLATE;
          break;
        case "snippet":
          type = BuilderDataType.SNIPPET;
          break;
        // Rest types are currently not supported,
        // such as `"brick"`.
      }
    }
    if (type !== BuilderDataType.UNKNOWN) {
      manager.dataInit(
        dataSource[0],
        templateSources
          ? new Map(templateSources.map((tpl) => [tpl.templateId, tpl]))
          : undefined
      );
    } else {
      // eslint-disable-next-line no-console
      console.error("Unexpected dataSource", dataSource);
    }
  }, [dataSource, manager, templateSources]);

  useEffect(() => {
    const removeListeners = [
      manager.onNodeClick(onNodeClick),
      manager.onNodeReorder(onNodeReorder),
    ];
    return () => {
      for (const fn of removeListeners) {
        fn();
      }
    };
  }, [manager, onNodeClick, onNodeReorder]);

  useHoverOnBrick(manager);

  useListenOnPreviewMessage(manager);

  return null;
}

export const WorkbenchStore = forwardRef(LegacyWorkbenchStore);
