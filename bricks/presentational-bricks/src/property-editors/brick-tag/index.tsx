import type _React from "react";
import { getRuntime } from "@next-core/brick-kit";
import { brickTagSchema } from "./brickTag.schema";

function BrickTagComponentFactory(React: typeof _React) {
  return function BrickTagComponent(props: any): React.ReactElement {
    const {
      SchemaFieldComponent,
      formilySchemaFormatter,
      advancedMode,
      scope,
      form,
    } = props;

    React.useEffect(() => {
      form.setInitialValues({
        componentType: "Tag",
        multipleCheck: true,
        closable: false,
      });
    }, [form]);

    return React.createElement(SchemaFieldComponent, {
      schema: formilySchemaFormatter(brickTagSchema as any, advancedMode!),
      scope,
    });
  };
}

(getRuntime() as any).customEditors.define(
  "presentational-bricks.brick-tag",
  BrickTagComponentFactory
);
