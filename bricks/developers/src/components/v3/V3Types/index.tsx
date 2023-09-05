import React, { useMemo } from "react";
import { Declaration } from "./annotation";
import { V3BrickDocInterface } from "./Interface";
import { V3BrickDocTypeAlias } from "./TypeAlias";
import { V3BrickDocEnums } from "./Enum";
import { TypeReferencesContext } from "./GeneralType";

const sortInfo = {
  interface: 1,
  typeAlias: 2,
  enum: 3,
};

export function V3BrickDocTypes({
  types,
}: {
  types: Declaration[];
}): JSX.Element {
  const typeReferences = useMemo(
    () => types?.map((item) => item.name),
    [types]
  );

  if (!types?.length) return;

  return (
    <>
      <h1>Type references</h1>
      <TypeReferencesContext.Provider value={typeReferences}>
        {types
          .sort((a, b) => {
            return sortInfo[a.type] - sortInfo[b.type];
          })
          .map((annotation, index) => {
            switch (annotation.type) {
              case "interface":
                return (
                  <V3BrickDocInterface
                    key={index}
                    interfaceDeclaration={annotation}
                  />
                );
              case "typeAlias":
                return (
                  <V3BrickDocTypeAlias
                    key={index}
                    typeAliasDeclaration={annotation}
                  />
                );
              case "enum":
                return (
                  <V3BrickDocEnums key={index} enumDeclaration={annotation} />
                );
            }
          })}
      </TypeReferencesContext.Provider>
    </>
  );
}
