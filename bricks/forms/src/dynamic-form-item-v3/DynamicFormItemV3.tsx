import React, {
  forwardRef,
  Ref,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";
import {
  MinusCircleOutlined,
  PlusOutlined,
  DownloadOutlined,
  UploadOutlined,
  ExportOutlined,
} from "@ant-design/icons";
import { FormItemWrapper, FormItemWrapperProps } from "@next-libs/forms";
import { Button, Col, Divider, Form, FormInstance, Row, message } from "antd";
import { useTranslation } from "react-i18next";
import { NS_FORMS, K } from "../i18n/constants";
import { Column } from "../interfaces/dynamic-form-item-v3";
import { ColumnComponent } from "./ColumnComponent";
import style from "./DynamicFormItemV3.module.css";
import { getRealValue } from "./util";
import classNames from "classnames";
import { isBoolean } from "lodash";
import { exportToExcel, importFromExcel, exportFormData } from "./excelUtils";

const FORM_LIST_NAME = "dynamicForm";

interface LegacyDynamicFormItemV3Props extends FormItemWrapperProps {
  columns: Column[];
  value?: Record<string, any>[];
  onChange?: (value: Record<string, any>[]) => void;
  onAdd?: (value: { detail: Record<string, any>; index: number }) => void;
  onRemove?: (value: { detail: Record<string, any>; index: number }) => void;
  onInputBlur?: (value: {
    rowIndex: number;
    name: string;
    value: string;
  }) => void;
  hideRemoveButton?:
    | boolean
    | ((row: Record<string, any>, index: number) => boolean);
  disabledRemoveButton?:
    | boolean
    | ((row: Record<string, any>, index: number) => boolean);
  hideAddButton?: boolean | ((value: Record<string, any>[]) => boolean);
  disabledAddButton?: boolean | ((value: Record<string, any>[]) => boolean);
  dynamicFormStyle?: React.CSSProperties;
  onImport?: (value: Record<string, any>[]) => void;
  showImportExport?: boolean;
  exportExamples?: Record<string, string>[];
  importFilter?: string;
  gridColumns?: number;
}

interface LegacyDynamicFormItemV3Ref {
  validateFields: FormInstance["validateFields"];
  columns: Column[];
  setColumns: React.Dispatch<React.SetStateAction<Column[]>>;
  updateRowFieldValue: (
    rowIndex: number,
    fieldName: string,
    value: any
  ) => void;
}

type DynamicFormValue = {
  [FORM_LIST_NAME]: LegacyDynamicFormItemV3Props["value"];
};

// eslint-disable-next-line react/display-name
export const LegacyDynamicFormItemV3 = forwardRef(
  (
    props: LegacyDynamicFormItemV3Props,
    ref: Ref<LegacyDynamicFormItemV3Ref>
  ): React.ReactElement => {
    const {
      value,
      label,
      onChange,
      onAdd,
      onRemove,
      onInputBlur,
      hideRemoveButton,
      disabledRemoveButton,
      hideAddButton,
      disabledAddButton,
      dynamicFormStyle,
      onImport,
      showImportExport,
      gridColumns,
      exportExamples,
      importFilter,
    } = props;
    const { t } = useTranslation(NS_FORMS);
    const [form] = Form.useForm();
    const [columns, setColumns] = React.useState<Column[]>([]);
    const isProcessingChanges = React.useRef(false);
    const prevRowCount = React.useRef(0);
    useEffect(() => {
      setColumns(props.columns || []);
    }, [props.columns]);

    useImperativeHandle(ref, () => ({
      validateFields: form.validateFields,
      columns: columns,
      setColumns: setColumns,
      updateRowFieldValue: (
        rowIndex: number,
        fieldName: string,
        value: any
      ) => {
        const currentData = props.value || [];
        const newData = [...currentData];
        if (newData[rowIndex]) {
          newData[rowIndex] = { ...newData[rowIndex], [fieldName]: value };
        }
        form.setFieldsValue({ [FORM_LIST_NAME]: newData });
        onChange?.([...newData]);
      },
    }));

    useEffect(() => {
      form.setFieldsValue({ [FORM_LIST_NAME]: value });
    }, [value]);

    const handleValuesChange = (
      changedValues: DynamicFormValue,
      allValues: DynamicFormValue
    ): void => {
      // 防止 setFieldsValue 再次触发 onValuesChange 导致无限循环
      if (isProcessingChanges.current) return;

      const changedRows = changedValues?.[FORM_LIST_NAME] as unknown as
        | Record<string, Record<string, any>>
        | undefined;
      const allRows = allValues?.[FORM_LIST_NAME];

      // 行数变化（添加/删除行）时，跳过列级 onValuesChange 回调
      const currentRowCount = allRows?.length ?? 0;
      const isRowStructChange = currentRowCount !== prevRowCount.current;
      prevRowCount.current = currentRowCount;

      if (changedRows && allRows && !isRowStructChange) {
        const updatedRows = [...allRows];
        let hasUpdates = false;

        Object.keys(changedRows).forEach((rowIndexStr) => {
          const rowIndex = Number(rowIndexStr);
          const changedFields = changedRows[rowIndexStr];
          if (!changedFields) return;

          Object.keys(changedFields).forEach((fieldName) => {
            const column = columns.find(
              (col: Column) => col.name === fieldName
            );
            if (column?.onValuesChange) {
              try {
                const updates = column.onValuesChange(
                  updatedRows[rowIndex],
                  rowIndex,
                  fieldName
                );
                if (updates && Object.keys(updates).length > 0) {
                  updatedRows[rowIndex] = {
                    ...updatedRows[rowIndex],
                    ...updates,
                  };
                  hasUpdates = true;
                }
              } catch (e) {
                // eslint-disable-next-line no-console
                console.error(`column "${fieldName}" onValuesChange error:`, e);
              }
            }
          });
        });

        if (hasUpdates) {
          isProcessingChanges.current = true;
          form.setFieldsValue({ [FORM_LIST_NAME]: updatedRows });
          isProcessingChanges.current = false;
          onChange?.(updatedRows);
          return;
        }
      }

      onChange?.(allRows);
    };

    const handleInputBlur = (
      rowIndex: number,
      name: string,
      value: string
    ): void => {
      onInputBlur?.({ rowIndex, name, value });
    };

    const hasLabel = useMemo(
      () => columns.some((column) => column.label),
      [columns]
    );

    const showLabelInAllRows = useMemo(() => !!gridColumns, [gridColumns]);

    const defaultValues = useMemo(
      () =>
        columns.reduce(
          (pre: Record<string, any>, cur: Column) => ({
            ...pre,
            [cur.name]: cur.defaultValue,
          }),
          {}
        ),
      [columns]
    );

    const handleExportTemplate = () => {
      exportToExcel(
        columns,
        `${label || ""}_${t(`${NS_FORMS}:${K.TEMPLATE}`)}`,
        exportExamples
      );
    };

    // 新增导出数据处理函数
    const handleExportData = () => {
      exportFormData(
        columns,
        value || [],
        `${label || ""}_${t(`${NS_FORMS}:${K.EXPORT_DATA}`)}`
      );
    };

    // 解析字符串中的 ${rowValue.xxx} 模板，替换为实际行数据
    const resolveTemplate = (
      value: any,
      rowValue: Record<string, any>
    ): any => {
      if (typeof value === "string") {
        return value.replace(/\$\{rowValue\.([^}]+)\}/g, (_, path) => {
          const parts = path.split(".");
          let result: any = rowValue;
          for (const part of parts) {
            result = result?.[part];
          }
          return result ?? "";
        });
      }
      if (Array.isArray(value)) {
        return value.map((item) => resolveTemplate(item, rowValue));
      }
      if (value !== null && typeof value === "object") {
        const resolved: Record<string, any> = {};
        for (const [k, v] of Object.entries(value)) {
          resolved[k] = resolveTemplate(v, rowValue);
        }
        return resolved;
      }
      return value;
    };

    // 按点分路径从对象中取值，如 "data.list.0.name"
    const getByPath = (obj: any, path: string): any => {
      const parts = path.split(".");
      let result: any = obj;
      for (const part of parts) {
        result = result?.[part];
      }
      return result;
    };

    // 声明式联动处理：遍历所有行，根据列的 linkage 配置发起 API 请求并映射响应
    const applyLinkageAsync = async (
      rows: Record<string, any>[]
    ): Promise<{
      updatedRows: Record<string, any>[];
      allOptionUpdates: Record<
        string,
        {
          rowIndex: number;
          options: { label: string; value: string | number }[];
        }[]
      >;
    }> => {
      const updatedRows = [...rows.map((r) => ({ ...r }))];
      const allOptionUpdates: Record<
        string,
        {
          rowIndex: number;
          options: { label: string; value: string | number }[];
        }[]
      > = {};

      for (let rowIndex = 0; rowIndex < updatedRows.length; rowIndex++) {
        for (const column of columns) {
          if (!column.linkage) continue;
          // 统一转为数组，支持同一列配置多个联动
          const linkages = Array.isArray(column.linkage)
            ? column.linkage
            : [column.linkage];

          for (const linkage of linkages) {
            const {
              url,
              method = "POST",
              body,
              condition,
              fieldUpdates,
              optionUpdates,
            } = linkage;
            try {
              // 解析 body 中的 ${rowValue.xxx} 模板
              const resolvedBody = body
                ? resolveTemplate(body, updatedRows[rowIndex])
                : undefined;

              // 发起 API 请求
              const response = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: resolvedBody ? JSON.stringify(resolvedBody) : undefined,
              });
              const responseData = await response.json();

              // 评估条件表达式，决定是否执行更新
              if (condition) {
                try {
                  // eslint-disable-next-line no-new-func
                  const conditionFn = new Function(
                    "response",
                    `return (${condition})`
                  );
                  if (!conditionFn(responseData)) {
                    continue;
                  }
                } catch (condErr) {
                  // eslint-disable-next-line no-console
                  console.error(
                    `column "${column.name}" linkage condition error:`,
                    condErr
                  );
                  continue;
                }
              }

              // 映射 fieldUpdates：从响应中按路径提取值，或按 find 配置查找
              if (fieldUpdates) {
                const updates: Record<string, any> = {};
                for (const [fieldName, fieldConfig] of Object.entries(
                  fieldUpdates
                )) {
                  // 检查 when 条件
                  const when =
                    typeof fieldConfig === "object" && fieldConfig !== null
                      ? (fieldConfig as { when?: string }).when
                      : undefined;
                  if (when) {
                    try {
                      // eslint-disable-next-line no-new-func
                      const whenFn = new Function(
                        "response",
                        `return (${when})`
                      );
                      if (!whenFn(responseData)) continue;
                    } catch (whenErr) {
                      // eslint-disable-next-line no-console
                      console.error(
                        `column "${column.name}" fieldUpdates "${fieldName}" when error:`,
                        whenErr
                      );
                      continue;
                    }
                  }

                  if (
                    typeof fieldConfig === "object" &&
                    fieldConfig !== null &&
                    fieldConfig.type === "find"
                  ) {
                    // find 模式：从列表中按条件查找并提取字段值
                    const findConfig = fieldConfig as any;
                    const list = getByPath(responseData, findConfig.listPath);
                    const matchVal = resolveTemplate(
                      findConfig.matchValue,
                      updatedRows[rowIndex]
                    );
                    const matched = Array.isArray(list)
                      ? list.find(
                          (item: any) =>
                            item[findConfig.matchField] === matchVal
                        )
                      : undefined;
                    updates[fieldName] = matched
                      ? matched[findConfig.extractField]
                      : undefined;
                  } else if (
                    typeof fieldConfig === "object" &&
                    fieldConfig !== null &&
                    "path" in fieldConfig
                  ) {
                    // FieldPathConfig 模式：带条件的路径配置
                    updates[fieldName] = getByPath(
                      responseData,
                      (fieldConfig as { path: string }).path
                    );
                  } else {
                    // 简单路径模式
                    updates[fieldName] = getByPath(
                      responseData,
                      fieldConfig as string
                    );
                  }
                }
                updatedRows[rowIndex] = {
                  ...updatedRows[rowIndex],
                  ...updates,
                };
              }

              // 映射 optionUpdates：从响应中按路径提取列表并生成 options
              if (optionUpdates) {
                for (const [fieldName, config] of Object.entries(
                  optionUpdates
                )) {
                  const list = getByPath(responseData, config.path);
                  if (Array.isArray(list)) {
                    const sliced =
                      config.maxItems != null
                        ? list.slice(0, config.maxItems)
                        : list;
                    const options = sliced.map((item: any) => ({
                      label: item[config.labelField],
                      value: item[config.valueField],
                    }));
                    if (!allOptionUpdates[fieldName])
                      allOptionUpdates[fieldName] = [];
                    allOptionUpdates[fieldName].push({ rowIndex, options });
                  }
                }
              }
            } catch (e) {
              // eslint-disable-next-line no-console
              console.error(`column "${column.name}" linkage error:`, e);
            }
          }
        }
      }

      return { updatedRows, allOptionUpdates };
    };

    const handleImport = async (file: File) => {
      try {
        const allowedTypes = [
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
          "application/vnd.ms-excel", // .xls
          "text/csv", // .csv
          "application/wps-office.xlsx", // wps.xlsx
        ];

        if (!allowedTypes.includes(file.type)) {
          throw new Error(
            t(`${NS_FORMS}:${K.INVALID_FILE_TYPE_DYNAMIC_FORM_ITEM}`)
          );
        }

        const importedData = await importFromExcel(file, columns, importFilter);

        if (!importedData) {
          throw new Error(t(`${NS_FORMS}:${K.IMPORT_DATA_EMPTY}`));
        }

        if (!Array.isArray(importedData)) {
          throw new Error(t(`${NS_FORMS}:${K.IMPORT_DATA_FORMAT_ERROR}`));
        }

        // 执行内部声明式联动（根据列 linkage 配置发起 API 调用、更新字段值和 options）
        const { updatedRows, allOptionUpdates } = await applyLinkageAsync(
          importedData
        );

        // 更新表单值
        form.setFieldsValue({ [FORM_LIST_NAME]: updatedRows });

        // 更新 columns 中的 options（通过 setColumns）
        if (Object.keys(allOptionUpdates).length > 0) {
          setColumns(
            (prev) =>
              prev.map((col) => {
                if (allOptionUpdates[col.name]) {
                  const newOptions = [
                    ...((col.props as Record<string, any>)?.options || []),
                  ];
                  allOptionUpdates[col.name].forEach(
                    ({ rowIndex, options }) => {
                      newOptions[rowIndex] = options;
                    }
                  );
                  return {
                    ...col,
                    props: { ...col.props, options: newOptions },
                  } as Column;
                }
                return col;
              }) as Column[]
          );
        }

        // 在数据数组上附加不可枚举的 isImport 标识
        // 不会出现在 JSON.stringify / Object.keys / for...of 中，不污染表单数据
        // 外部可通过 EVENT.detail.isImport 检测是否为导入场景
        Object.defineProperty(updatedRows, "isImport", {
          value: true,
          enumerable: false,
          configurable: true,
          writable: true,
        });

        // 通过 onChange 通知外部（外部通过 EVENT.detail.isImport 判断为导入场景，可跳过自身联动）
        onChange?.(updatedRows);
        // 同时触发 onImport 保持向后兼容
        onImport?.(updatedRows);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Import failed: ", error);
        message.error(
          `${t(`${NS_FORMS}:${K.IMPORT_FAILED}`)}, ${error.message}`
        );
      }
    };

    const fileInputRef = useRef<HTMLInputElement>(null);

    return (
      <div className={style.dynamicForm} style={{ ...dynamicFormStyle }}>
        {showImportExport && (
          <div className={style.importExportButtons}>
            <a onClick={handleExportTemplate}>
              <DownloadOutlined /> {t(`${NS_FORMS}:${K.DOWNLOAD_TEMPLATE}`)}
            </a>
            <a onClick={() => fileInputRef.current?.click()}>
              <UploadOutlined /> {t(`${NS_FORMS}:${K.IMPORT_DATA}`)}
            </a>
            <a onClick={handleExportData}>
              <ExportOutlined /> {t(`${NS_FORMS}:${K.EXPORT_DATA}`)}
            </a>
            <input
              ref={fileInputRef}
              type="file"
              accept=".xlsx,.xls,.csv"
              data-testid="excel-file-input"
              style={{ display: "none" }}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  handleImport(file);
                }
                e.target.value = "";
              }}
            />
          </div>
        )}
        <Form
          form={form}
          layout={"vertical"}
          initialValues={value}
          onValuesChange={handleValuesChange}
        >
          <Form.List name={FORM_LIST_NAME}>
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => {
                  const showLabel = hasLabel && name === 0;
                  const rowValue = value?.[name];
                  const hideRemoveBtn = getRealValue(hideRemoveButton, [
                    rowValue,
                    name,
                  ]);
                  const isGridLayout = !!gridColumns;
                  return (
                    <Row key={key} className={style.row}>
                      <Row gutter={[12, 8]} style={{ flex: 1 }}>
                        {columns?.map((column) => {
                          const props = column.props as
                            | Record<string, any>
                            | undefined;
                          const hidden = getRealValue(props?.hidden, [
                            rowValue,
                            name,
                          ]);
                          return (
                            <Col
                              key={column.name}
                              span={
                                isGridLayout
                                  ? (24 / gridColumns) * (column.span || 1)
                                  : undefined
                              }
                              style={{
                                display: hidden ? "none" : undefined,
                                flex: !isGridLayout
                                  ? column.flex ?? "1"
                                  : undefined,
                                width: !isGridLayout
                                  ? "fit-content"
                                  : undefined,
                              }}
                            >
                              <ColumnComponent
                                hasLabel={hasLabel}
                                showLabelInAllRows={showLabelInAllRows}
                                rowIndex={name}
                                column={column}
                                formValue={value}
                                field={{ key, name, ...restField }}
                                handleInputBlur={handleInputBlur}
                              />
                            </Col>
                          );
                        })}
                      </Row>
                      <Col
                        style={{
                          display: hideRemoveBtn ? "none" : "flex",
                          marginLeft: "8px",
                        }}
                      >
                        <Button
                          type="link"
                          className={classNames(style.removeRowBtn, [
                            {
                              [style.inLabelRow]: !isGridLayout && showLabel,
                              [style.inGridLayout]: isGridLayout,
                            },
                          ])}
                          disabled={getRealValue(disabledRemoveButton, [
                            rowValue,
                            name,
                          ])}
                          onClick={() => {
                            const index = name;
                            const curValue =
                              form.getFieldValue(FORM_LIST_NAME)?.[index];
                            remove(index);
                            onRemove?.({ detail: curValue, index });
                          }}
                        >
                          <MinusCircleOutlined />
                        </Button>
                      </Col>
                      {isGridLayout && key !== fields.length - 1 && (
                        <Divider className={classNames(style.divider)} />
                      )}
                    </Row>
                  );
                })}
                <Button
                  className={classNames(style.addRowBtn, [
                    {
                      [style.displayNone]: getRealValue(hideAddButton, [value]),
                    },
                  ])}
                  style={{
                    width:
                      isBoolean(hideRemoveButton) && hideRemoveButton
                        ? "100%"
                        : "calc(100% - 34px)",
                  }}
                  disabled={getRealValue(disabledAddButton, [value])}
                  type="dashed"
                  onClick={() => {
                    const index = fields.length;
                    add(defaultValues);
                    onAdd?.({ detail: defaultValues, index });
                  }}
                  icon={<PlusOutlined />}
                >
                  {t(`${NS_FORMS}:${K.ADD}`)}
                </Button>
              </>
            )}
          </Form.List>
        </Form>
      </div>
    );
  }
);

