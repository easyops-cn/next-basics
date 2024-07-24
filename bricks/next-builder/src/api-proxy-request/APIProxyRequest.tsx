import React, { useCallback, useRef, useState } from "react";
import styles from "./index.module.css";
import { Input, Select } from "antd";
import {
  CustomActionComponent,
  CustomActionItem,
  CustomActionRef,
} from "./CustomActionComponent";
import { RequestBodyComponent } from "./RequestBodyComponent";
import { FormItemWrapper, FormItemWrapperProps } from "@next-libs/forms";
import { isNil } from "lodash";
import i18next from "i18next";
import { K, NS_NEXT_BUILDER } from "../i18n/constants";

function getUrlParams(url: string): Record<string, any> {
  const urlStr = url.split("?")[1];
  const urlSearchParams = new URLSearchParams(urlStr);
  const result = Object.fromEntries(urlSearchParams.entries());
  return result;
}

interface APIProxyRequestProps {
  value: {
    useProvider: string;
    args: Record<string, any>;
  };
  onChange: (v: any) => void;
}

export function APIProxyRequest(
  props: APIProxyRequestProps
): React.ReactElement {
  const [url, setUrl] = useState<string>(props.value?.args?.url);
  const [params, setParams] = useState<Record<string, any>>(
    props.value?.args?.queryParameters
  );
  const requestBodyRef = useRef<CustomActionRef>();

  const handleChange = useCallback(
    (value: any): void => {
      const newValue = {
        ...props.value?.args,
        ...value,
        ...(value.headers
          ? {
              headers: {
                ...(props.value?.args?.headers ?? {}),
                ...value.headers,
              },
            }
          : {}),
      };

      props.onChange?.(newValue);
    },
    [props]
  );

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    const params = getUrlParams(value);

    setParams(params);
    setUrl(value);

    handleChange({
      url: value,
    });
  };

  const handleParamsChange = useCallback(
    (list: Omit<CustomActionItem, "$key">[]): void => {
      const param = new URLSearchParams(
        list.map((item) => [item.key ?? "", item.value ?? ""])
      );
      const newUrl = (url ?? "").split("?")?.[0] + "?" + param.toString();
      setUrl(newUrl);

      const queryParameters = Object.fromEntries(
        list.map((item) => [item.key, item.value])
      );

      handleChange({
        url: newUrl,
        queryParameters,
      });
    },
    [handleChange, url]
  );

  const handleTypeChange = (type: string): void => {
    const value =
      type === "JSON"
        ? "application/json"
        : type === "Form Data"
        ? "multipart/form-data"
        : "None";
    const headers = {
      "content-type": value,
    };
    requestBodyRef.current.addItem({
      key: "content-type",
      value,
    });

    handleChange({
      headers,
    });
  };

  return (
    <div>
      <div className={styles.methodWrapper}>
        <Select
          defaultValue="GET"
          value={props.value?.args?.method}
          className={styles.methodSelect}
          options={["GET", "POST", "PUT", "DELETE"].map((item) => ({
            label: item,
            value: item,
          }))}
          onChange={(v) =>
            handleChange({
              method: v,
            })
          }
        />
        <Input value={url} onChange={handleUrlChange} />
      </div>
      <CustomActionComponent
        params={params}
        value={props.value?.args?.queryParameters}
        label="查询参数"
        onChange={handleParamsChange}
      />
      <CustomActionComponent
        label="请求头"
        ref={requestBodyRef}
        value={props.value?.args?.headers}
        onChange={(v) =>
          handleChange({
            headers: Object.fromEntries(
              v.map((item) => [item.key, item.value])
            ),
          })
        }
      />
      <RequestBodyComponent
        label="请求体"
        headers={props.value?.args?.headers}
        value={props.value?.args?.body}
        onChange={handleChange}
        onTypeChange={handleTypeChange}
      />
    </div>
  );
}

function checkAPIRule(_rule: any, value: any, callback: any): void {
  if (isNil(value)) {
    callback(i18next.t(`${NS_NEXT_BUILDER}:${K.EMPTY_VALIDATE_MESSAGE}`));
  } else {
    if (!value?.args.url) {
      callback(i18next.t(`${NS_NEXT_BUILDER}:${K.HTTP_VALIDATE_MESSAGE}`));
    } else if (typeof value?.args?.body === "string") {
      try {
        JSON.parse(value.args.body);
        callback();
      } catch {
        callback(i18next.t(`${NS_NEXT_BUILDER}:${K.DATA_ERROR}`));
      }
    } else {
      callback();
    }
  }
}

export type APIProxyRequestLegacyWrapperProps = FormItemWrapperProps &
  APIProxyRequestProps;

export function APIProxyRequestLegacyWrapper(
  props: APIProxyRequestLegacyWrapperProps
): React.ReactElement {
  return (
    <FormItemWrapper {...props} validator={checkAPIRule}>
      <APIProxyRequest {...props} />
    </FormItemWrapper>
  );
}
