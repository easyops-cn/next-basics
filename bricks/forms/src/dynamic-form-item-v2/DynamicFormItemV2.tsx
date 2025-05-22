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
} from "@ant-design/icons";
import { FormItemWrapper, FormItemWrapperProps } from "@next-libs/forms";
import { Button, Col, Divider, Form, FormInstance, Row, message } from "antd";
import { useTranslation } from "react-i18next";
import { NS_FORMS, K } from "../i18n/constants";
import { Column } from "../interfaces";
import { ColumnComponent } from "./ColumnComponent";
import style from "./DynamicFormItemV2.module.css";
import { getRealValue } from "./util";
import classNames from "classnames";
import { isBoolean } from "lodash";
import { exportToExcel, importFromExcel } from "./excelUtils";

const FORM_LIST_NAME = "dynamicForm";

interface LegacyDynamicFormItemV2Props extends FormItemWrapperProps {
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
  gridColumns?: number;
}

interface LegacyDynamicFormItemV2Ref {
  validateFields: FormInstance["validateFields"];
}

type DynamicFormValue = {
  [FORM_LIST_NAME]: LegacyDynamicFormItemV2Props["value"];
};

// eslint-disable-next-line react/display-name
export const LegacyDynamicFormItemV2 = forwardRef(
  (
    props: LegacyDynamicFormItemV2Props,
    ref: Ref<LegacyDynamicFormItemV2Ref>
  ): React.ReactElement => {
    const {
      value,
      label,
      columns = [],
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
    } = props;
    const { t } = useTranslation(NS_FORMS);
    const [form] = Form.useForm();

    useImperativeHandle(ref, () => ({
      validateFields: form.validateFields,
    }));

    useEffect(() => {
      form.setFieldsValue({ [FORM_LIST_NAME]: value });
    }, [value]);

    const handleValuesChange = (
      changedValues: DynamicFormValue,
      allValues: DynamicFormValue
    ): void => {
      onChange?.(allValues?.[FORM_LIST_NAME]);
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
          (pre, cur) => ({ ...pre, [cur.name]: cur.defaultValue }),
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

    const handleImport = async (file: File) => {
      try {
        const allowedTypes = [
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
          "application/vnd.ms-excel", // .xls
          "text/csv", // .csv
          "application/wps-office.xlsx"  // wps.xlsx
        ];

        if (!allowedTypes.includes(file.type)) {
          throw new Error(
            t(`${NS_FORMS}:${K.INVALID_FILE_TYPE_DYNAMIC_FORM_ITEM}`)
          );
        }

        const importedData = await importFromExcel(file, columns);

        if (!importedData) {
          throw new Error(t(`${NS_FORMS}:${K.IMPORT_DATA_EMPTY}`));
        }

        if (!Array.isArray(importedData)) {
          throw new Error(t(`${NS_FORMS}:${K.IMPORT_DATA_FORMAT_ERROR}`));
        }

        form.setFieldsValue({ [FORM_LIST_NAME]: importedData });
        onChange?.(importedData);
        onImport?.(importedData);
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
                        {columns?.map((column) => (
                          <Col
                            key={column.name}
                            span={
                              isGridLayout
                                ? (24 / gridColumns) * (column.span || 1)
                                : undefined
                            }
                            style={{
                              flex: !isGridLayout
                                ? column.flex ?? "1"
                                : undefined,
                              width: !isGridLayout ? "fit-content" : undefined,
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
                        ))}
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

export interface upperDynamicFormItemV2Ref {
  columns: Column[];
  setColumns: React.Dispatch<React.SetStateAction<Column[]>>;
}

interface DynamicFormItemV2Props extends LegacyDynamicFormItemV2Props {
  upperRef: Ref<upperDynamicFormItemV2Ref>;
}

export function DynamicFormItemV2(
  props: DynamicFormItemV2Props
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
  } = props;
  const [columns, setColumns] = React.useState<Column[]>([]);
  const DynamicFormItemV2Ref = useRef<LegacyDynamicFormItemV2Ref>();

  useImperativeHandle(upperRef, () => ({
    columns: columns,
    setColumns: setColumns,
  }));

  useEffect(() => {
    setColumns(props.columns);
  }, [props.columns]);

  const validators = [
    {
      validator: async () => {
        return new Promise((resolve, reject) => {
          // To avoid outOfDate
          setTimeout(() => {
            DynamicFormItemV2Ref.current
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
      <LegacyDynamicFormItemV2
        ref={DynamicFormItemV2Ref}
        label={label}
        columns={columns}
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
      />
    </FormItemWrapper>
  );
}
