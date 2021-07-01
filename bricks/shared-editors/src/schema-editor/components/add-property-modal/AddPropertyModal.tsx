import React, { useEffect } from "react";
import { Modal, Form, Input, Checkbox, Select } from "antd";
import { schemaTypeList } from "../../constants";
import { SchemaItemProperty } from "../../SchemaEditor";

export interface AddPropertyModalProps {
  trackId?: string;
  visible: boolean;
  onClose: () => void;
  onSubmit?: (
    value: SchemaItemProperty,
    trackId: string,
    isEdit?: boolean
  ) => void;
  initValue?: unknown;
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
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(initValue);
  }, [form, initValue]);

  const handleOk = (): void => {
    form.submit();
  };

  const handleClose = (): void => {
    form.resetFields();
    onClose?.();
  };

  const handleFinish = (values: SchemaItemProperty): void => {
    onSubmit?.(values, trackId, isEdit);
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
        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="required" label="Required" valuePropName="checked">
          <Checkbox />
        </Form.Item>
        <Form.Item name="type" label="Type" rules={[{ required: true }]}>
          <Select>
            {schemaTypeList.map((type) => (
              <Select.Option key={type} value={type}>
                {type}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="description" label="description">
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
}
