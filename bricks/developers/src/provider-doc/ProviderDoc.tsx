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

interface ProviderDocProps {
  docData: ProcessedProviderDoc;
  showCard: boolean;
}

const gap = 32;

export function ProviderDoc(props: ProviderDocProps): React.ReactElement {
  const { t } = useTranslation(NS_DEVELOPERS);

  if (!props.docData) {
    return null;
  }
  const columns: ColumnProps<any>[] = [
    {
      title: t(K.NAME),
      dataIndex: "name",
      className: styles.code,
      width: "20%",
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
      dataIndex: ["comment", "shortText"],
    },
  ];

  const content = (
    <>
      <p>{props.docData.comment}</p>
      {props.docData.endpoint && (
        <>
          <h2 style={{ marginTop: gap }}>{t(K.REQUEST)}</h2>
          <p>{props.docData.endpoint}</p>
        </>
      )}
      <h2 style={{ marginTop: gap }}>{t(K.PARAMETERS)}</h2>
      {props.docData.parameters.length > 0 ? (
        <Table
          dataSource={props.docData.parameters}
          rowKey="name"
          columns={columns}
          pagination={false}
        ></Table>
      ) : (
        <p>{t(K.NONE)}</p>
      )}
      <h2 style={{ marginTop: gap }}>{t(K.RETURNS)}</h2>
      <code>
        <GeneralType type={props.docData.returns} />
      </code>
      <h2 style={{ marginTop: gap }}>{t(K.TYPE_REFERENCES)}</h2>
      {props.docData.usedReferenceIds.length > 0 ? (
        props.docData.usedReferenceIds.map((id) => (
          <GeneralReference
            key={id}
            reference={props.docData.references.get(id)}
          />
        ))
      ) : (
        <p>{t(K.NONE)}</p>
      )}
    </>
  );

  return props.showCard ? (
    <Card
      title={`providers-of-${props.docData.serviceId}.${props.docData.brickName}`}
      bordered={false}
    >
      {content}
    </Card>
  ) : (
    content
  );
}
