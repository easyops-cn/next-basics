import type _React from "react";
import { getRuntime } from "@next-core/brick-kit";
import { brickDescriptionsSchema } from "./brickDescriptions.schema";
import { get, omit } from "lodash";

const transformNormal2Advanced = (rawValue: any) => {
  const res = omit(rawValue, ["isMultiDesc"]);
  return res;
};

const transformAdvanced2Normal = (rawValue: any) => {
  const descriptionList = get(rawValue, "descriptionList");
  const res = {
    ...rawValue,
    ...(descriptionList
      ? {
          isMultiDesc: true,
        }
      : {
          isMultiDesc: false,
        }),
  };
  return res;
};

function BrickDescriptionsComponentFactory(React: typeof _React) {
  return function BrickDescriptionsComponent(props: any): React.ReactElement {
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
        bordered: false,
        isMultiDesc: false,
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
        brickDescriptionsSchema as any,
        advancedMode!
      ),
      scope,
    });
  };
}

(getRuntime() as any).customEditors.define(
  "presentational-bricks.brick-descriptions",
  BrickDescriptionsComponentFactory
);