export interface upperDynamicFormItemV3Ref {
  columns: Column[];
  setColumns: React.Dispatch<React.SetStateAction<Column[]>>;
  updateRowFieldValue: (
    rowIndex: number,
    fieldName: string,
    value: any
  ) => void;
}

interface DynamicFormItemV3Props extends LegacyDynamicFormItemV3Props {
  upperRef: Ref<upperDynamicFormItemV3Ref>;
}

export function DynamicFormItemV3(
  props: DynamicFormItemV3Props
): React.ReactElement {
  const { t } = useTranslation(NS_FORMS);
  const {
    onChange,
    onAdd,
    onRemove,
    onInputBlur,
    disabledRemoveButton,
    hideRemoveButton,
    hideAddButton,
    disabledAddButton,
    upperRef,
    dynamicFormStyle,
    onImport,
    showImportExport,
    label,
    gridColumns,
    exportExamples,
    importFilter,
  } = props;
  const DynamicFormItemV3Ref = useRef<LegacyDynamicFormItemV3Ref>();

  useImperativeHandle(upperRef, () => ({
    get columns(): Column[] {
      return DynamicFormItemV3Ref.current?.columns || [];
    },
    setColumns: (updater: React.SetStateAction<Column[]>) => {
      DynamicFormItemV3Ref.current?.setColumns?.(updater);
    },
    updateRowFieldValue: (rowIndex: number, fieldName: string, value: any) => {
      DynamicFormItemV3Ref.current?.updateRowFieldValue?.(
        rowIndex,
        fieldName,
        value
      );
    },
  }));

  const validators = [
    {
      validator: async () => {
        return new Promise((resolve, reject) => {
          // To avoid outOfDate
          setTimeout(() => {
            DynamicFormItemV3Ref.current
              .validateFields()
              .then((values) => {
                resolve(null);
              })
              .catch((error) => {
                reject(t(K.VALIDATION_FAILED, { label: props.label }));
              });
          });
        });
      },
    },
  ];

  return (
    <FormItemWrapper
      {...props}
      validator={validators.concat(props.validator || ([] as any))}
    >
      <LegacyDynamicFormItemV3
        ref={DynamicFormItemV3Ref}
        label={label}
        columns={props.columns}
        onChange={onChange}
        onAdd={onAdd}
        onRemove={onRemove}
        onInputBlur={onInputBlur}
        disabledRemoveButton={disabledRemoveButton}
        hideRemoveButton={hideRemoveButton}
        hideAddButton={hideAddButton}
        disabledAddButton={disabledAddButton}
        dynamicFormStyle={dynamicFormStyle}
        onImport={onImport}
        showImportExport={showImportExport}
        gridColumns={gridColumns}
        exportExamples={exportExamples}
        importFilter={importFilter}
      />
    </FormItemWrapper>
  );
}
