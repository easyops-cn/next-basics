import React, { useImperativeHandle, forwardRef } from "react";
import { useTranslation } from "react-i18next";
import { NS_FLOW_BUILDER, K } from "../i18n/constants";
import { Form, Upload, Button, FormInstance } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { UploadFile, UploadChangeParam } from "antd/es/upload/interface";
import { isNil } from "lodash";

export interface FileField {
  name: string;
  type: string;
  required?: boolean;
}

export type UploadFormData = Record<string, UploadChangeParam>;
export type ProcessedUploadFormData = Record<string, Array<UploadFile>>;

export interface MultipleFilesFormProps {
  fieldList: FileField[];
  onFinish?: (data: ProcessedUploadFormData) => void;
  onFinishFailed?: (data: any) => void;
}

export function processFileData(data: UploadFormData): ProcessedUploadFormData {
  return Object.entries(data).reduce(
    (obj: Record<string, any>, [key, value]) => {
      if (isNil(value)) return obj;
      return {
        ...obj,
        [key]: value.fileList,
      };
    },
    {}
  );
}

function isMultipleFiles(type: string): boolean {
  return type.endsWith("[]");
}

export function LegacyMultipleFilesForm(
  { fieldList, onFinish, onFinishFailed }: MultipleFilesFormProps,
  ref: React.Ref<FormInstance>
): React.ReactElement {
  const [form] = Form.useForm();

  useImperativeHandle(ref, () => form);

  const handleFinish = (data: UploadFormData): void => {
    const formData = processFileData(data);
    onFinish?.(formData);
  };

  return (
    <Form
      form={form}
      name="filesForm"
      data-testid="files-form"
      onFinish={handleFinish}
      onFinishFailed={onFinishFailed}
    >
      {fieldList?.map((item) => (
        <Form.Item
          key={item.name}
          name={item.name}
          label={item.name}
          rules={[{ required: item.required }]}
        >
          <Upload
            maxCount={isMultipleFiles(item.type) ? null : 1}
            beforeUpload={() => false}
          >
            <Button icon={<UploadOutlined />}>upload</Button>
          </Upload>
        </Form.Item>
      ))}
    </Form>
  );
}

export const MultipleFilesForm = forwardRef(LegacyMultipleFilesForm);
