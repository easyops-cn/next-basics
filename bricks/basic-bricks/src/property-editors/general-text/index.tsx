import type _React from "react";
import { getRuntime } from "@next-core/brick-kit";
import { generalTextSchema } from "./generalText.schema";

function GeneralTextComponentFactory(React: typeof _React) {
  return function GeneralTextComponent(props: any): React.ReactElement {
    const {
      SchemaFieldComponent,
      formilySchemaFormatter,
      advancedMode,
      scope,
    } = props;

    return React.createElement(SchemaFieldComponent, {
      schema: formilySchemaFormatter(generalTextSchema as any, advancedMode!),
      scope,
    });
  };
}

(getRuntime() as any).customEditors.define(
  "basic-bricks.general-text",
  GeneralTextComponentFactory
);
