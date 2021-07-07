import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { NS_FLOW_BUILDER, K } from "../../../i18n/constants";
import {
  Modal,
  Form,
  Input,
  Select,
  AutoComplete,
  Radio,
  Switch,
  Row,
  Col,
  InputNumber,
} from "antd";
import { innerTypeList, numberTypeList } from "../../constants";
import { SchemaItemProperty, AddedSchemaFormItem } from "../../interfaces";
import { processItemInitValue, processItemData } from "../../processor";
import { FieldValidatorItem } from "../field-validator-item/FieldValidatorItem";

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
}

export function AddPropertyModal({
  visible,
  onClose,
  onSubmit,
  initValue,
  trackId,
  isEdit,
}: AddPropertyModalProps): React.ReactElement {
  const { t } = useTranslation(NS_FLOW_BUILDER);
  const [form] = Form.useForm();
  const [nameRequired, setNameRequired] = useState<boolean>(true);

  useEffect(() => {
    form.setFieldsValue(processItemInitValue(initValue));
    if (initValue?.ref) {
      setNameRequired(false);
    } else {
      setNameRequired(true);
    }
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

  const typeFormItem = useMemo(
    () => (
      <Form.Item label="Type">
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item name="origin" initialValue="normal">
              <Select>
                <Select.Option key="normal" value="normal">
                  {t(K.SCHEMA_ITEM_NORMAL)}
                </Select.Option>
                <Select.Option key="reference" value="reference">
                  {t(K.SCHEMA_ITEM_REF)}
                </Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              noStyle
              shouldUpdate={(prevValues, currentValues) =>
                prevValues.origin !== currentValues.origin
              }
            >
              {({ getFieldValue }) =>
                getFieldValue("origin") === "normal" ? (
                  <Form.Item
                    name="type"
                    rules={[{ required: true }]}
                    messageVariables={{ label: "type" }}
                  >
                    <AutoComplete>
                      {innerTypeList.map((type) => (
                        <AutoComplete.Option key={type} value={type}>
                          {type}
                        </AutoComplete.Option>
                      ))}
                    </AutoComplete>
                  </Form.Item>
                ) : (
                  <Form.Item
                    name="ref"
                    rules={[{ required: true }]}
                    messageVariables={{ label: "ref" }}
                  >
                    <Input />
                  </Form.Item>
                )
              }
            </Form.Item>
          </Col>
        </Row>
      </Form.Item>
    ),
    []
  );

  const defaultFormItem = useMemo(
    () => (
      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) =>
          prevValues.type !== currentValues.type
        }
      >
        {({ getFieldValue }) =>
          getFieldValue("type") === "bool" ? (
            <Form.Item name="default" label="Default">
              <Radio.Group>
                <Radio value={true}>true</Radio>
                <Radio value={false}>false</Radio>
              </Radio.Group>
            </Form.Item>
          ) : numberTypeList.includes(getFieldValue("type")) ? (
            <Form.Item name="default" label="Default">
              <InputNumber />
            </Form.Item>
          ) : getFieldValue("type") === "string" ? (
            <Form.Item name="default" label="Default">
              <Input />
            </Form.Item>
          ) : null
        }
      </Form.Item>
    ),
    []
  );

  return (
    <Modal
      title="property modal"
      visible={visible}
      onOk={handleOk}
      onCancel={handleClose}
      width={600}
    >
      <Form
        name="properties-form"
        form={form}
        onFinish={handleFinish}
        layout="vertical"
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: nameRequired }]}
        >
          <Input />
        </Form.Item>

        {typeFormItem}

        <Form.Item name="required" label="Required" valuePropName="checked">
          <Switch />
        </Form.Item>

        {defaultFormItem}

        <Form.Item
          noStyle
          shouldUpdate={(prevValues, currentValues) =>
            prevValues.type !== currentValues.type
          }
        >
          {({ getFieldValue }) =>
            [...numberTypeList, "string"].includes(getFieldValue("type")) && (
              <Form.Item name="enum" label="Enum">
                <Select
                  mode="tags"
                  style={{ width: "100%" }}
                  placeholder={t(K.ENUM_INPUT_PLANCEHOLDER)}
                ></Select>
              </Form.Item>
            )
          }
        </Form.Item>

        <Form.Item
          noStyle
          shouldUpdate={(prevValues, currentValues) =>
            prevValues.type !== currentValues.type
          }
        >
          {({ getFieldValue }) =>
            [...numberTypeList, "string"].includes(getFieldValue("type")) && (
              <Form.Item
                name="validate"
                label="Validate"
                getValueProps={(v) => ({
                  value: { ...v, type: getFieldValue("type") },
                })}
              >
                <FieldValidatorItem />
              </Form.Item>
            )
          }
        </Form.Item>

        <Form.Item name="description" label="description">
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
}
