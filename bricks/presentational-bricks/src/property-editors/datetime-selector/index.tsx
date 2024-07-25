import type _React from "react";
import { getRuntime } from "@next-core/brick-kit";
import { datetimeSelectorSchema } from "./datetimeSelector.schema";
import { get, omit } from "lodash";

const transformNormal2Advanced = (rawValue: any) => {
  const res = {
    ...omit(rawValue, ["isCustomType"]),
    ...(rawValue.isCustomType
      ? {
          type: "custom",
        }
      : {}),
  };
  return res;
};

const transformAdvanced2Normal = (rawValue: any) => {
  const type = get(rawValue, "type");
  const res = {
    ...omit(rawValue, ["type"]),
    ...(type === "custom"
      ? {
          isCustomType: true,
        }
      : {
          isCustomType: false,
        }),
  };
  return res;
};

function DatetimeSelectorComponentFactory(React: typeof _React) {
  return function DatetimeSelectorComponent(props: any): React.ReactElement {
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
        isCustomType: true,
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
        datetimeSelectorSchema as any,
        advancedMode!
      ),
      scope,
    });
  };
}

(getRuntime() as any).customEditors.define(
  "presentational-bricks.datetime-selector",
  DatetimeSelectorComponentFactory
);
