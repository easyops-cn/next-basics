import React from "react";
import { DeclarationTypeAlias } from "./annotation";
import classNames from "classnames";
import style from "./style.module.css";
import { GeneralType } from "./GeneralType";
import { Tag } from "antd";
import { i18nText } from "@next-core/brick-kit";

/** 双语 description 对象按当前语言取值；字符串原样返回。 */
const localized = (value: any): any =>
  value && typeof value === "object" ? i18nText(value) : value;

export function V3BrickDocTypeAlias({
  typeAliasDeclaration,
}: {
  typeAliasDeclaration: DeclarationTypeAlias;
}): React.ReactElement {
  return (
    <>
      <h3 className={style.interfaceTitle} id={typeAliasDeclaration.name}>
        <span>{typeAliasDeclaration.name}</span>
        <Tag color="cyan" className={style.badge}>
          Type
        </Tag>
      </h3>
      {typeAliasDeclaration.description && (
        <p>{localized(typeAliasDeclaration.description)}</p>
      )}
      <pre>
        <code>
          <GeneralType annotation={typeAliasDeclaration.typeParameters} />
          {typeAliasDeclaration.typeParameters && " "}
          <GeneralType annotation={typeAliasDeclaration.annotation} />
        </code>
      </pre>
    </>
  );
}
