// istanbul ignore file
// For temporary usage only, will change soon.
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
} from "react";
import type {
  BuilderCustomTemplateNode,
  BuilderRouteOrBrickNode,
} from "@next-core/brick-types";
import {
  type BuilderDataManager,
  useBuilderDataManager,
  type BuilderRuntimeNode,
  type EventDetailOfNodeReorder,
  type EventDetailOfWorkbenchTreeNodeMove,
  type EventDetailOfNodeAdd,
  type EventDetailOfSnippetApply,
} from "@next-core/editor-bricks-helper";
import { useListenOnPreviewMessage } from "./useListenOnPreviewMessage";
import { sendHighlightBrick, useHighlightBrick } from "./useHighlightBrick";

export interface WorkbenchStoreProps {
  dataSource?: BuilderRouteOrBrickNode[];
  templateSources?: BuilderCustomTemplateNode[];
  onNodeClick?(event: CustomEvent<BuilderRuntimeNode>): void;
  onNodeReorder?(event: CustomEvent<EventDetailOfNodeReorder>): void;
  onWorkbenchTreeNodeMove?(
    event: CustomEvent<EventDetailOfWorkbenchTreeNodeMove>
  ): void;
  onNodeAdd?: (event: CustomEvent<EventDetailOfNodeAdd>) => void;
  onSnippetApply?: (event: CustomEvent<EventDetailOfSnippetApply>) => void;
}

export interface WorkbenchStoreRef {
  manager: BuilderDataManager;
  previewStart(): void;
}

export function LegacyWorkbenchStore(
  {
    dataSource,
    templateSources,
    onNodeClick,
    onNodeReorder,
    onWorkbenchTreeNodeMove,
    onNodeAdd,
    onSnippetApply,
  }: WorkbenchStoreProps,
  ref: React.Ref<WorkbenchStoreRef>
): React.ReactElement {
  const manager = useBuilderDataManager();
  const previewStart = useCallback(() => {
    sendHighlightBrick("active", manager.getActiveNodeUid(), manager);
  }, [manager]);

  useImperativeHandle(ref, () => ({ manager, previewStart }));

  useEffect(() => {
    if (
      dataSource?.length === 1 &&
      ["bricks", "routes", "redirect", "custom-template", "snippet"].includes(
        dataSource[0].type
      )
    ) {
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
      manager.onWorkbenchTreeNodeMove(onWorkbenchTreeNodeMove),
      manager.onNodeAdd(onNodeAdd),
      manager.onSnippetApply(onSnippetApply),
    ];
    return () => {
      for (const fn of removeListeners) {
        fn();
      }
    };
  }, [
    manager,
    onNodeAdd,
    onNodeClick,
    onNodeReorder,
    onSnippetApply,
    onWorkbenchTreeNodeMove,
  ]);

  useHighlightBrick("hover", manager);
  useHighlightBrick("active", manager);
  useListenOnPreviewMessage(manager);

  return null;
}

export const WorkbenchStore = forwardRef(LegacyWorkbenchStore);
