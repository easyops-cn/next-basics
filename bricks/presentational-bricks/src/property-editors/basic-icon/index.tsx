import type _React from "react";
import { basicIconSchema } from "./basicIcon.schema";
import { getRuntime } from "@next-core/brick-kit";

function BrickIconComponentFactory(React: typeof _React) {
  return function BrickIconComponent(props: any): React.ReactElement {
    const { SchemaFieldComponent, formilySchemaFormatter, scope } = props;

    return React.createElement(SchemaFieldComponent, {
      schema: formilySchemaFormatter(basicIconSchema as any),
      scope,
    });
  };
}

getRuntime().customEditors.define(
  "presentational-bricks.basic-icon",
  BrickIconComponentFactory
);
