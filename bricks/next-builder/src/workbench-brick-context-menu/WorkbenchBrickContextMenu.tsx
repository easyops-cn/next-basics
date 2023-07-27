import React, { useMemo, useCallback } from "react";
import {
  useBuilderContextMenuStatus,
  useBuilderDataManager,
} from "@next-core/editor-bricks-helper";
import { useCanPaste } from "../builder-container/BuilderContextMenu/useCanPaste";
import {
  WorkbenchContextMenu,
  WorkbenchContextMenuProps,
} from "../workbench-context-menu/WorkbenchContextMenu";

export function WorkbenchBrickContextMenu({
  menu,
  clipboard,
  onActionClick,
}: WorkbenchContextMenuProps): React.ReactElement {
  const contextMenuStatus = useBuilderContextMenuStatus();
  const manager = useBuilderDataManager();

  const canPasteCallback = useCanPaste();
  const canPaste = useMemo(
    () => canPasteCallback(clipboard, contextMenuStatus.node),
    [canPasteCallback, clipboard, contextMenuStatus.node]
  );

  const handleCloseMenu = useCallback(
    (event: React.MouseEvent) => {
      event.preventDefault();
      manager.contextMenuChange({
        active: false,
      });
    },
    [manager]
  );

  return (
    <WorkbenchContextMenu
      contextMenuStatus={contextMenuStatus}
      clipboard={clipboard}
      menu={menu}
      onActionClick={onActionClick}
      canPaste={canPaste}
      handleCloseMenu={handleCloseMenu}
    />
  );
}
