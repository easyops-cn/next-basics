import type _React from "react";
import { getRuntime } from "@next-core/brick-kit";
import { brickAlertSchema } from "./brickAlert.schema";

function BrickAlertComponentFactory(React: typeof _React) {
  return function BrickAlertComponent(props: any): React.ReactElement {
    const {
      SchemaFieldComponent,
      formilySchemaFormatter,
      advancedMode,
      scope,
      form,
    } = props;

    React.useEffect(() => {
      form.setInitialValues({
        enableMessageSlot: false,
        enableDescSlot: false,
        showIcon: false,
        closable: false,
        foldDesc: false,
      });
    }, [form]);

    return React.createElement(SchemaFieldComponent, {
      schema: formilySchemaFormatter(brickAlertSchema as any, advancedMode!),
      scope,
    });
  };
}

(getRuntime() as any).customEditors.define(
  "presentational-bricks.brick-alert",
  BrickAlertComponentFactory
);
