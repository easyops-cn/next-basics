import type _React from "react";
import { getRuntime } from "@next-core/brick-kit";
import { brickValueMappingSchema } from "./brickValueMapping.schema";

function BrickValueMappingComponentFactory(React: typeof _React) {
  return function BrickValueMappingComponent(props: any): React.ReactElement {
    const {
      SchemaFieldComponent,
      formilySchemaFormatter,
      advancedMode,
      scope,
      form,
    } = props;

    const dataListRef = React.useRef<any>();

    React.useEffect(() => {
      form.setInitialValues({
        triggerClickEvent: false,
      });
    }, [form]);

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
    }, [scope, form]);

    return React.createElement(SchemaFieldComponent, {
      schema: formilySchemaFormatter(
        brickValueMappingSchema as any,
        advancedMode!
      ),
      scope,
    });
  };
}

(getRuntime() as any).customEditors.define(
  "presentational-bricks.brick-value-mapping",
  BrickValueMappingComponentFactory
);
