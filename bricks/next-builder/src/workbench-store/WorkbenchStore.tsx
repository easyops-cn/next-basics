// istanbul ignore file
// For temporary usage only, will change soon.
import React, { useEffect } from "react";
import type {
  BuilderCustomTemplateNode,
  BuilderRouteOrBrickNode,
} from "@next-core/brick-types";
import { useBuilderDataManager } from "@next-core/editor-bricks-helper";
import { BuilderDataType } from "../builder-container/interfaces";

export interface WorkbenchStoreProps {
  dataSource?: BuilderRouteOrBrickNode[];
  templateSources?: BuilderCustomTemplateNode[];
}

export function WorkbenchStore({
  dataSource,
  templateSources,
}: WorkbenchStoreProps): React.ReactElement {
  const [dataType, setDataType] = React.useState<BuilderDataType>();
  const manager = useBuilderDataManager();

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
    setDataType(type);
  }, [dataSource, manager, templateSources]);

  return null;
}
