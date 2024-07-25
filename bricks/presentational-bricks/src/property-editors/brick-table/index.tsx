import type _React from "react";
import { getRuntime } from "@next-core/brick-kit";
import { brickTableSchema } from "./brickTable.schema";
import { get, omit } from "lodash";

const transformNormal2Advanced = (rawValue: any) => {
  const res = {
    ...omit(rawValue, ["isPagination"]),
    ...(rawValue.isPagination
      ? {}
      : {
          pagination: false,
        }),
  };
  return res;
};

const transformAdvanced2Normal = (rawValue: any) => {
  const paginationConfig = get(rawValue, "pagination");
  const res = {
    ...omit(rawValue, ["pagination"]),
    ...(paginationConfig === false
      ? {
          isPagination: false,
        }
      : {
          isPagination: true,
          pagination: paginationConfig,
        }),
  };
  return res;
};

function BrickTableComponentFactory(React: typeof _React) {
  return function BrickTableComponent(props: any): React.ReactElement {
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
        onFieldValueChange,
        onAdvancedChange,
        onFormInitialValuesChange,
        onSubmit,
      } = effects;

      form.setInitialValues({
        isPagination: true,
        rowSelection: false,
        defaultSelectAll: false,
        sortable: true,
        expandable: true,
        size: "large",
        defaultExpandAllRows: false,
        expandIconAsCell: true,
        frontSearch: false,
        tableDraggable: false,
        showHeader: true,
        shouldUpdateUrlParams: true,
      });

      // 当data变化时
      form.addEffects("dataChange", () => {
        onFormInitialValuesChange(() => {
          isInitRef.current = true;

          setTimeout(() => {
            isInitRef.current = false;
          });
        }),
          onFieldValueChange("dataSource", (field: any) => {
            if (!isInitRef.current) {
              // 清除关联值
              form.deleteValuesIn("rowKey");
            }

            // 修改关联值的options
            const { value } = field;
            const matchData = dataListRef.current?.find(
              (item: any) => item?.value === value
            );
            const matchDefinitionOptions =
              matchData?.dataDefinition?.fields?.map((item: any) => ({
                label: item?.name,
                value: item?.name,
              }));
            form.query("rowKey").take((field: any) => {
              field.setComponentProps({
                options: matchDefinitionOptions,
              });
            });
          });
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
      schema: formilySchemaFormatter(brickTableSchema as any, advancedMode!),
      scope,
    });
  };
}

(getRuntime() as any).customEditors.define(
  "presentational-bricks.brick-table",
  BrickTableComponentFactory
);
