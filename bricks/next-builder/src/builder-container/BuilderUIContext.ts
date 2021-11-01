import React from "react";
import {
  BuilderRouteNode,
  BuilderCustomTemplateNode,
  BuilderSnippetNode,
  Story,
} from "@next-core/brick-types";
import { BuilderRuntimeNode } from "@next-core/editor-bricks-helper";
import { HighlightTokenSettings } from "@next-libs/code-editor-components";
import { EventStreamNode } from "./EventStreamCanvas/interfaces";
import {
  BuilderClipboard,
  BuilderDataType,
  ToolboxTab,
  BrickOptionItem,
} from "./interfaces";

export interface ContextOfBuilderUI {
  appId?: string;
  dataType?: BuilderDataType;
  brickList?: BrickOptionItem[];
  providerList?: string[];
  storyList?: Story[];
  routeList?: BuilderRouteNode[];
  templateList?: BuilderCustomTemplateNode[];
  snippetList?: BuilderSnippetNode[];
  processing?: boolean;
  containerForContextModal?: string;
  migrateClipboard?: boolean;
  fullscreen?: boolean;
  setFullscreen?: React.Dispatch<React.SetStateAction<boolean>>;
  highlightNodes?: Set<number>;
  setHighlightNodes?: React.Dispatch<React.SetStateAction<Set<number>>>;
  toolboxTab?: ToolboxTab;
  setToolboxTab?: React.Dispatch<React.SetStateAction<ToolboxTab>>;
  eventStreamNodeId?: string;
  setEventStreamNodeId?: React.Dispatch<React.SetStateAction<string>>;
  clipboard?: BuilderClipboard;
  legacySetClipboard?: React.Dispatch<React.SetStateAction<BuilderClipboard>>;
  canvasIndex?: number;
  setCanvasIndex?: React.Dispatch<React.SetStateAction<number>>;
  storyboardQuery?: string;
  setStoryboardQuery?: React.Dispatch<React.SetStateAction<string>>;
  onRouteSelect?: (route: BuilderRouteNode) => void;
  onTemplateSelect?: (template: BuilderCustomTemplateNode) => void;
  onSnippetSelect?: (snippet: BuilderSnippetNode) => void;
  onCurrentRouteClick?: (route: BuilderRouteNode) => void;
  onCurrentTemplateClick?: (template: BuilderCustomTemplateNode) => void;
  onCurrentSnippetClick?: (snippet: BuilderSnippetNode) => void;
  onBuildAndPush?: () => void;
  onPreview?: () => void;
  onEventNodeClick?: (eventNode: EventStreamNode) => void;
  onConvertToTemplate?: (node: BuilderRuntimeNode) => void;
  onWorkbenchClose?: () => void;
  highlightTokens?: HighlightTokenSettings[];
  onClickHighlightToken?: (token: { type: string; value: string }) => void;
}

export const BuilderUIContext = React.createContext<ContextOfBuilderUI>({});

export function useBuilderUIContext(): ContextOfBuilderUI {
  return React.useContext(BuilderUIContext);
}
