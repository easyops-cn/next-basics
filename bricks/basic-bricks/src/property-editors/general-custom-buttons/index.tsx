import type _React from "react";
import { getRuntime } from "@next-core/brick-kit";
import { generalCustomButtonsSchema } from "./general-custom-buttons.schema";

function GeneralCustomButtonsComponentFactory(React: typeof _React) {
  return function GeneralCustomButtonsComponent(
    props: any
  ): React.ReactElement {
    const { SchemaFieldComponent, formilySchemaFormatter, scope } = props;

    return React.createElement(SchemaFieldComponent, {
      schema: formilySchemaFormatter(generalCustomButtonsSchema as any),
      scope,
    });
  };
}

getRuntime().customEditors.define(
  "basic-bricks.general-custom-buttons",
  GeneralCustomButtonsComponentFactory
);
