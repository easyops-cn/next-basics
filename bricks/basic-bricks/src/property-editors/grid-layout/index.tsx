import type _React from "react";
import { getRuntime } from "@next-core/brick-kit";
import { gridLayoutSchema } from "./gridLayout.schema";

function GridLayoutComponentFactory(React: typeof _React) {
  return function GridLayoutComponent(props: any): React.ReactElement {
    const {
      SchemaFieldComponent,
      formilySchemaFormatter,
      advancedMode,
      scope,
      form,
    } = props;

    React.useEffect(() => {
      form.setInitialValues({
        showGridBorder: false,
      });
    }, [form]);

    return React.createElement(SchemaFieldComponent, {
      schema: formilySchemaFormatter(gridLayoutSchema as any, advancedMode!),
      scope,
    });
  };
}

(getRuntime() as any).customEditors.define(
  "basic-bricks.grid-layout",
  GridLayoutComponentFactory
);
