import React, { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { NS_FLOW_BUILDER, K } from "../../../i18n/constants";
import { Modal, Form, Input, Select, Radio, Switch, InputNumber } from "antd";
import { numberTypeList } from "../../constants";
import { SchemaItemProperty, AddedSchemaFormItem } from "../../interfaces";
import {
  processItemInitValue,
  processItemData,
  checkRequired,
} from "../../processor";
import { rootTraceId } from "../../constants";
import { FieldValidatorItem } from "../field-validator-item/FieldValidatorItem";
import { TypeItem } from "../../components/type-item/TypeItem";
import { RefItem } from "../../components/ref-item/RefItem";
import { RefRequiredItem } from "../ref-required-item/RefRequiredItem";

export interface AddPropertyModalProps {
  trackId?: string;
  visible: boolean;
  onClose: () => void;
  onSubmit?: (
    value: SchemaItemProperty,
    trackId: string,
    isEdit?: boolean
  ) => void;
  initValue?: SchemaItemProperty;
  isEdit?: boolean;
  disabledModelType?: boolean;
  enableWrapper?: boolean;
  rootNodeRequired?: Record<string, boolean>;
}

export function AddPropertyModal({
  visible,
  onClose,
  onSubmit,
  initValue,
  trackId,
  isEdit,
  disabledModelType,
  enableWrapper,
  rootNodeRequired,
}: AddPropertyModalProps): React.ReactElement {
  const { t } = useTranslation(NS_FLOW_BUILDER);
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(processItemInitValue(initValue));
  }, [form, initValue]);

  const handleOk = (): void => {
    form.submit();
  };

  const handleClose = (): void => {
    form.resetFields();
    onClose?.();
  };

  const handleFinish = (values: AddedSchemaFormItem): void => {
    onSubmit?.(processItemData(values), trackId, isEdit);
    handleClose();
  };

  const nameFormItem = useMemo(
    () => (
      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) =>
          prevValues.origin !== currentValues.origin
        }
      >
        {({ getFieldValue }) =>
          ["normal", "model"].includes(getFieldValue("origin")) && (
            <Form.Item
              name="name"
              label={t(K.NAME_LABEL)}
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          )
        }
      </Form.Item>
    ),
    [t]
  );

  const categoryFormItem = useMemo(
    () => (
      <Form.Item
        hidden={disabledModelType}
        name="origin"
        initialValue="normal"
        label={t(K.CATEGORY_LABEL)}
      >
        <Select onChange={() => form.resetFields(["type", "ref"])}>
          <Select.Option key="normal" value="normal">
            {t(K.SCHEMA_ITEM_NORMAL)}
          </Select.Option>
          <Select.Option key="model" value="model">
            {t(K.SCHEMA_ITEM_MODEL)}
          </Select.Option>
          <Select.Option key="reference" value="reference">
            {t(K.SCHEMA_ITEM_REF)}
          </Select.Option>
        </Select>
      </Form.Item>
    ),
    [disabledModelType, t, form]
  );

  const typeFormItem = useMemo(
    () => (
      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) =>
          prevValues.origin !== currentValues.origin
        }
      >
        {({ getFieldValue }) =>
          ["normal", "model"].includes(getFieldValue("origin")) ? (
            <Form.Item
              name="type"
              label={t(K.TYPE_LABEL)}
              rules={[
                {
                  required:
                    trackId === rootTraceId && isEdit
                      ? rootNodeRequired?.type
                      : true,
                },
              ]}
              messageVariables={{ label: "type" }}
            >
              <TypeItem
                allowClear={
                  trackId === rootTraceId && isEdit && !rootNodeRequired?.type
                }
                type={getFieldValue("origin") === "model" ? "model" : "normal"}
              />
            </Form.Item>
          ) : (
            <Form.Item
              name="ref"
              label={t(K.REFERENCE_LABEL)}
              rules={[{ validator: checkRequired }]}
              messageVariables={{ label: "ref" }}
            >
              <RefItem onChange={() => form.resetFields(["refRequired"])} />
            </Form.Item>
          )
        }
      </Form.Item>
    ),
    [form, isEdit, rootNodeRequired, t, trackId]
  );

  const defaultFormItem = useMemo(
    () => (
      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) =>
          prevValues.type !== currentValues.type ||
          prevValues.origin !== currentValues.origin
        }
      >
        {({ getFieldValue }) =>
          getFieldValue("origin") === "normal" &&
          (getFieldValue("type") === "bool" ? (
            <Form.Item name="default" label={t(K.DEFAULT_LABEL)}>
              <Radio.Group>
                <Radio value={true}>true</Radio>
                <Radio value={false}>false</Radio>
              </Radio.Group>
            </Form.Item>
          ) : numberTypeList.includes(getFieldValue("type")) ? (
            <Form.Item name="default" label={t(K.DEFAULT_LABEL)}>
              <InputNumber />
            </Form.Item>
          ) : getFieldValue("type") === "string" ? (
            <Form.Item name="default" label={t(K.DEFAULT_LABEL)}>
              <Input />
            </Form.Item>
          ) : null)
        }
      </Form.Item>
    ),
    [t]
  );

  const enumFormItem = useMemo(
    () => (
      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) =>
          prevValues.type !== currentValues.type ||
          prevValues.origin !== currentValues.origin
        }
      >
        {({ getFieldValue }) =>
          getFieldValue("origin") === "normal" &&
          [...numberTypeList, "string"].includes(getFieldValue("type")) && (
            <Form.Item
              name="enum"
              label={t(K.ENUM_LABEL)}
              getValueFromEvent={(value: string[]) =>
                numberTypeList.includes(getFieldValue("type"))
                  ? value?.map((i) => Number(i))
                  : value
              }
            >
              <Select
                mode="tags"
                style={{ width: "100%" }}
                placeholder={t(K.ENUM_INPUT_PLACEHOLDER)}
              ></Select>
            </Form.Item>
          )
        }
      </Form.Item>
    ),
    [t]
  );

  const validatorFormItem = useMemo(
    () => (
      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) =>
          prevValues.type !== currentValues.type ||
          prevValues.origin !== currentValues.origin
        }
      >
        {({ getFieldValue }) =>
          getFieldValue("origin") === "normal" &&
          [...numberTypeList, "string"].includes(getFieldValue("type")) && (
            <Form.Item
              name="validate"
              label={t(K.VALIDATOR_LABEL)}
              getValueProps={(v) => ({
                value: { ...v, type: getFieldValue("type") },
              })}
            >
              <FieldValidatorItem />
            </Form.Item>
          )
        }
      </Form.Item>
    ),
    [t]
  );

  const requiredFormItem = useMemo(
    () => (
      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) =>
          prevValues.type !== currentValues.type ||
          prevValues.origin !== currentValues.origin ||
          prevValues.ref !== currentValues.ref
        }
      >
        {({ getFieldValue }) =>
          getFieldValue("origin") === "reference" &&
          getFieldValue("ref")?.includes(".*") ? (
            <Form.Item name="refRequired" label={t(K.REQUIRED_LABEL)}>
              <RefRequiredItem model={getFieldValue("ref").split(".")[0]} />
            </Form.Item>
          ) : (
            <Form.Item
              name="required"
              label={t(K.REQUIRED_LABEL)}
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
          )
        }
      </Form.Item>
    ),
    [t]
  );

  const showWrapperFormItem = useMemo(() => {
    return enableWrapper && trackId === rootTraceId && isEdit;
  }, [enableWrapper, trackId, isEdit]);

  const wrapperFormItem = useMemo(
    () => (
      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) =>
          prevValues.origin !== currentValues.origin
        }
      >
        {({ getFieldValue }) =>
          ["normal", "model"].includes(getFieldValue("origin")) && (
            <Form.Item
              initialValue={true}
              name="wrapper"
              label="wrapper"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
          )
        }
      </Form.Item>
    ),
    []
  );

  const descriptionFormItem = useMemo(
    () => (
      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) =>
          prevValues.origin !== currentValues.origin
        }
      >
        {({ getFieldValue }) =>
          ["normal", "model"].includes(getFieldValue("origin")) && (
            <Form.Item
              name="description"
              label={t(K.DESCRIPTION_LABEL)}
              rules={[
                {
                  required:
                    trackId === rootTraceId && isEdit
                      ? rootNodeRequired?.description
                      : true,
                },
              ]}
            >
              <Input.TextArea />
            </Form.Item>
          )
        }
      </Form.Item>
    ),
    [t, trackId, isEdit, rootNodeRequired]
  );

  return (
    <Modal
      title="property modal"
      destroyOnClose
      visible={visible}
      onOk={handleOk}
      onCancel={handleClose}
      width={600}
      maskClosable={false}
    >
      <Form
        name="properties-form"
        form={form}
        onFinish={handleFinish}
        layout="vertical"
      >
        {nameFormItem}
        {categoryFormItem}
        {typeFormItem}

        {requiredFormItem}

        {defaultFormItem}

        {enumFormItem}

        {validatorFormItem}
        {showWrapperFormItem && wrapperFormItem}
        {descriptionFormItem}
      </Form>
    </Modal>
  );
}
