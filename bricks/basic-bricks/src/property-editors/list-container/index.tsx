import type _React from "react";
import { getRuntime } from "@next-core/brick-kit";
import { listContainerSchema } from "./listContainer.schema";
import { get, omit } from "lodash";

const transformNormal2Advanced = (rawValue: any) => {
  const res = {
    ...omit(rawValue, ["isGridLayout"]),
  };
  return res;
};

const transformAdvanced2Normal = (rawValue: any) => {
  const isCustomContainerStyle = get(rawValue, "containerStyle");
  const res = {
    ...(isCustomContainerStyle
      ? {
          isGridLayout: false,
        }
      : {
          isGridLayout: true,
        }),
  };
  return res;
};

function ListContainerComponentFactory(React: typeof _React) {
  return function ListContainerComponent(props: any): React.ReactElement {
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
        isGridLayout: true,
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
      schema: formilySchemaFormatter(listContainerSchema as any, advancedMode!),
      scope,
    });
  };
}

(getRuntime() as any).customEditors.define(
  "basic-bricks.list-container",
  ListContainerComponentFactory
);
