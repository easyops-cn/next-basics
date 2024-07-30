// istanbul ignore file
// Ignore tests temporarily
import React, {
  forwardRef,
  useMemo,
  useImperativeHandle,
  useCallback,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { useCurrentTheme, getRuntime } from "@next-core/brick-kit";
import { copyToClipboard } from "@next-libs/clipboard";
import { InstanceApi_postSearch } from "@next-sdk/cmdb-sdk";
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
  message,
} from "antd";
import { FileSearchOutlined } from "@ant-design/icons";
import { ColProps } from "antd/lib/col";
import { RadioChangeEvent } from "antd/lib/radio";
import {
  builtinActions,
  hasCallbackActions,
  recommendActionIds,
} from "../shared/visual-events/constants";
import { GeneralIcon, Link } from "@next-libs/basic-components";
import {
  HandlerType,
  LifeCycle,
  BuiltinAction,
  CustomBrickEventType,
  Workflow,
} from "../shared/visual-events/interfaces";
import { isNil, debounce } from "lodash";
import { getActionOptions } from "../shared/visual-events/getActionOptions";
import { ApiRequestFormItem } from "../api-request-form-item/ApiRequestFormItem";

export interface EventConfigFormProps {
  labelCol?: ColProps;
  wrapperCol?: ColProps;
  providerList?: string[];
  useInCustomTemplate?: boolean;
  type: "event" | "lifeCycle";
  pathList?: string[];
  segueList?: { label: string; value: string }[];
  docUrl?: string;
  mockTipsUrl?: string;
  lifeCycle?: LifeCycle;
  workflowList?: Workflow[];
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
    mockTipsUrl,
    lifeCycle,
    pathList,
    segueList,
    workflowList,
    useInCustomTemplate,
    highlightTokens,
    onClickHighlightToken,
  } = props;
  const [form] = Form.useForm();
  const [flowType, setFlowType] = useState<string>("flowApi");

  const setFiledsValue = (value: any): void => {
    // console.log(value);
    setFlowType(value.flow?.type ?? "flowApi");
    form.setFieldsValue(value);
  };

  useImperativeHandle(
    ref,
    () => ({
      setFieldsValue: setFiledsValue,
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
          <Radio value={HandlerType.Conditional}>
            {t(K.EVENTS_HANLDER_CONDITIONAL)}
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
                    <FileSearchOutlined style={{ lineHeight: "32px" }} />
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
                <Radio.Button value="workflow">{t(K.WORKFLOW)}</Radio.Button>
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
            </Form.Item>
          )
        }
      </Form.Item>
    ),
    [providerList, inlineFormItemStyle]
  );

  const mockTipsItem = useMemo(
    () => (
      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) =>
          prevValues.handlerType !== currentValues.handlerType ||
          prevValues.providerType !== currentValues.providerType
        }
      >
        {({ getFieldValue }) =>
          getFieldValue("handlerType") === HandlerType.UseProvider && (
            <Form.Item
              style={{
                color: "var(--color-disabled-text)",
                margin: "-26px 0 0 0",
              }}
              colon={false}
              label=" "
            >
              <span>{t(K.MOCK_TIPS_PREFIX)}</span>
              <span>
                <Link
                  onClick={async () => {
                    const flowApiFullName = getFieldValue(
                      getFieldValue("providerType")
                    ) as string;
                    if (flowApiFullName) {
                      const base_url = getRuntime()
                        .getBasePath()
                        .replace(/\/$/, "");
                      const url =
                        base_url +
                        mockTipsUrl +
                        "?q=" +
                        flowApiFullName.split(":")?.[0];
                      window.open(url, "_blank");
                    }
                  }}
                >
                  Mock
                </Link>
                <GeneralIcon
                  icon={{ lib: "fa", icon: "external-link-alt" }}
                  style={{ marginLeft: "6px" }}
                />
              </span>
              <span>{t(K.MOCK_TIPS_SUFFIX)}</span>
            </Form.Item>
          )
        }
      </Form.Item>
    ),
    [t, inlineFormItemStyle]
  );

  const contractTooltip = useMemo(
    () => (
      <Tooltip title={t(K.LINK_TO_CONTRACT_CENTER)}>
        <Link
          onClick={async () => {
            const base_url = getRuntime().getBasePath().replace(/\/$/, "");
            const flowApiFullName = form.getFieldValue(
              form.getFieldValue("providerType")
            );
            if (!flowApiFullName) {
              return;
            }
            const resp = await InstanceApi_postSearch(
              "FLOW_BUILDER_API_CONTRACT@EASYOPS",
              {
                fields: { namespaceId: true, name: true },
                page: 1,
                page_size: 10,
                query: {
                  namespaceId: flowApiFullName.split("@")[0],
                  name: flowApiFullName.split("@")[1]?.split(":")?.[0],
                  version: flowApiFullName.split("@")[1]?.split(":")?.[1],
                },
              }
            );
            let url = base_url + "/contract-center";
            if (resp.list?.length === 1) {
              url = url + "/contracts/" + resp.list[0].instanceId;
            }
            window.open(url, "_blank");
          }}
        >
          <GeneralIcon
            icon={{ lib: "antd", icon: "file-text" }}
            style={{ lineHeight: "32px" }}
          />
        </Link>
      </Tooltip>
    ),
    [t]
  );

  const copyFlowApi = useMemo(
    () => (
      <Tooltip title={t(K.COPY)}>
        <Link
          onClick={() => {
            const flowApiFullName =
              (form.getFieldValue("flow") as string) || "";
            const result = copyToClipboard(flowApiFullName);
            if (result) {
              message.success(t(K.COPY_SUCCESS));
            } else {
              message.error(t(K.COPY_FAILED));
            }
          }}
        >
          <GeneralIcon
            icon={{ lib: "antd", icon: "copy" }}
            style={{ lineHeight: "32px", marginRight: "6px" }}
          />
        </Link>
      </Tooltip>
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
                  ...inlineFormItemStyle,
                  ...{ width: "calc(100% - 44px)" },
                }}
              >
                {/* <ContractAutoComplete /> */}
                <ApiRequestFormItem
                  typeChange={(v: string) => setFlowType(v)}
                />
              </Form.Item>
              {copyFlowApi}
              {contractTooltip}
            </Form.Item>
          )
        }
      </Form.Item>
    ),
    [inlineFormItemStyle, contractTooltip]
  );

  const workflowItem = useMemo(
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
          getFieldValue("providerType") === "workflow" && (
            <Form.Item label="Workflow" required>
              <Form.Item
                name="workflow"
                rules={[{ required: true }]}
                messageVariables={{ label: "workflow" }}
                style={inlineFormItemStyle}
              >
                <Select>
                  {workflowList?.map((item) => (
                    <Select.Option key={item.value} value={item.value}>
                      {item.label}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              {contractTooltip}
            </Form.Item>
          )
        }
      </Form.Item>
    ),
    [inlineFormItemStyle, contractTooltip, workflowList]
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
                CustomBrickEventType.ExecuteMethod)) &&
          flowType === "flowApi" && (
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
    [t, getCodeEditorItem, flowType]
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
        {mockTipsItem}
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
      {workflowItem}
      {mockTipsItem}
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
