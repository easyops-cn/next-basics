import type _React from "react";
import { getRuntime } from "@next-core/brick-kit";
import { brickDividerSchema } from "./brickDivider.schema";

function BrickDividerComponentFactory(React: typeof _React) {
  return function BrickDividerComponent(props: any): React.ReactElement {
    const {
      SchemaFieldComponent,
      formilySchemaFormatter,
      advancedMode,
      scope,
      form,
    } = props;

    React.useEffect(() => {
      form.setInitialValues({
        type: "horizontal",
      });
    }, [form]);

    return React.createElement(SchemaFieldComponent, {
      schema: formilySchemaFormatter(brickDividerSchema as any, advancedMode!),
      scope,
    });
  };
}

(getRuntime() as any).customEditors.define(
  "presentational-bricks.brick-divider",
  BrickDividerComponentFactory
);
