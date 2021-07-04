import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { NS_FLOW_BUILDER, K } from "../../../i18n/constants";
import {
  Modal,
  Form,
  Input,
  Checkbox,
  Select,
  AutoComplete,
  Row,
  Col,
} from "antd";
import { innerTypeList } from "../../constants";
import { SchemaItemProperty, AddedSchemaFormItem } from "../../interfaces";
import { processItemInitValue, processItemData } from "../../processor";

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

  return (
    <Modal
      title="property modal"
      visible={visible}
      onOk={handleOk}
      onCancel={handleClose}
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

        <Form.Item name="required" label="Required" valuePropName="checked">
          <Checkbox />
        </Form.Item>

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
                    <Form.Item name="type" rules={[{ required: true }]}>
                      <AutoComplete>
                        {innerTypeList.map((type) => (
                          <AutoComplete.Option key={type} value={type}>
                            {type}
                          </AutoComplete.Option>
                        ))}
                      </AutoComplete>
                    </Form.Item>
                  ) : (
                    <Form.Item name="ref" rules={[{ required: true }]}>
                      <Input />
                    </Form.Item>
                  )
                }
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>

        <Form.Item name="description" label="description">
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
}
