import type _React from "react";
import { getRuntime } from "@next-core/brick-kit";
import { generalModalSchema } from "./generalModal.schema";

function GeneralModalComponentFactory(React: typeof _React) {
  return function GeneralModalComponent(props: any): React.ReactElement {
    const {
      SchemaFieldComponent,
      formilySchemaFormatter,
      advancedMode,
      scope,
      form,
    } = props;

    React.useEffect(() => {
      const { dataList = [] } = scope;

      // 初始化data
      form.query("dataSource").take((field: any) => {
        field.setComponentProps({
          options: dataList?.map((item: any) => ({
            label: item?.name,
            value: item?.value,
          })),
        });
      });
    }, [form]);

    return React.createElement(SchemaFieldComponent, {
      schema: formilySchemaFormatter(generalModalSchema as any, advancedMode!),
      scope,
    });
  };
}

(getRuntime() as any).customEditors.define(
  "basic-bricks.general-modal",
  GeneralModalComponentFactory
);
