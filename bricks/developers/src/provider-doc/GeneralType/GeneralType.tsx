import React from "react";
import {
  Type,
  ReferenceType,
  StringLiteralType,
  ArrayType,
  UnionType,
  IndexedAccessType,
} from "typedoc/dist/lib/serialization/schema";
import { HashLink } from "@next-libs/basic-components";

interface GeneralTypeProps {
  type: Type;
  parentheses?: boolean;
}

export function GeneralType(props: GeneralTypeProps): React.ReactElement {
  switch ((props.type as any).type) {
    case "union":
    case "intersection":
      return (
        <>
          {props.parentheses && "("}
          {(props.type as UnionType).types
            .filter((item) => item.type !== "reflection")
            .map((item, index, array) => (
              <React.Fragment key={index}>
                <GeneralType type={item} />
                {index < array.length - 1
                  ? (props.type as UnionType).type === "union"
                    ? " | "
                    : " & "
                  : null}
              </React.Fragment>
            ))}
          {props.parentheses && ")"}
        </>
      );
    case "intrinsic":
    case "typeParameter":
      return <span>{(props.type as ReferenceType).name}</span>;
    case "stringLiteral":
      return <span>&quot;{(props.type as StringLiteralType).value}&quot;</span>;
    case "reference":
      return (
        <>
          {(props.type as ReferenceType).id ? (
            <HashLink to={`#${(props.type as ReferenceType).name}`}>
              {(props.type as ReferenceType).name}
            </HashLink>
          ) : (
            <span>{(props.type as ReferenceType).name}</span>
          )}
          {(props.type as ReferenceType).typeArguments &&
            (props.type as ReferenceType).typeArguments.length > 0 && (
              <>
                {"<"}
                {(props.type as ReferenceType).typeArguments.map(
                  (item, index) => (
                    <React.Fragment key={index}>
                      <GeneralType type={item} />
                      {index <
                      (props.type as ReferenceType).typeArguments.length - 1
                        ? ", "
                        : null}
                    </React.Fragment>
                  )
                )}
                {">"}
              </>
            )}
        </>
      );
    case "array":
      return (
        <>
          <GeneralType
            type={(props.type as ArrayType).elementType}
            parentheses
          />
          []
        </>
      );
    case "reflection":
      return <span>object</span>;
    case "indexedAccess":
      return (
        <>
          <GeneralType
            type={(props.type as IndexedAccessType).objectType}
            parentheses
          />
          [<GeneralType type={(props.type as IndexedAccessType).indexType} />]
        </>
      );
    default:
      return (props.type as any).type === "unknown" &&
        String(+(props.type as ReferenceType).name) ===
          (props.type as ReferenceType).name ? (
        <span>{(props.type as ReferenceType).name}</span>
      ) : (
        <span style={{ color: "red" }}>{JSON.stringify(props.type)}</span>
      );
  }
}
