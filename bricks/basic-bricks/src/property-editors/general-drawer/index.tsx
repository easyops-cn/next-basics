import type _React from "react";
import { getRuntime } from "@next-core/brick-kit";
import { generalDrawerSchema } from "./generalDrawer.schema";

function GeneralDrawerComponentFactory(React: typeof _React) {
  return function GeneralDrawerComponent(props: any): React.ReactElement {
    const {
      SchemaFieldComponent,
      formilySchemaFormatter,
      advancedMode,
      scope,
      form,
    } = props;

    React.useEffect(() => {
      form.setInitialValues({
        mask: true,
      });
    }, [form]);

    return React.createElement(SchemaFieldComponent, {
      schema: formilySchemaFormatter(generalDrawerSchema as any, advancedMode!),
      scope,
    });
  };
}

(getRuntime() as any).customEditors.define(
  "basic-bricks.general-drawer",
  GeneralDrawerComponentFactory
);
