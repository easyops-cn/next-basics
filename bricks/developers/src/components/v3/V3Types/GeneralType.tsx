/* istanbul ignore file temporary */
import React, { createContext, useCallback, useContext } from "react";
import { getHistory } from "@next-core/brick-kit";
import { Annotation } from "./annotation";
import classNames from "classnames";
import styles from "./style.module.css";

export interface GeneralTypeProps {
  annotation: Annotation | undefined;
  signaturePart?: "name" | "type";
  ignoreOptional?: boolean;
}

export const TypeReferencesContext = createContext<string[] | undefined>(
  undefined
);

export function GeneralType({
  annotation,
  signaturePart,
  ignoreOptional,
}: GeneralTypeProps): React.ReactElement {
  const typeReferences = useContext(TypeReferencesContext);

  const getCurHashHref = useCallback(() => {
    const history = getHistory();
    return history.createHref({
      ...history.location,
      hash: undefined,
    });
  }, []);

  if (!annotation) return null;

  switch (annotation.type) {
    case "reference":
      return (
        <>
          <GeneralType annotation={annotation.typeName} />
          <GeneralType annotation={annotation.typeParameters} />
        </>
      );

    case "qualifiedName":
      return (
        <>
          <GeneralType annotation={annotation.left} />.
          <GeneralType annotation={annotation.right} />
        </>
      );

    case "identifier": {
      const hasLink = typeReferences?.includes(annotation.name);
      return (
        <>
          {hasLink ? (
            <a href={`${getCurHashHref()}#${annotation.name}`}>
              {annotation.name}
            </a>
          ) : annotation.annotation ? (
            <>
              {annotation.name}
              {": "}
              <GeneralType annotation={annotation.annotation} />
            </>
          ) : (
            annotation.name
          )}
        </>
      );
    }

    case "typeParameterInstantiation":
    case "typeParameterDeclaration":
      return (
        <>
          {"<"}
          <GeneralTypeList list={annotation.params} />
          {">"}
        </>
      );

    case "typeParameter":
      return (
        <>
          {annotation.name}
          {annotation.constraint && (
            <>
              {" extends "}
              <GeneralType annotation={annotation.constraint} />
            </>
          )}
          {annotation.default && (
            <>
              {" = "}
              <GeneralType annotation={annotation.default} />
            </>
          )}
        </>
      );

    case "propertySignature":
    case "methodSignature":
      if (signaturePart === "name") {
        return (
          <span {...getDeprecatedProps(annotation.deprecated)}>
            {annotation.readonly && (
              <>
                <span className={styles.readonly}>readonly</span>{" "}
              </>
            )}
            {(annotation.kind === "get" || annotation.kind === "set") && (
              <>
                <span className={styles.kind}>{annotation.kind}</span>{" "}
              </>
            )}
            {annotation.computed && "["}
            <GeneralType annotation={annotation.key} />
            {annotation.computed && "]"}
            {annotation.optional && !ignoreOptional && "?"}
          </span>
        );
      }
      return annotation.type === "propertySignature" ? (
        <GeneralType annotation={annotation.annotation} />
      ) : (
        <>
          <GeneralType annotation={annotation.typeParameters} />
          (<GeneralTypeList list={annotation.parameters} />)
          {annotation.annotation && " => "}
          <GeneralType annotation={annotation.annotation} />
        </>
      );

    case "indexSignature":
      if (signaturePart === "name") {
        return (
          <>
            [<GeneralType annotation={annotation.parameter} />]
          </>
        );
      }
      return <GeneralType annotation={annotation.annotation} />;

    case "indexedAccess":
      return (
        <>
          <GeneralType annotation={annotation.objectType} />
          [<GeneralType annotation={annotation.indexType} />]
        </>
      );

    case "union":
    case "intersection":
      return (
        <GeneralTypeList
          list={annotation.types}
          delimiter={annotation.type === "union" ? " | " : " & "}
        />
      );

    case "array":
      return (
        <>
          <GeneralType annotation={annotation.elementType} />
          []
        </>
      );

    case "tuple":
      return (
        <>
          [<GeneralTypeList list={annotation.elementTypes} />]
        </>
      );

    case "namedTupleMember":
      return (
        <>
          {annotation.label}
          {annotation.optional && "?"}
          {": "}
          <GeneralType annotation={annotation.elementType} />
        </>
      );

    case "typeQuery":
      return (
        <>
          {"typeof "}
          <GeneralType annotation={annotation.exprName} />
          <GeneralType annotation={annotation.typeParameters} />
        </>
      );

    case "typeOperator":
      return (
        <>
          {annotation.operator}{" "}
          <GeneralType annotation={annotation.annotation} />
        </>
      );

    case "typeLiteral":
      return (
        <>
          {"{ "}
          {annotation.members.map((member, index, array) => (
            <React.Fragment key={index}>
              <GeneralType annotation={member} signaturePart="name" />
              {": "}
              <GeneralType annotation={member} signaturePart="type" />
              {index < array.length - 1 && "; "}
            </React.Fragment>
          ))}
          {" }"}
        </>
      );

    case "expressionWithTypeArguments":
      return (
        <>
          <GeneralType annotation={annotation.expression} />
          <GeneralType annotation={annotation.typeParameters} />
        </>
      );

    case "function":
      return (
        <>
          <GeneralType annotation={annotation.typeParameters} />
          (<GeneralTypeList list={annotation.parameters} />)
          {annotation.annotation && " => "}
          <GeneralType annotation={annotation.annotation} />
        </>
      );

    case "restElement":
      return (
        <>
          {"..."}
          <GeneralType annotation={annotation.argument} />
          {annotation.annotation && ": "}
          <GeneralType annotation={annotation.annotation} />
        </>
      );

    case "parenthesizedType":
      return (
        <>
          (<GeneralType annotation={annotation.annotation} />)
        </>
      );

    case "conditionalType":
      return (
        <>
          <GeneralType annotation={annotation.checkType} />
          {" extends "}
          <GeneralType annotation={annotation.extendsType} />
          {" ? "}
          <GeneralType annotation={annotation.trueType} />
          {" : "}
          <GeneralType annotation={annotation.falseType} />
        </>
      );

    case "inferType":
      return (
        <>
          infer <GeneralType annotation={annotation.typeParameter} />
        </>
      );

    case "jsLiteral":
      return <>{JSON.stringify(annotation.value)}</>;

    case "keyword":
      return <>{annotation.value}</>;

    case "unsupported":
      return <span className={styles.unsupported}>{annotation.source}</span>;

    default:
      // eslint-disable-next-line no-console
      console.warn("Unhandled annotation type:", annotation.type);
      return null;
  }
}

export function GeneralTypeList({
  list,
  delimiter,
}: {
  list: Annotation[];
  delimiter?: string;
}): React.ReactElement {
  return (
    <>
      {list.map((item, index, array) => (
        <React.Fragment key={index}>
          <GeneralType annotation={item} />
          {index < array.length - 1 && (delimiter ?? ", ")}
        </React.Fragment>
      ))}
    </>
  );
}

function getDeprecatedProps(deprecated: string | boolean | undefined) {
  return {
    className: classNames({ [styles.deprecated]: deprecated }),
    title: typeof deprecated === "string" ? deprecated : null,
  };
}
