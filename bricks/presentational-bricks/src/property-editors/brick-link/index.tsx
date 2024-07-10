import type _React from "react";
import { eoLinkSchema } from "./brickLink.schema";
import { omit } from "lodash";
import { getRuntime } from "@next-core/brick-kit";

function BrickLinkComponentFactory(React: typeof _React) {
  return function BrickLinkComponent(props: any): React.ReactElement {
    const {
      SchemaFieldComponent,
      formilySchemaFormatter,
      scope,
      form,
      effects,
    } = props;

    React.useEffect(() => {
      const { onSubmit, init } = effects;

      form.addEffects("submit", () => {
        onSubmit((value: any) => {
          return omit(value, ["link"]);
        });
      });
    }, [effects, form]);

    React.useEffect(() => {
      form.setInitialValues({
        hideExternalIcon: false,
      });
    }, [form]);

    return React.createElement(SchemaFieldComponent, {
      schema: formilySchemaFormatter(eoLinkSchema as any),
      scope,
    });
  };
}

getRuntime().customEditors.define(
  "presentational-bricks.brick-link",
  BrickLinkComponentFactory
);
