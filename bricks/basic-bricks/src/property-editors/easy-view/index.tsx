import type _React from "react";
import { getRuntime } from "@next-core/brick-kit";
import { easyViewSchema } from "./easyView.schema";

function EasyViewComponentFactory(React: typeof _React) {
  return function EasyViewComponent(props: any): React.ReactElement {
    const {
      SchemaFieldComponent,
      formilySchemaFormatter,
      advancedMode,
      scope,
      form,
    } = props;

    return React.createElement(SchemaFieldComponent, {
      schema: formilySchemaFormatter(easyViewSchema as any, advancedMode!),
      scope,
    });
  };
}

(getRuntime() as any).customEditors.define(
  "basic-bricks.easy-view",
  EasyViewComponentFactory
);
