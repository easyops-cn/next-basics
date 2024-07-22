import type _React from "react";
import { getRuntime } from "@next-core/brick-kit";
import { flexLayoutSchema } from "./flexLayout.schema";
import { get, omit } from "lodash";

const transformNormal2Advanced = (rawValue: any) => {
  const res = {
    ...omit(rawValue, ["flexWrap"]),
    ...(rawValue.flexWrap
      ? {
          flexWrap: "wrap",
        }
      : {
          flexWrap: "nowrap",
        }),
  };
  return res;
};

const transformAdvanced2Normal = (rawValue: any) => {
  const isNoWrap =
    !get(rawValue, "flexWrap") || get(rawValue, "flexWrap") === "nowrap";
  const res = {
    ...omit(rawValue, ["flexWrap"]),
    ...(isNoWrap
      ? {
          flexWrap: false,
        }
      : {
          flexWrap: true,
        }),
  };
  return res;
};

function FlexLayoutComponentFactory(React: typeof _React) {
  return function FlexLayoutComponent(props: any): React.ReactElement {
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

      // 表单初始化
      form.setInitialValues({
        flexWrap: false,
      });

      // 监听模式切换
      form.addEffects("onAdvancedChange", () => {
        onAdvancedChange((advancedMode: boolean, form: any) => {
          const rawValue = form.getState()?.values ?? {};
          return advancedMode
            ? transformNormal2Advanced(rawValue)
            : transformAdvanced2Normal(rawValue);
        });
      });

      // 监听表单提交
      form.addEffects("onSubmit", () => {
        onSubmit((value: any) => {
          return transformNormal2Advanced(value);
        });
      });
    }, [form, scope]);

    return React.createElement(SchemaFieldComponent, {
      schema: formilySchemaFormatter(flexLayoutSchema as any, advancedMode!),
      scope,
    });
  };
}

(getRuntime() as any).customEditors.define(
  "basic-bricks.flex-layout",
  FlexLayoutComponentFactory
);
