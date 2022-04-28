// istanbul ignore file
// Ignore tests temporarily
import React, {
  forwardRef,
  useMemo,
  useImperativeHandle,
  useCallback,
} from "react";
import { useTranslation } from "react-i18next";
import { useCurrentTheme } from "@next-core/brick-kit";
import { FormInstance, FormProps } from "antd/lib/form";
import { NS_NEXT_BUILDER, K } from "../i18n/constants";
import {
  CodeEditorItem,
  HighlightTokenSettings,
} from "@next-libs/code-editor-components";
import {
  Form,
  Radio,
  AutoComplete,
  Tooltip,
  Input,
  Select,
  Switch,
} from "antd";
import { FileSearchOutlined } from "@ant-design/icons";
import { ColProps } from "antd/lib/col";
import { RadioChangeEvent } from "antd/lib/radio";
import {
  builtinActions,
  hasCallbackActions,
  recommendActionIds,
} from "../shared/visual-events/constants";
import { Link } from "@next-libs/basic-components";
import {
  HandlerType,
  LifeCycle,
  BuiltinAction,
  CustomBrickEventType,
} from "../shared/visual-events/interfaces";
import { isNil, debounce } from "lodash";
import { getActionOptions } from "../shared/visual-events/getActionOptions";
import { ContractAutoComplete } from "../shared/components/contract-auto-complete/ContractAutoComplete";

export interface EventConfigFormProps {
  labelCol?: ColProps;
  wrapperCol?: ColProps;
  providerList?: string[];
  useInCustomTemplate?: boolean;
  type: "event" | "lifeCycle";
  pathList?: string[];
  segueList?: { label: string; value: string }[];
  docUrl?: string;
  lifeCycle?: LifeCycle;
  highlightTokens?: HighlightTokenSettings[];
  onValuesChange?: FormProps["onValuesChange"];
  onClickHighlightToken?: (token: { type: string; value: string }) => void;
}

