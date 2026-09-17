import React, { useMemo } from "react";
import { Annotation, Declaration } from "../V3Types/annotation";
import { GeneralType, TypeReferencesContext } from "../V3Types/GeneralType";
import { i18nText } from "@next-core/brick-kit";

/** 双语 description 对象按当前语言取值；字符串原样返回。 */
const localized = (value: any): any =>
  value && typeof value === "object" ? i18nText(value) : value;

export interface ProviderParam {
  name: string;
  description?: string;
  annotation?: Annotation;
  isRestElement?: boolean;
}

export interface V3ProviderParamsProps {
  params?: ProviderParam[];
  types: Declaration[];
}

export function V3ProviderParams({
  params,
  types,
}: V3ProviderParamsProps): React.ReactElement {
  const typeReferences = useMemo(
    () => types?.map((item) => item.name) || [],
    [types]
  );

  return (
    <>
      <h2>Parameters</h2>
      {!params?.length ? (
        <p>None</p>
      ) : (
        <TypeReferencesContext.Provider value={typeReferences}>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Description</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {params.map((param, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <code>
                      {param.isRestElement && "..."}
                      {param.name}
                    </code>
                  </td>
                  <td>{localized(param.description)}</td>
                  <td>
                    <GeneralType annotation={param.annotation} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </TypeReferencesContext.Provider>
      )}
    </>
  );
}
