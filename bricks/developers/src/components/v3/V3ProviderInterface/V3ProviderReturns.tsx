import React, { useMemo } from "react";
import { Annotation, Declaration } from "../V3Types/annotation";
import { GeneralType, TypeReferencesContext } from "../V3Types/GeneralType";

export interface V3ProviderReturnsProps {
  returns?: {
    annotation: Annotation;
  };
  types: Declaration[];
}

export function V3ProviderReturns({
  returns,
  types,
}: V3ProviderReturnsProps): React.ReactElement {
  const typeReferences = useMemo(
    () => types?.map((item) => item.name) || [],
    [types]
  );

  return (
    <>
      <h2>Returns</h2>
      <TypeReferencesContext.Provider value={typeReferences}>
        <GeneralType annotation={returns.annotation} />
      </TypeReferencesContext.Provider>
    </>
  );
}