export function LegacyEventConfigForm(
  props: EventConfigFormProps,
  ref: React.Ref<Partial<FormInstance>>
): React.ReactElement {
  const { t } = useTranslation(NS_NEXT_BUILDER);
  const theme = useCurrentTheme();
  const {
    labelCol,
    wrapperCol,
    onValuesChange,
    providerList,
    type,
    docUrl,
    lifeCycle,
    pathList,
    segueList,
    useInCustomTemplate,
    highlightTokens,
    onClickHighlightToken,
  } = props;
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

  const debounceHandleChange = useMemo(
    () => debounce(onValuesChange, 600),
    [onValuesChange]
  );

  const inlineFormItemStyle = useMemo(
    () => ({
      display: "inline-block",
      width: "calc(100% - 20px)",
      margin: "0 6px 0 0",
    }),
    []
  );

  const getCodeEditorItem = useCallback(
    (options = {}): React.ReactNode => {
      return (
        <CodeEditorItem
          tabSize={2}
          minLines={6}
          maxLines="Infinity"
          printMargin={false}
          showLineNumbers={true}
          theme={theme === "dark-v2" ? "monokai" : "tomorrow"}
          enableLiveAutocompletion={true}
          mode="brick_next_yaml"
          highlightTokens={highlightTokens}
          onClickHighlightToken={onClickHighlightToken}
          {...options}
        ></CodeEditorItem>
      );
    },
    [highlightTokens, onClickHighlightToken, theme]
  );

  const HandleTypeChange = useCallback(
    (e: RadioChangeEvent): void => {
      const type = e.target.value;
      if (
        type === HandlerType.UseProvider &&
        isNil(form.getFieldValue("providerType"))
      ) {
        form.setFieldsValue({ providerType: "provider" });
      }
    },
    [form]
  );

  const handlerTypeItem = useMemo(
    () => (
      <Form.Item
        hidden={lifeCycle === LifeCycle.UseResolves}
        name="handlerType"
        label={t(K.HANDLE_TYPE_LABEL)}
        rules={[{ required: true }]}
      >
        <Radio.Group onChange={HandleTypeChange}>
          <Radio value={HandlerType.BuiltinAction}>
            {t(K.EVENTS_HANDLER_BUILTIN_ACTION)}
          </Radio>
          <Radio value={HandlerType.UseProvider}>
            {t(K.EVENTS_HANDLER_USE_PROVIDER)}
          </Radio>
          <Radio value={HandlerType.CustomBrick}>
            {t(K.EVENTS_CUSTOM_BRICK_INTERACTION)}
          </Radio>
        </Radio.Group>
      </Form.Item>
    ),
    [t, HandleTypeChange, lifeCycle]
  );

  const ifItem = useMemo(
    () => (
      <Form.Item name="if" label={t(K.IF_LABEL)}>
        {getCodeEditorItem({
          minLines: 3,
          schemaRef: "#/definitions/UseProviderResolveConf/properties/if",
        })}
      </Form.Item>
    ),
    [t, getCodeEditorItem]
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
            <Form.Item label={t(K.SELECT_ACTION_LABEL)} required>
              <Form.Item
                name="action"
                messageVariables={{ label: "action" }}
                rules={[{ required: true }]}
                style={docUrl && inlineFormItemStyle}
              >
                <AutoComplete
                  options={getActionOptions(builtinActions, recommendActionIds)}
                  filterOption={(inputValue, option) =>
                    option?.options?.some(
                      (item: BuiltinAction) =>
                        item.value
                          .toUpperCase()
                          .indexOf(inputValue.toUpperCase()) !== -1
                    )
                  }
                ></AutoComplete>
              </Form.Item>
              {docUrl && (
                <Tooltip title={t(K.LINK_TO_NEXT_DOCS)}>
                  <Link target="_blank" href={docUrl}>
                    <FileSearchOutlined />
                  </Link>
                </Tooltip>
              )}
            </Form.Item>
          )
        }
      </Form.Item>
    ),
    [t, inlineFormItemStyle, docUrl]
  );

  const segueIdItem = useMemo(
    () => (
      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) =>
          prevValues.handlerType !== currentValues.handlerType ||
          prevValues.action !== currentValues.action
        }
      >
        {({ getFieldValue }) =>
          getFieldValue("handlerType") === HandlerType.BuiltinAction &&
          getFieldValue("action") === "segue.push" && (
            <Form.Item
              name="segueId"
              label={t(K.SEGUE_ID_ITEM_LABEL)}
              rules={[{ required: true }]}
            >
              <AutoComplete
                options={segueList?.map((item) => ({
                  value: item.value,
                  label: (
                    <div style={{ display: "flex", gap: 8 }} title={item.label}>
                      <span>{item.value}</span>
                      <span
                        title={item.label}
                        style={{
                          fontSize: 12,
                          color: "rgba(137, 137, 137, 0.8)",
                        }}
                      >
                        [to: {item.label}]
                      </span>
                    </div>
                  ),
                }))}
                filterOption={(inputValue, option) =>
                  option?.value
                    .toUpperCase()
                    .indexOf(inputValue.toUpperCase()) !== -1
                }
              />
            </Form.Item>
          )
        }
      </Form.Item>
    ),
    [t, segueList]
  );

  const historyPathItem = useMemo(
    () => (
      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) =>
          prevValues.handlerType !== currentValues.handlerType ||
          prevValues.action !== currentValues.action
        }
      >
        {({ getFieldValue }) =>
          getFieldValue("handlerType") === HandlerType.BuiltinAction &&
          getFieldValue("action") === "history.push" && (
            <Form.Item
              name="path"
              label={t(K.HISTORY_PATH_ITEM_LABEL)}
              tooltip={t(K.HISTORY_PATH_ITEM_TOOLTIP)}
              rules={[{ required: true }]}
            >
              <AutoComplete
                options={pathList?.map((path) => ({ value: path }))}
                filterOption={(inputValue, option) =>
                  option?.value
                    .toUpperCase()
                    .indexOf(inputValue.toUpperCase()) !== -1
                }
              />
            </Form.Item>
          )
        }
      </Form.Item>
    ),
    [pathList, t]
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
              label={t(K.PROVIDER_TYPE_LABEL)}
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
                style={inlineFormItemStyle}
              >
                <AutoComplete
                  options={providerList?.map((provider) => ({
                    value: provider,
                  }))}
                  filterOption={(inputValue, option) =>
                    option?.value
                      .toUpperCase()
                      .indexOf(inputValue.toUpperCase()) !== -1
                  }
                ></AutoComplete>
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
    [providerList, t, inlineFormItemStyle]
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
                style={inlineFormItemStyle}
              >
                <ContractAutoComplete />
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
    [t, inlineFormItemStyle]
  );

  const useProviderMethod = useMemo(
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
              label={t(K.METHOD)}
              name="useProviderMethod"
              initialValue="resolve"
            >
              <Radio.Group>
                <Radio value="resolve">resolve</Radio>
                <Radio value="saveAs">saveAs</Radio>
              </Radio.Group>
            </Form.Item>
          )
        }
      </Form.Item>
    ),
    [t]
  );

  const pollEnabledItem = useMemo(
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
              label={t(K.POLLING_LABEL)}
              name="pollEnabled"
              valuePropName="checked"
            >
              <Switch></Switch>
            </Form.Item>
          )
        }
      </Form.Item>
    ),
    [t]
  );

  const pollItem = useMemo(
    () => (
      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) =>
          prevValues.handlerType !== currentValues.handlerType ||
          prevValues.pollingEnabled !== currentValues.handlerType
        }
      >
        {({ getFieldValue }) =>
          getFieldValue("handlerType") === HandlerType.UseProvider &&
          getFieldValue("pollEnabled") && (
            <Form.Item name="poll" wrapperCol={{ offset: labelCol.span }}>
              {getCodeEditorItem({
                placeholder: t(K.POLLING_ITEM_PLACEHOLDER),
              })}
            </Form.Item>
          )
        }
      </Form.Item>
    ),
    [getCodeEditorItem, labelCol, t]
  );

  const callbackItem = useMemo(
    () => (
      <Form.Item
        noStyle
        // only hidden but Still Collect field value
        hidden={true}
        shouldUpdate={(prevValues, currentValues) =>
          prevValues.handlerType !== currentValues.handlerType ||
          prevValues.action !== currentValues.action ||
          prevValues.brickEventType !== currentValues.brickEventType
        }
      >
        {({ getFieldValue }) =>
          (getFieldValue("handlerType") === HandlerType.UseProvider ||
            (getFieldValue("handlerType") === HandlerType.CustomBrick &&
              getFieldValue("brickEventType") ===
                CustomBrickEventType.ExecuteMethod) ||
            hasCallbackActions.includes(getFieldValue("action"))) && (
            <Form.Item name="callback" label={t(K.CALLBACK_LABEL)}>
              {getCodeEditorItem()}
            </Form.Item>
          )
        }
      </Form.Item>
    ),
    [t, getCodeEditorItem]
  );

  const brickInteractionItem = useMemo(
    () => (
      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) =>
          prevValues.handlerType !== currentValues.handlerType
        }
      >
        {({ getFieldValue }) =>
          getFieldValue("handlerType") === HandlerType.CustomBrick && (
            <Form.Item
              initialValue={CustomBrickEventType.SetProps}
              name="brickEventType"
              label={t(K.BRICK_EVENT_LABEL)}
            >
              <Radio.Group>
                <Radio.Button value={CustomBrickEventType.SetProps}>
                  {t(K.CUSTOM_EVENTS_SET_PROP)}
                </Radio.Button>
                <Radio.Button value={CustomBrickEventType.ExecuteMethod}>
                  {t(K.CUSTOM_EVENTS_USE_METHOD)}
                </Radio.Button>
              </Radio.Group>
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
          getFieldValue("handlerType") === HandlerType.CustomBrick && (
            <Form.Item label={t(K.BRICK_SELECTOR_LABEL)} required>
              <Input.Group compact>
                <Form.Item
                  name="selectorType"
                  noStyle
                  initialValue={useInCustomTemplate ? "targetRef" : "target"}
                >
                  <Select style={{ width: "105px" }}>
                    {useInCustomTemplate && (
                      <Select.Option value="targetRef">targetRef</Select.Option>
                    )}
                    <Select.Option value="target">target</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  name="brickSelector"
                  noStyle
                  rules={[{ required: true }]}
                  messageVariables={{ label: "brickSelector" }}
                >
                  <AutoComplete
                    style={{ width: "calc(100% - 105px)" }}
                  ></AutoComplete>
                </Form.Item>
              </Input.Group>
            </Form.Item>
          )
        }
      </Form.Item>
    ),
    [useInCustomTemplate, t]
  );

  const brickMethodItem = useMemo(
    () => (
      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) =>
          prevValues.handlerType !== currentValues.handlerType ||
          prevValues.brickEventType !== currentValues.brickEventType
        }
      >
        {({ getFieldValue }) =>
          getFieldValue("handlerType") === HandlerType.CustomBrick &&
          getFieldValue("brickEventType") ===
            CustomBrickEventType.ExecuteMethod && (
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
          prevValues.handlerType !== currentValues.handlerType ||
          prevValues.brickEventType !== currentValues.brickEventType
        }
      >
        {({ getFieldValue }) =>
          ([HandlerType.UseProvider, HandlerType.BuiltinAction].includes(
            getFieldValue("handlerType")
          ) ||
            (getFieldValue("handlerType") === HandlerType.CustomBrick &&
              getFieldValue("brickEventType") ===
                CustomBrickEventType.ExecuteMethod)) && (
            <Form.Item name="args" label={t(K.ARGS_LABEL)}>
              {getCodeEditorItem({
                schemaRef:
                  "#/definitions/UseProviderResolveConf/properties/args",
              })}
            </Form.Item>
          )
        }
      </Form.Item>
    ),
    [t, getCodeEditorItem]
  );

  const propertiesItem = useMemo(
    () => (
      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) =>
          prevValues.handlerType !== currentValues.handlerType ||
          prevValues.brickEventType !== currentValues.brickEventType
        }
      >
        {({ getFieldValue }) =>
          getFieldValue("handlerType") === HandlerType.CustomBrick &&
          getFieldValue("brickEventType") === CustomBrickEventType.SetProps && (
            <Form.Item name="properties" label={t(K.PROPERTIES_LABEL)}>
              {getCodeEditorItem()}
            </Form.Item>
          )
        }
      </Form.Item>
    ),
    [t, getCodeEditorItem]
  );

  const useResolvesItem = useMemo(
    () => (
      <>
        {handlerTypeItem}
        {ifItem}
        {providerTypeItem}
        {providerItem}
        {flowApiItem}
        {argsItem}
        <Form.Item noStyle>
          <Form.Item name="transform" label={t(K.TRANSFORM_LABEL)}>
            {getCodeEditorItem()}
          </Form.Item>
          <Form.Item
            name="transformFrom"
            label={t(K.TRANSFORM_FROM_LABEL)}
            tooltip={t(K.TRANSFORM_FROM_TOOLTIP)}
          >
            {getCodeEditorItem({ minLines: 3, mode: "text" })}
          </Form.Item>
          <Form.Item
            name="transformMapArray"
            label={t(K.TRANSFORM_MAP_ARRAY)}
            tooltip={t(K.TRANSFORM_MAP_ARRAY_TOOLTIP)}
            initialValue="auto"
          >
            <Radio.Group>
              <Radio value="auto"> auto </Radio>
              <Radio value={true}> true </Radio>
              <Radio value={false}> false </Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item name="onReject" label={t(K.REJECT_LABEL)}>
            {getCodeEditorItem()}
          </Form.Item>
        </Form.Item>
      </>
    ),
    [
      argsItem,
      flowApiItem,
      handlerTypeItem,
      ifItem,
      providerItem,
      providerTypeItem,
      getCodeEditorItem,
      t,
    ]
  );

  const allEventTypeItem = (
    <>
      {handlerTypeItem}
      {providerTypeItem}
      {brickInteractionItem}
      {ifItem}
      {actionItem}
      {segueIdItem}
      {historyPathItem}
      {providerItem}
      {flowApiItem}
      {useProviderMethod}
      {brickItem}
      {brickMethodItem}
      {argsItem}
      {propertiesItem}
      {pollEnabledItem}
      {pollItem}
      {callbackItem}
    </>
  );

  const getFormItem = (
    type: string,
    lifeCycle?: string
  ): React.ReactElement => {
    if (type === "lifeCycle" && lifeCycle === LifeCycle.UseResolves) {
      return useResolvesItem;
    } else {
      return allEventTypeItem;
    }
  };

  return (
    <Form
      name="eventConfigForm"
      form={form}
      labelCol={labelCol}
      wrapperCol={wrapperCol}
      onValuesChange={debounceHandleChange}
    >
      {getFormItem(type, lifeCycle)}
    </Form>
  );
}

export const EventConfigForm = forwardRef(LegacyEventConfigForm);
