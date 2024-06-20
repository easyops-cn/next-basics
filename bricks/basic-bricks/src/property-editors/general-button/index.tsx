import type _React from "react";
import { getRuntime } from "@next-core/brick-kit";
import { generalButtonSchema } from "./general-button.schema";

function GeneralButtonComponentFactory(React: typeof _React) {
  return function GeneralButtonComponent(props: any): React.ReactElement {
    const {
      SchemaFieldComponent,
      formilySchemaFormatter,
      advancedMode,
      scope,
    } = props;

    return React.createElement(SchemaFieldComponent, {
      schema: formilySchemaFormatter(generalButtonSchema as any, advancedMode!),
      scope,
    });
  };
}

(getRuntime() as any).customEditors.define(
  "basic-bricks.general-button",
  GeneralButtonComponentFactory
);
