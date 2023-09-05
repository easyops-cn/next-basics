import React from "react";
import { DeclarationEnum } from "./annotation";
import classNames from "classnames";
import { GeneralType } from "./GeneralType";
import style from "./style.module.css";
import { Tag } from "antd";

export function V3BrickDocEnums({
  enumDeclaration,
}: {
  enumDeclaration: DeclarationEnum;
}): React.ReactElement {
  return (
    <>
      <h3 className={style.interfaceTitle} id={enumDeclaration.name}>
        {enumDeclaration.name}
        <Tag color="cyan" className={style.badge}>
          Enum
        </Tag>
      </h3>
      <pre>
        <code>
          {enumDeclaration.members.map((item, index) => (
            <React.Fragment key={index}>
              <GeneralType annotation={item.id} />
              {item.initializer && " = "}
              <GeneralType annotation={item.initializer} />
              {",\n"}
            </React.Fragment>
          ))}
        </code>
      </pre>
    </>
  );
}
