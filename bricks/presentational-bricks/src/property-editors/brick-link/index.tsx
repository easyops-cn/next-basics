import type _React from "react";
import { eoLinkSchema } from "./brickLink.schema";
import { omit } from "lodash";
import { getRuntime } from "@next-core/brick-kit";
import { hasOwnProperty } from "@next-core/brick-utils";

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
      const { onSubmit, onFormValuesChange, init } = effects;

      form.addEffects("submit", () => {
        onSubmit((value: any) => {
          return omit(value, ["link"]);
        });
      });
      form.addEffects("onFormValuesChange", () => {
        onFormValuesChange((form: any) => {
          // 切换外链时（用href而不是url），显示 hideExternalIcon
          form.setFieldState("hideExternalIcon", (state: any) => {
            state.display = hasOwnProperty(form.values, "href")
              ? "visible"
              : "none";
          });
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
