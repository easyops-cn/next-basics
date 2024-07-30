import type _React from "react";
import { getRuntime } from "@next-core/brick-kit";
import { generalLabelSchema } from "./generalLabel.schema";

function GeneralLabelComponentFactory(React: typeof _React) {
  return function GeneralLabelComponent(props: any): React.ReactElement {
    const {
      SchemaFieldComponent,
      formilySchemaFormatter,
      advancedMode,
      scope,
      form,
    } = props;
    const dataListRef = React.useRef<any>();

    React.useEffect(() => {
      // 初始化data
      const { dataList = [] } = scope;
      dataListRef.current = dataList?.map((item: any) => ({
        ...item,
        label: item?.name,
        value: item?.value,
      }));
      form.query("dataSource").take((field: any) => {
        field.setComponentProps({
          options: dataListRef.current,
        });
      });
    }, [scope]);

    return React.createElement(SchemaFieldComponent, {
      schema: formilySchemaFormatter(generalLabelSchema as any, advancedMode!),
      scope,
    });
  };
}

(getRuntime() as any).customEditors.define(
  "presentational-bricks.general-label",
  GeneralLabelComponentFactory
);
