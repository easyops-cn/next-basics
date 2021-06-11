import React from "react";
import { useTranslation } from "react-i18next";
import { Card, Table } from "antd";
import { ColumnProps } from "antd/lib/table";
import { Type } from "typedoc/dist/lib/serialization/schema";
import { ProcessedProviderDoc } from "../provider-provider-doc/interfaces";
import { GeneralType } from "./GeneralType/GeneralType";
import { GeneralReference } from "./GeneralReference/GeneralReference";
import { NS_DEVELOPERS, K } from "../i18n/constants";
import styles from "./ProviderDoc.module.css";
import { ProviderDebugger } from "./ProviderDebugger/ProviderDebugger";

interface ProviderDocProps {
  docData: ProcessedProviderDoc;
  showCard: boolean;
}

const gap = 32;

export function ProviderDoc({
  docData,
  showCard,
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
      <p>{docData.comment}</p>
      <ProviderDebugger providerName={providerName} />
      {docData.endpoint && (
        <>
          <h2 style={{ marginTop: gap }}>{t(K.REQUEST)}</h2>
          <p>{docData.endpoint}</p>
        </>
      )}
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
    <Card title={providerName} bordered={false}>
      {content}
    </Card>
  ) : (
    content
  );
}
