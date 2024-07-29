import type _React from "react";
import { getRuntime } from "@next-core/brick-kit";
import { generalTooltipSchema } from "./generalTooltip.schema";
import { get, omit } from "lodash";

const transformNormal2Advanced = (rawValue: any) => {
  const res = omit(rawValue, ["isCustomDisplayBrick"]);
  return res;
};

const transformAdvanced2Normal = (rawValue: any) => {
  const displayBrick = get(rawValue, "displayBrick");
  const res = {
    ...rawValue,
    ...(displayBrick
      ? {
          isCustomDisplayBrick: true,
        }
      : {
          isCustomDisplayBrick: false,
        }),
  };
  return res;
};

function GeneralTooltipComponentFactory(React: typeof _React) {
  return function GeneralTooltipComponent(props: any): React.ReactElement {
    const {
      SchemaFieldComponent,
      formilySchemaFormatter,
      advancedMode,
      scope,
      form,
      effects,
    } = props;

    React.useEffect(() => {
      const { onAdvancedChange, onSubmit } = effects;

      form.setInitialValues({
        type: "tooltip",
        isCustomDisplayBrick: false,
      });

      // 监听模式切换
      form.addEffects("onAdvancedChange", () => {
        onAdvancedChange((advancedMode: boolean, _form: any, values: any) => {
          return advancedMode
            ? transformNormal2Advanced(values)
            : transformAdvanced2Normal(values);
        });
      });

      // 监听表单提交
      form.addEffects("onSubmit", () => {
        onSubmit((value: any) => {
          return transformNormal2Advanced(value);
        });
      });
    }, [form]);

    return React.createElement(SchemaFieldComponent, {
      schema: formilySchemaFormatter(
        generalTooltipSchema as any,
        advancedMode!
      ),
      scope,
    });
  };
}

(getRuntime() as any).customEditors.define(
  "presentational-bricks.general-tooltip",
  GeneralTooltipComponentFactory
);
