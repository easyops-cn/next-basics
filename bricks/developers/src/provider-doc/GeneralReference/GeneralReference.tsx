import React from "react";
import { Table } from "antd";
import { useTranslation } from "react-i18next";
import { get } from "lodash";
import {
  Type,
  Reflection,
  ContainerReflection,
  DeclarationReflection,
} from "typedoc/dist/lib/serialization/schema";
import { GeneralType } from "../GeneralType/GeneralType";
import { NS_DEVELOPERS, K } from "../../i18n/constants";
import styles from "../ProviderDoc.module.css";

const gap = 32;

interface GeneralReferenceProps {
  reference: Reflection;
}

export function GeneralReference(
  props: GeneralReferenceProps
): React.ReactElement {
  const { t } = useTranslation(NS_DEVELOPERS);

  let body: React.ReactNode;
  switch (props.reference.kindString) {
    case "Interface":
      body = (
        <Table
          dataSource={(props.reference as ContainerReflection).children.filter(
            (item) => item.kindString === "Property"
          )}
          rowKey="name"
          columns={[
            {
              title: t(K.FIELD),
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
            // Do not show `required` flags for models, since it's not accurate.
            ...(get(
              props.reference as ContainerReflection,
              ["sources", 0, "fileName"],
              ""
            ).startsWith("model/")
              ? []
              : [
                  {
                    title: t(K.REQUIRED),
                    dataIndex: ["flags", "isOptional"],
                    width: "10%",
                    render: (optional: boolean) => (optional ? "-" : "✔️"),
                  },
                ]),
            {
              title: t(K.DESCRIPTION),
              dataIndex: ["comment", "shortText"],
            },
          ]}
          pagination={false}
          style={{ marginBottom: gap }}
        ></Table>
      );
      break;
    case "Type alias":
      body = (
        <pre style={{ marginBottom: gap }}>
          <code>
            {"= "}
            <GeneralType
              type={(props.reference as DeclarationReflection).type}
            />
          </code>
        </pre>
      );
      break;
    default:
      body = (
        <pre style={{ color: "red", marginBottom: gap }}>
          <code>{JSON.stringify(props.reference, null, 2)}</code>
        </pre>
      );
  }

  const typeParameter = (props.reference as any).typeParameter;
  return (
    <div>
      <a id={props.reference.name} className={styles.anchor}></a>
      <h3>
        <code>
          {props.reference.name}
          {typeParameter &&
            typeParameter.length > 0 &&
            `<${typeParameter.map((item: any) => item.name).join(", ")}>`}
        </code>
      </h3>
      {body}
    </div>
  );
}
