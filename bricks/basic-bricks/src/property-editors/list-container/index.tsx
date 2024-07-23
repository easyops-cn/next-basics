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
    ...rawValue,
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
    const isInitRef = React.useRef<boolean>(false);
    const dataListRef = React.useRef<any>();

    React.useEffect(() => {
      const {
        onAdvancedChange,
        onSubmit,
        onFormInitialValuesChange,
        onFieldValueChange,
      } = effects;

      // 表单初始化
      form.setInitialValues({
        isGridLayout: true,
      });

      // 当data变化时
      form.addEffects("dataChange", () => {
        onFormInitialValuesChange(() => {
          isInitRef.current = true;

          setTimeout(() => {
            isInitRef.current = false;
          });
        }),
          onFieldValueChange("data", () => {
            if (!isInitRef.current) {
              // 清除关联值
              form.deleteValuesIn("itemKey");
            }
          });
      });

      // 监听模式切换
      form.addEffects("onAdvancedChange", () => {
        onAdvancedChange((advancedMode: boolean, _: any, values: any) => {
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
    }, [form, scope]);

    React.useEffect(() => {
      // 初始化data
      const { dataList = [] } = scope;
      dataListRef.current = dataList?.map((item: any) => ({
        ...item,
        label: item?.name,
        value: item?.value,
      }));
      form.query("data").take((field: any) => {
        field.setComponentProps({
          options: dataListRef.current,
        });
      });
    }, [scope]);

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
