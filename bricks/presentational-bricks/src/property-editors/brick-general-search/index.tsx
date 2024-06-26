import type _React from "react";
import { getRuntime } from "@next-core/brick-kit";
import { brickGeneralSearchSchema } from "./brickGeneralSearch.schema";

function BrickGeneralSearchComponentFactory(React: typeof _React) {
  return function BrickGeneralSearchComponent(props: any): React.ReactElement {
    const {
      SchemaFieldComponent,
      formilySchemaFormatter,
      advancedMode,
      scope,
      form,
    } = props;

    React.useEffect(() => {
      form.setInitialValues({ searchTypeEnabled: false });
    }, [form]);

    return React.createElement(SchemaFieldComponent, {
      schema: formilySchemaFormatter(
        brickGeneralSearchSchema as any,
        advancedMode!
      ),
      scope,
    });
  };
}

(getRuntime() as any).customEditors.define(
  "presentational-bricks.brick-general-search",
  BrickGeneralSearchComponentFactory
);
