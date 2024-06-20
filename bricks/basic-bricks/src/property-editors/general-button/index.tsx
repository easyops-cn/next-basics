import React, { createElement } from "react";
import { getRuntime } from "@next-core/brick-kit";
import { generalButtonSchema } from "./general-button.schema";

function GeneralButtonComponent(props: any): React.ReactElement {
  const { SchemaFieldComponent, formilySchemaFormatter, advancedMode, scope } =
    props;

  return createElement(SchemaFieldComponent, {
    schema: formilySchemaFormatter(generalButtonSchema as any, advancedMode!),
    scope,
  });
}

(getRuntime() as any).customEditors.define(
  "basic-bricks.general-button-editor",
  GeneralButtonComponent
);
