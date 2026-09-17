import React from "react";
import { DeclarationInterface } from "./annotation";
import { GeneralType, GeneralTypeList } from "./GeneralType";
import classNames from "classnames";
import style from "./style.module.css";
import { Tag } from "antd";
import { i18nText } from "@next-core/brick-kit";

/** 双语 description 对象按当前语言取值；字符串原样返回。 */
const localized = (value: any): any =>
  value && typeof value === "object" ? i18nText(value) : value;

export function V3BrickDocInterface({
  interfaceDeclaration,
}: {
  interfaceDeclaration: DeclarationInterface;
}): React.ReactElement {
  return (
    <>
      <h3 className={style.interfaceTitle} id={interfaceDeclaration.name}>
        <span>{interfaceDeclaration.name}</span>
        <Tag color="cyan" className={style.badge}>
          Interface
        </Tag>
      </h3>
      {(interfaceDeclaration.extends?.length ||
        interfaceDeclaration.typeParameters) && (
        <pre>
          <code>
            <GeneralType annotation={interfaceDeclaration.typeParameters} />
            {interfaceDeclaration.extends?.length && (
              <>
                {interfaceDeclaration.typeParameters && " "}
                {"extends "}
                <GeneralTypeList list={interfaceDeclaration.extends} />
              </>
            )}
          </code>
        </pre>
      )}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Required</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {interfaceDeclaration.body.map((item, index) => (
            <tr key={index}>
              <td>
                <GeneralType
                  annotation={item}
                  signaturePart="name"
                  ignoreOptional
                />
              </td>
              <td>
                <GeneralType annotation={item} signaturePart="type" />
              </td>
              <td style={{ textAlign: "center" }}>
                {item.type === "indexSignature" || item.optional ? "" : "✅"}
              </td>
              <td>{localized(item.description)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
