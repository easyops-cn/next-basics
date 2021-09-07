import React, { forwardRef, useMemo, useImperativeHandle } from "react";
import { useTranslation } from "react-i18next";
import { FormInstance, FormProps } from "antd/lib/form";
import { NS_NEXT_BUILDER, K } from "../i18n/constants";
import { CodeEditorItem } from "@next-libs/editor-components";
import { Form, Radio, AutoComplete, Tooltip } from "antd";
import { FileSearchOutlined } from "@ant-design/icons";
import { ColProps } from "antd/lib/col";
import { buildtinActions } from "../shared/visual-events/constants";
import { Link } from "@next-libs/basic-components";
import { HandlerType } from "../shared/visual-events/interfaces";

export interface EventConfigForm {
  labelCol?: ColProps;
  wrapperCol?: ColProps;
  onValuesChange?: FormProps["onValuesChange"];
}

export function LegacyEventConfigForm(
  props: EventConfigForm,
  ref: React.Ref<Partial<FormInstance>>
): React.ReactElement {
  const { t } = useTranslation(NS_NEXT_BUILDER);
  const { labelCol, wrapperCol, onValuesChange } = props;
  const [form] = Form.useForm();

  useImperativeHandle(
    ref,
    () => ({
      setFieldsValue: form.setFieldsValue,
      resetFields: form.resetFields,
      validateFields: form.validateFields,
    }),
    [form]
  );

  const getCodeEditorItem = (options = {}): React.ReactNode => {
    return (
      <CodeEditorItem
        tabSize={2}
        minLines={6}
        maxLines="Infinity"
        printMargin={false}
        showLineNumbers={true}
        theme="tomorrow"
        enableLiveAutocompletion={true}
        mode="brick_next_yaml"
        {...options}
      ></CodeEditorItem>
    );
  };

  const handlerTypeItem = useMemo(
    () => (
      <Form.Item
        name="handlerType"
        label={t(K.HANDLE_TYPE_LABEL)}
        rules={[{ required: true }]}
      >
        <Radio.Group>
          <Radio value={HandlerType.BuiltinAction}>
            {t(K.EVENTS_HANDLER_BUILTIN_ACTION)}
          </Radio>
          <Radio value={HandlerType.UseProvider}>
            {t(K.EVENTS_HANDLER_USE_PROVIDER)}
          </Radio>
          <Radio value={HandlerType.SetPorps}>
            {t(K.EVENTS_HANDLER_SET_PROP)}
          </Radio>
          <Radio value={HandlerType.ExectuteMethod}>
            {t(K.EVENTS_HANDLER_USE_METHOD)}
          </Radio>
        </Radio.Group>
      </Form.Item>
    ),
    [t]
  );

  const ifItem = useMemo(
    () => (
      <Form.Item name="if" label={t(K.IF_LABEL)}>
        {getCodeEditorItem({
          showLineNumbers: false,
          minLines: 3,
          schemaRef: "#/definitions/UseProviderResolveConf/properties/if",
        })}
      </Form.Item>
    ),
    [t]
  );

  const actionItem = useMemo(
    () => (
      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) =>
          prevValues.handlerType !== currentValues.handlerType
        }
      >
        {({ getFieldValue }) =>
          getFieldValue("handlerType") === HandlerType.BuiltinAction && (
            <Form.Item
              name="action"
              label={t(K.SELECT_ACTION_LABEL)}
              rules={[{ required: true }]}
            >
              <AutoComplete
                options={buildtinActions?.map((action) => ({ value: action }))}
                filterOption={(inputValue, option) =>
                  option?.value
                    .toUpperCase()
                    .indexOf(inputValue.toUpperCase()) !== -1
                }
              ></AutoComplete>
            </Form.Item>
          )
        }
      </Form.Item>
    ),
    [t]
  );

  const providerTypeItem = useMemo(
    () => (
      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) =>
          prevValues.handlerType !== currentValues.handlerType
        }
      >
        {({ getFieldValue }) =>
          getFieldValue("handlerType") === HandlerType.UseProvider && (
            <Form.Item
              name="providerType"
              label={t(K.PROVIDER_TYPLE_LABEL)}
              rules={[{ required: true }]}
            >
              <Radio.Group>
                <Radio.Button value="provider">
                  {t(K.BUILTIN_PROVIDER)}
                </Radio.Button>
                <Radio.Button value="flow">{t(K.FLOW_API)}</Radio.Button>
              </Radio.Group>
            </Form.Item>
          )
        }
      </Form.Item>
    ),
    [t]
  );

  const providerItem = useMemo(
    () => (
      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) =>
          prevValues.handlerType !== currentValues.handlerType ||
          prevValues.providerType !== currentValues.providerType
        }
      >
        {({ getFieldValue }) =>
          getFieldValue("handlerType") === HandlerType.UseProvider &&
          getFieldValue("providerType") === "provider" && (
            <Form.Item label="Provider" required>
              <Form.Item
                name="provider"
                rules={[{ required: true }]}
                messageVariables={{ label: "provider" }}
                style={{
                  display: "inline-block",
                  width: "calc(100% - 20px)",
                  margin: "0 6px 0 0",
                }}
              >
                <AutoComplete></AutoComplete>
              </Form.Item>
              <Tooltip title={t(K.LINK_TO_DEVELOPER_PROVIDER_DOC)}>
                <Link target="_blank" to="/developers/providers">
                  <FileSearchOutlined />
                </Link>
              </Tooltip>
            </Form.Item>
          )
        }
      </Form.Item>
    ),
    [t]
  );

  const flowApiItem = useMemo(
    () => (
      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) =>
          prevValues.handlerType !== currentValues.handlerType ||
          prevValues.providerType !== currentValues.providerType
        }
      >
        {({ getFieldValue }) =>
          getFieldValue("handlerType") === HandlerType.UseProvider &&
          getFieldValue("providerType") === "flow" && (
            <Form.Item label="Flow" required>
              <Form.Item
                name="flow"
                rules={[{ required: true }]}
                messageVariables={{ label: "flow" }}
                style={{
                  display: "inline-block",
                  width: "calc(100% - 20px)",
                  margin: "0 6px 0 0",
                }}
              >
                <AutoComplete></AutoComplete>
              </Form.Item>
              <Tooltip title={t(K.LINK_TO_FLOWER_BUILDER)}>
                <Link target="_blank" to="/flow-builder">
                  <FileSearchOutlined />
                </Link>
              </Tooltip>
            </Form.Item>
          )
        }
      </Form.Item>
    ),
    [t]
  );

  const callbackItem = useMemo(
    () => (
      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) =>
          prevValues.handlerType !== currentValues.handlerType
        }
      >
        {({ getFieldValue }) =>
          getFieldValue("handlerType") === HandlerType.UseProvider && (
            <Form.Item name="callback" label={t(K.CALLBACK_LABEL)}>
              {getCodeEditorItem()}
            </Form.Item>
          )
        }
      </Form.Item>
    ),
    [t]
  );

  const brickItem = useMemo(
    () => (
      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) =>
          prevValues.handlerType !== currentValues.handlerType
        }
      >
        {({ getFieldValue }) =>
          [HandlerType.SetPorps, HandlerType.ExectuteMethod].includes(
            getFieldValue("handlerType")
          ) && (
            <Form.Item
              name="brickSelector"
              label={t(K.BRICK_SELECTOR_LABEL)}
              rules={[{ required: true }]}
            >
              <AutoComplete></AutoComplete>
            </Form.Item>
          )
        }
      </Form.Item>
    ),
    [t]
  );

  const brickMethodItem = useMemo(
    () => (
      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) =>
          prevValues.handlerType !== currentValues.handlerType
        }
      >
        {({ getFieldValue }) =>
          getFieldValue("handlerType") === HandlerType.ExectuteMethod && (
            <Form.Item
              name="method"
              label={t(K.USE_METHOD_LABEL)}
              rules={[{ required: true }]}
            >
              <AutoComplete></AutoComplete>
            </Form.Item>
          )
        }
      </Form.Item>
    ),
    [t]
  );

  const argsItem = useMemo(
    () => (
      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) =>
          prevValues.handlerType !== currentValues.handlerType
        }
      >
        {({ getFieldValue }) =>
          [
            HandlerType.UseProvider,
            HandlerType.BuiltinAction,
            HandlerType.ExectuteMethod,
          ].includes(getFieldValue("handlerType")) && (
            <Form.Item
              name="args"
              label={t(K.ARGS_LABEL)}
              rules={[{ required: true }]}
            >
              {getCodeEditorItem({
                schemaRef:
                  "#/definitions/UseProviderResolveConf/properties/args",
              })}
            </Form.Item>
          )
        }
      </Form.Item>
    ),
    [t]
  );

  const propertiesItem = useMemo(
    () => (
      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) =>
          prevValues.handlerType !== currentValues.handlerType
        }
      >
        {({ getFieldValue }) =>
          getFieldValue("handlerType") === HandlerType.SetPorps && (
            <Form.Item name="properties" label={t(K.PROPERTIES_LABEL)}>
              {getCodeEditorItem()}
            </Form.Item>
          )
        }
      </Form.Item>
    ),
    [t]
  );

  return (
    <Form
      name="eventConfigForm"
      form={form}
      labelCol={labelCol}
      wrapperCol={wrapperCol}
      onValuesChange={onValuesChange}
    >
      {handlerTypeItem}
      {ifItem}
      {actionItem}
      {providerTypeItem}
      {providerItem}
      {flowApiItem}
      {brickItem}
      {brickMethodItem}
      {argsItem}
      {propertiesItem}
      {callbackItem}
    </Form>
  );
}

export const EventConfigForm = forwardRef(LegacyEventConfigForm);
