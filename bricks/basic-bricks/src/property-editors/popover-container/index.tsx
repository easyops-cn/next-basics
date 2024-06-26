import type _React from "react";
import { getRuntime } from "@next-core/brick-kit";
import { popoverContainerSchema } from "./popoverContainer.schema";

function PopoverContainerComponentFactory(React: typeof _React) {
  return function PopoverContainerComponent(props: any): React.ReactElement {
    const {
      SchemaFieldComponent,
      formilySchemaFormatter,
      advancedMode,
      scope,
    } = props;

    return React.createElement(SchemaFieldComponent, {
      schema: formilySchemaFormatter(
        popoverContainerSchema as any,
        advancedMode!
      ),
      scope,
    });
  };
}

(getRuntime() as any).customEditors.define(
  "basic-bricks.popover-container",
  PopoverContainerComponentFactory
);
