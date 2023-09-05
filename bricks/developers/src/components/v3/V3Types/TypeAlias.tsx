import React from "react";
import { DeclarationTypeAlias } from "./annotation";
import classNames from "classnames";
import style from "./style.module.css";
import { GeneralType } from "./GeneralType";
import { Tag } from "antd";

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
        <p>{typeAliasDeclaration.description}</p>
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
