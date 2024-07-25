import type _React from "react";
import { getRuntime } from "@next-core/brick-kit";
import { modalConfirmSchema } from "./modalConfirm.schema";

function ModalConfirmComponentFactory(React: typeof _React) {
  return function ModalConfirmComponent(props: any): React.ReactElement {
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
    }, [scope, form]);

    return React.createElement(SchemaFieldComponent, {
      schema: formilySchemaFormatter(modalConfirmSchema as any, advancedMode!),
      scope,
    });
  };
}

(getRuntime() as any).customEditors.define(
  "presentational-bricks.modal-confirm",
  ModalConfirmComponentFactory
);
