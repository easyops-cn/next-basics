import React, { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { NS_DEVELOPERS, K } from "../../i18n/constants";
import { i18nText } from "@next-core/brick-kit";
import { ExampleItem } from "../../provider-provider-doc/interfaces";
import { Select, Popover, message } from "antd";
import { Clipboard } from "@next-libs/clipboard";
import { ProfileOutlined } from "@ant-design/icons";
import styles from "./ProviderSample.module.css";

export interface ProviderSampleProps {
  examples?: ExampleItem[];
  endpoint?: string;
}

const overlayInnerWidth = 300;

export function ProviderSample(props: ProviderSampleProps): React.ReactElement {
  const { t } = useTranslation(NS_DEVELOPERS);
  const [curIndex, setCurIndex] = useState(0);

  const { examples = [], endpoint } = props;

  const getHeaderInfo = useCallback(
    (headers: Record<string, string> = {}): React.ReactElement => {
      return (
        <dl>
          {Object.entries(headers).map(([key, value]) => (
            <>
              <dt>{key}:</dt>
              <dd>{value}</dd>
            </>
          ))}
        </dl>
      );
    },
    []
  );

  const request = useMemo(
    () => examples[curIndex]?.request,
    [examples, curIndex]
  );

  const response = useMemo(
    () => examples[curIndex]?.response,
    [examples, curIndex]
  );

  const handlerChange = (value: number): void => {
    setCurIndex(value);
  };

  const renderContent = (content: string): React.ReactElement => {
    return (
      <div className={styles.terminalWrapper}>
        <pre className={styles.terminal}>
          <code>{content}</code>
          <div className={styles.toolbar}>
            <span className={styles.copyIcon}>
              <Clipboard
                text={content}
                icon={{ theme: "outlined" }}
                onCopy={() => message.success(t(K.COPY_SUCCESS))}
              />
            </span>
          </div>
        </pre>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      {renderContent(
        request?.method && request?.uri
          ? `${request.method} ${request.uri}`
          : endpoint
      )}
      <Select
        onChange={handlerChange}
        value={curIndex}
        style={{ width: 300 }}
        getPopupContainer={(triggerNode) => triggerNode.parentElement}
      >
        {examples?.map((item, index) => (
          <Select.Option key={index} value={index}>
            {i18nText(item.description)}
          </Select.Option>
        ))}
      </Select>

      {request?.body && (
        <div>
          <h4 className={styles.title}>
            {t(K.REQUEST_SAMPLE)}{" "}
            <Popover
              overlayClassName={styles.customPopoverOverlay}
              overlayInnerStyle={{ minWidth: overlayInnerWidth }}
              title={<span className={styles.header}>Request Headers</span>}
              content={getHeaderInfo(request.headers)}
            >
              <ProfileOutlined />
            </Popover>
          </h4>
          {renderContent(request.body)}
        </div>
      )}

      {response?.body && (
        <div>
          <h4 className={styles.title}>
            {t(K.RESPONSE_SAMPLE)}{" "}
            <Popover
              overlayClassName={styles.customPopoverOverlay}
              overlayInnerStyle={{ minWidth: overlayInnerWidth }}
              title={<span className={styles.header}>Response Headers</span>}
              content={getHeaderInfo(response.headers)}
            >
              <ProfileOutlined />
            </Popover>
          </h4>
          {renderContent(response.body)}
        </div>
      )}
    </div>
  );
}
