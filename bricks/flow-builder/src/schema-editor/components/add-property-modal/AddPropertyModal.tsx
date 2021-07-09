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
import {
  processItemInitValue,
  processItemData,
  checkRequired,
} from "../../processor";
import { FieldValidatorItem } from "../field-validator-item/FieldValidatorItem";
import { TypeItem } from "../../components/type-item/TypeItem";
import { RefItem } from "../../components/ref-item/RefItem";

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

  const categoryFormItem = useMemo(
    () => (
      <Form.Item name="origin" initialValue="normal" label="Category">
        <Select onChange={(value) => setNameRequired(value === "normal")}>
          <Select.Option key="normal" value="normal">
            {t(K.SCHEMA_ITEM_NORMAL)}
          </Select.Option>
          <Select.Option key="reference" value="reference">
            {t(K.SCHEMA_ITEM_REF)}
          </Select.Option>
        </Select>
      </Form.Item>
    ),
    [t]
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
          getFieldValue("origin") === "normal" ? (
            <Form.Item
              name="type"
              label="Type"
              rules={[{ required: true }]}
              messageVariables={{ label: "type" }}
            >
              <TypeItem />
            </Form.Item>
          ) : (
            <Form.Item
              name="ref"
              label="Ref"
              rules={[{ validator: checkRequired }]}
              messageVariables={{ label: "ref" }}
            >
              <RefItem />
            </Form.Item>
          )
        }
      </Form.Item>
    ),
    []
  );

  // const typeFormItem = useMemo(
  //   () => (
  //     <Form.Item label="Type">
  //       <Row gutter={8}>
  //         <Col span={8}>
  //           <Form.Item name="origin" initialValue="normal">
  //             <Select onChange={(value) => setNameRequired(value === "normal")}>
  //               <Select.Option key="normal" value="normal">
  //                 {t(K.SCHEMA_ITEM_NORMAL)}
  //               </Select.Option>
  //               <Select.Option key="reference" value="reference">
  //                 {t(K.SCHEMA_ITEM_REF)}
  //               </Select.Option>
  //             </Select>
  //           </Form.Item>
  //         </Col>
  //         <Col span={16}>
  //           <Form.Item
  //             noStyle
  //             shouldUpdate={(prevValues, currentValues) =>
  //               prevValues.origin !== currentValues.origin
  //             }
  //           >
  //             {({ getFieldValue }) =>
  //               getFieldValue("origin") === "normal" ? (
  //                 <Form.Item
  //                   name="type"
  //                   rules={[{ required: true }]}
  //                   messageVariables={{ label: "type" }}
  //                 >
  //                   <TypeItem />
  //                 </Form.Item>
  //               ) : (
  //                 <Form.Item
  //                   name="ref"
  //                   rules={[{ validator: checkRequired }]}
  //                   messageVariables={{ label: "ref" }}
  //                 >
  //                   <RefItem />
  //                 </Form.Item>
  //               )
  //             }
  //           </Form.Item>
  //         </Col>
  //       </Row>
  //     </Form.Item>
  //   ),
  //   [t]
  // );

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
          ) : null)
        }
      </Form.Item>
    ),
    []
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

        {categoryFormItem}
        {typeFormItem}

        <Form.Item name="required" label="Required" valuePropName="checked">
          <Switch />
        </Form.Item>

        {defaultFormItem}

        {enumFormItem}

        {validatorFormItem}

        <Form.Item name="description" label="description">
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
}
