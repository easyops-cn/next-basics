import type _React from "react";
import { getRuntime } from "@next-core/brick-kit";
import { cardItemSchema } from "./cardItem.schema";
import { get, omit } from "lodash";

const transformNormal2Advanced = (rawValue: any) => {
  const res = {
    ...omit(rawValue, ["useOldDesc"]),
  };
  return res;
};

const transformAdvanced2Normal = (rawValue: any) => {
  const useOldDesc = !!get(rawValue, "descriptionList");
  const res = {
    ...rawValue,
    useOldDesc,
  };
  return res;
};

function CardItemComponentFactory(React: typeof _React) {
  return function CardItemComponent(props: any): React.ReactElement {
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
      const { dataList = [] } = scope;
      // 表单初始化

      form.setInitialValues({
        cardLayoutType: "icon-as-background",
        useOldDesc: false,
        showImg: false,
      });

      // 初始化data
      form.query("dataSource").take((field: any) => {
        field.setComponentProps({
          options: dataList?.map((item: any) => ({
            label: item?.name,
            value: item?.value,
          })),
        });
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
    }, [form]);

    return React.createElement(SchemaFieldComponent, {
      schema: formilySchemaFormatter(cardItemSchema as any, advancedMode!),
      scope,
    });
  };
}

(getRuntime() as any).customEditors.define(
  "presentational-bricks.card-item",
  CardItemComponentFactory
);
