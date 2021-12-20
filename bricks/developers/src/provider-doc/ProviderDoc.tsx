import React from "react";
import { useTranslation } from "react-i18next";
import { Card, Table, Typography, Select } from "antd";
import { ColumnProps } from "antd/lib/table";
import { Type } from "typedoc/dist/lib/serialization/schema";
import { ProcessedProviderDoc } from "../provider-provider-doc/interfaces";
import { GeneralType } from "./GeneralType/GeneralType";
import { GeneralReference } from "./GeneralReference/GeneralReference";
import { NS_DEVELOPERS, K } from "../i18n/constants";
import styles from "./ProviderDoc.module.css";
import { ProviderDebugger } from "./ProviderDebugger/ProviderDebugger";
import { ProviderSample } from "./ProviderSample/ProviderSample";

interface ProviderDocProps {
  docData: ProcessedProviderDoc;
  showCard?: boolean;
  docKey?: string;
  debuggerPanelExpand?: boolean;
  onDebuggerExpand?: (flag: boolean) => void;
}

const gap = 32;

export function ProviderDoc({
  docKey,
  docData,
  showCard,
  debuggerPanelExpand,
  onDebuggerExpand,
}: ProviderDocProps): React.ReactElement {
  const { t } = useTranslation(NS_DEVELOPERS);

  if (!docData) {
    return null;
  }

  const providerName = `providers-of-${docData.serviceId}.${docData.brickName}`;

  const columns: ColumnProps<any>[] = [
    {
      title: t(K.PARAMETER_INDEX),
      key: "index",
      className: styles.code,
      width: "20%",
      render(value, record, index) {
        return index;
      },
    },
    {
      title: t(K.TYPE),
      dataIndex: "type",
      className: styles.code,
      width: "30%",
      render: function renderGeneralType(type: Type): React.ReactNode {
        return <GeneralType type={type} />;
      },
    },
    {
      title: t(K.REQUIRED),
      dataIndex: ["flags", "isOptional"],
      width: "10%",
      render: (optional: boolean) => (optional ? "-" : "✔️"),
    },
    {
      title: t(K.DESCRIPTION),
      dataIndex: "name",
    },
  ];

  const content = (
    <>
      <ProviderDebugger
        key={docKey}
        providerName={providerName}
        debuggerPanelExpand={debuggerPanelExpand}
        onDebuggerExpand={onDebuggerExpand}
      />
      <h2 style={{ marginTop: gap }}>{t(K.BASIC_INFO)}</h2>
      <dl className={styles.basicInfo}>
        <dt>provider:</dt>
        <dd>
          <Typography.Paragraph copyable className={styles.paragraph}>
            {providerName}
          </Typography.Paragraph>
        </dd>
        {docData.endpoint && (
          <>
            <dt>{t(K.ENDPOINT_METHOD)}</dt>
            <dd>{docData.endpoint.split(/\s+/)[0]}</dd>
            <dt>{t(K.ENDPOINT_URL)}</dt>
            <dd>
              <Typography.Paragraph copyable className={styles.paragraph}>
                {docData.endpoint.split(/\s+/)[1]}
              </Typography.Paragraph>
            </dd>
          </>
        )}
      </dl>
      <h2 style={{ marginTop: gap }}>{t(K.PARAMETERS)}</h2>
      {docData.parameters.length > 0 ? (
        <Table
          dataSource={docData.parameters}
          rowKey="name"
          columns={columns}
          pagination={false}
        ></Table>
      ) : (
        <p>{t(K.NONE)}</p>
      )}
      <h2 style={{ marginTop: gap }}>{t(K.RETURNS)}</h2>
      <code>
        <GeneralType type={docData.returns} />
      </code>
      {docData.examples && (
        <>
          <h2 style={{ marginTop: gap }}>{t(K.SAMPLE_LIST)}</h2>
          <ProviderSample
            key={docKey}
            endpoint={docData.endpoint}
            examples={docData.examples}
          ></ProviderSample>
        </>
      )}
      <h2 style={{ marginTop: gap }}>{t(K.TYPE_REFERENCES)}</h2>
      {docData.usedReferenceIds.length > 0 ? (
        docData.usedReferenceIds.map((id) => (
          <GeneralReference key={id} reference={docData.references.get(id)} />
        ))
      ) : (
        <p>{t(K.NONE)}</p>
      )}
    </>
  );

  return showCard ? (
    <Card title={docData.comment} bordered={false}>
      {content}
    </Card>
  ) : (
    content
  );
}
