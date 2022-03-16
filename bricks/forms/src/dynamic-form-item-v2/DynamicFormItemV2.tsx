import React, {
  forwardRef,
  Ref,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { FormItemWrapper, FormItemWrapperProps } from "@next-libs/forms";
import { Button, Col, Form, FormInstance, Row } from "antd";
import { useTranslation } from "react-i18next";
import { NS_FORMS, K } from "../i18n/constants";
import { Column } from "../interfaces";
import { ColumnComponent } from "./ColumnComponent";
import style from "./DynamicFormItemV2.module.css";
import { getRealValue } from "./util";
import classNames from "classnames";

const FORM_LIST_NAME = "dynamicForm";

interface LegacyDynamicFormItemV2Props extends FormItemWrapperProps {
  columns: Column[];
  value?: Record<string, any>[];
  onChange?: (value: Record<string, any>[]) => void;
  onAdd?: (value: { detail: Record<string, any>; index: number }) => void;
  onRemove?: (value: { detail: Record<string, any>; index: number }) => void;
  hideRemoveButton?:
    | boolean
    | ((row: Record<string, any>, index: number) => boolean);
  disabledRemoveButton?:
    | boolean
    | ((row: Record<string, any>, index: number) => boolean);
  hideAddButton?: boolean | ((value: Record<string, any>[]) => boolean);
  disabledAddButton?: boolean | ((value: Record<string, any>[]) => boolean);
}

interface LegacyDynamicFormItemV2Ref {
  validateFields: FormInstance["validateFields"];
}

type DynamicFormValue = {
  [FORM_LIST_NAME]: LegacyDynamicFormItemV2Props["value"];
};

// eslint-disable-next-line react/display-name
const LegacyDynamicFormItemV2 = forwardRef(
  (
    props: LegacyDynamicFormItemV2Props,
    ref: Ref<LegacyDynamicFormItemV2Ref>
  ): React.ReactElement => {
    const {
      value,
      columns,
      onChange,
      onAdd,
      onRemove,
      hideRemoveButton,
      disabledRemoveButton,
      hideAddButton,
      disabledAddButton,
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

    const hasLabel = useMemo(
      () => columns.some((column) => column.label),
      [columns]
    );

    const defaultValues = useMemo(
      () =>
        columns.reduce(
          (pre, cur) => ({ ...pre, [cur.name]: cur.defaultValue }),
          {}
        ),
      [columns]
    );

    return (
      <div className={style.dynamicForm}>
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
                  const rowValue = value?.[name];

                  return (
                    <Row key={key} className={style.row} gutter={12}>
                      {columns?.map((column) => (
                        <Col
                          key={column.name}
                          style={{ flex: column.flex ?? "1", minWidth: 0 }}
                        >
                          <ColumnComponent
                            hasLabel={hasLabel}
                            rowIndex={name}
                            column={column}
                            formValue={value}
                            field={{ key, name, ...restField }}
                          />
                        </Col>
                      ))}
                      <Col>
                        <Button
                          type="link"
                          className={classNames(style.removeRowBtn, [
                            {
                              [style.hidden]: getRealValue(hideRemoveButton, [
                                rowValue,
                                name,
                              ]),
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
                    </Row>
                  );
                })}
                <Button
                  className={classNames(style.addRowBtn, [
                    {
                      [style.displayNone]: getRealValue(hideAddButton, [value]),
                    },
                  ])}
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

interface DynamicFormItemV2Props extends LegacyDynamicFormItemV2Props {}

export function DynamicFormItemV2(
  props: DynamicFormItemV2Props
): React.ReactElement {
  const { t } = useTranslation(NS_FORMS);
  const {
    onChange,
    onAdd,
    onRemove,
    disabledRemoveButton,
    hideRemoveButton,
    hideAddButton,
    disabledAddButton,
  } = props;
  const DynamicFormItemV2Ref = useRef<LegacyDynamicFormItemV2Ref>();

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
        columns={props.columns}
        onChange={onChange}
        onAdd={onAdd}
        onRemove={onRemove}
        disabledRemoveButton={disabledRemoveButton}
        hideRemoveButton={hideRemoveButton}
        hideAddButton={hideAddButton}
        disabledAddButton={disabledAddButton}
      />
    </FormItemWrapper>
  );
}
