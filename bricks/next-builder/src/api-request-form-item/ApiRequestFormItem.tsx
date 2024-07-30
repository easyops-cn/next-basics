import React, { useCallback, useEffect, useRef, useState } from "react";
import { Tabs } from "antd";
import {
  ContractAutoComplete,
  isContractApi,
} from "../shared/components/contract-auto-complete/ContractAutoComplete";
import { FormItemWrapper } from "@next-libs/forms";
import { ApiRequestValue } from "./index";
import { isNil } from "lodash";
import i18next from "i18next";
import { K, NS_NEXT_BUILDER } from "../i18n/constants";
import { APIProxyRequest } from "../api-proxy-request/APIProxyRequest";

interface ApiRequestFormItemProps {
  value?: ApiRequestValue;
  typeChange?: (type: string) => void;
  onChange?: (value: ApiRequestValue) => void;
}

export function ApiRequestFormItem(
  props: ApiRequestFormItemProps
): React.ReactElement {
  const [tab, setTab] = useState<"flowApi" | "http">();
  const apiDataCacheRef = useRef<any>(
    props.value?.type === "flowApi" ? props.value : { useProvider: "" }
  );
  const httpDataCacheRef = useRef<any>(
    props.value?.type === "flowApi" ? props.value : { useProvider: "" }
  );

  const handleChange = useCallback(
    (value: any) => {
      const newValue = {
        type: tab,
        params: {
          useProvider: tab === "http" ? "basic.http-proxy-request" : value,
          args:
            tab === "http"
              ? [
                  {
                    ...props.value?.params?.args?.[0],
                    ...value,
                    ...(value.headers
                      ? {
                          headers: {
                            ...(props.value?.params?.args?.headers ?? {}),
                            ...value.headers,
                          },
                        }
                      : {}),
                  },
                ]
              : null,
        },
      };
      props.onChange?.(newValue);

      return newValue;
    },
    [props, tab]
  );

  const handleAPIChange = useCallback(
    (value: string) => {
      const newValue = handleChange(value);
      apiDataCacheRef.current = newValue;
    },
    [handleChange]
  );

  const handleHttpChange = useCallback(
    (value: any) => {
      const newValue = handleChange(value);
      httpDataCacheRef.current = newValue;
    },
    [handleChange]
  );

  const handleTabChange = useCallback(
    (_tab: string): void => {
      const tab = _tab as "flowApi" | "http";
      setTab(tab);
      props?.typeChange?.(tab);

      props.onChange({
        type: tab,
        params:
          tab === "flowApi"
            ? apiDataCacheRef.current?.params ?? {
                useProvider: "",
              }
            : httpDataCacheRef.current?.params,
      });
    },
    [props]
  );

  useEffect(() => {
    if (props.value?.type) setTab(props.value?.type);
  }, [props.value?.type]);

  return (
    <Tabs size="small" activeKey={tab} onChange={handleTabChange}>
      <Tabs.TabPane tab="API集市" key="flowApi">
        <ContractAutoComplete
          value={
            props.value?.type === "flowApi"
              ? props.value.params.useProvider
              : ""
          }
          onChange={handleAPIChange}
        />
      </Tabs.TabPane>
      <Tabs.TabPane tab="手动填写" key="http">
        <APIProxyRequest
          value={
            props.value?.type === "http" ? props.value?.params?.args?.[0] : {}
          }
          onChange={handleHttpChange}
        />
      </Tabs.TabPane>
    </Tabs>
  );
}

export function checkContractRule(
  _rule: any,
  value: ApiRequestValue,
  callback: any
): void {
  if (isNil(value)) {
    callback(i18next.t(`${NS_NEXT_BUILDER}:${K.EMPTY_VALIDATE_MESSAGE}`));
  } else if (
    value?.type === "flowApi" &&
    !isContractApi(value?.params?.useProvider)
  ) {
    callback(i18next.t(`${NS_NEXT_BUILDER}:${K.CONTRACT_VALIDATE_MESSAGE}`));
  } else if (value?.type === "http") {
    if (!value?.params?.args?.[0]?.url) {
      callback(i18next.t(`${NS_NEXT_BUILDER}:${K.HTTP_VALIDATE_MESSAGE}`));
    } else if (value?.params?.args?.[0]?.body === false) {
      callback(i18next.t(`${NS_NEXT_BUILDER}:${K.DATA_ERROR}`));
    } else {
      callback();
    }
  } else {
    callback();
  }
}

export function ApiRequestLegacyWrapper(props: any): React.ReactElement {
  return (
    <FormItemWrapper {...props} validator={checkContractRule}>
      <ApiRequestFormItem {...props} />
    </FormItemWrapper>
  );
}
