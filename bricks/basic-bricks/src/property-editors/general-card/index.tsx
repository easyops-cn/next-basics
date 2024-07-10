import type _React from "react";
import { getRuntime } from "@next-core/brick-kit";
import { generalCardSchema } from "./general-card.schema";

function GeneralCardComponentFactory(React: typeof _React) {
  return function GeneralCardComponent(props: any): React.ReactElement {
    const { SchemaFieldComponent, formilySchemaFormatter, form, scope } = props;

    React.useEffect(() => {
      form.setInitialValues({
        hasFooter: false,
      });
    }, [form]);

    return React.createElement(SchemaFieldComponent, {
      schema: formilySchemaFormatter(generalCardSchema as any),
      scope,
    });
  };
}

(getRuntime() as any).customEditors.define(
  "basic-bricks.general-card",
  GeneralCardComponentFactory
);
