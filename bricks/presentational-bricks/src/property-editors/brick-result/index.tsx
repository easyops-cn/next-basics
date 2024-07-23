import type _React from "react";
import { getRuntime } from "@next-core/brick-kit";
import {
  brickResultSchema,
  IllustrationsStatusOptions,
  BrickResultStatusOptions,
  EmptyResultStatusOptions,
} from "./brickResult.schema";

function BrickResultComponentFactory(React: typeof _React) {
  return function BrickResultComponent(props: any): React.ReactElement {
    const {
      SchemaFieldComponent,
      formilySchemaFormatter,
      advancedMode,
      scope,
      form,
    } = props;

    React.useEffect(() => {
      form.setInitialValues({
        useNewIllustration: true,
        status: undefined,
        emptyResultSize: "middle",
      });
    }, [form]);

    return React.createElement(SchemaFieldComponent, {
      schema: formilySchemaFormatter(brickResultSchema as any, advancedMode!),
      scope: {
        ...scope,
        IllustrationsStatusOptions,
        BrickResultStatusOptions,
        EmptyResultStatusOptions,
      },
    });
  };
}

(getRuntime() as any).customEditors.define(
  "presentational-bricks.brick-result",
  BrickResultComponentFactory
);
