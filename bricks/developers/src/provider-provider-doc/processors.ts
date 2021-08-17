import * as changeCase from "change-case";
import { get } from "lodash";
import { http } from "@next-core/brick-http";
import {
  ProjectReflection,
  ContainerReflection,
  Reflection,
  DeclarationReflection,
  Type,
  ReflectionType,
  ReferenceType,
  UnionType,
  ArrayType,
  SignatureReflection,
  ParameterReflection,
  IndexedAccessType,
} from "typedoc/dist/lib/serialization/schema";
import { ProcessedProviderDoc } from "./interfaces";

export async function providerDoc(
  serviceId: string,
  brickName: string
): Promise<ProcessedProviderDoc> {
  const separator = "-api-";
  const splitIndex = brickName.indexOf(separator);
  const modelId = brickName.substr(0, splitIndex);
  const apiId = brickName.substr(splitIndex + separator.length);
  const snakeServiceId = changeCase.snakeCase(serviceId);
  const snakeModelId = changeCase.snakeCase(modelId);
  const camelApiId = changeCase.camelCase(apiId);
  const fullApiId = `${changeCase.pascalCase(snakeModelId)}Api_${camelApiId}`;
  const moduleName = `"api/${snakeServiceId}/${snakeModelId}/${camelApiId}.d"`;

  const doc: ProjectReflection = await http.get(
    `bricks/providers-of-${serviceId}/dist/docs.json`
  );

  const references = new Map<string | number, Reflection>();
  traverseReferences(doc, references);

  const refModule = doc.children.find(
    (item) => item.name === moduleName
  ) as ContainerReflection;
  const refVariable = refModule.children.find(
    (item) =>
      item.kindString === "Variable" &&
      // For legacy sdk, the apiId equals to the camelApiId.
      (item.name === fullApiId || item.name === camelApiId)
  ) as DeclarationReflection;
  const tags = getTags(
    get(refVariable, ["comment", "tags"], []) as Record<string, any>[]
  );
  const comment =
    tags["description"] || get(refVariable, ["comment", "shortText"]);
  const endpoint = tags["endpoint"];
  const signature = (
    (refVariable.type as ReflectionType).declaration as DeclarationReflection
  ).signatures[0] as SignatureReflection;
  const parameters = signature.parameters.slice(0, -1);
  const returns = (signature.type as ReferenceType).typeArguments[0];
  const usedReferenceIds = new Set<number>();

  parameters.forEach((item) =>
    traverseUsedReferenceIdsByType(
      (item as ParameterReflection).type,
      usedReferenceIds,
      references
    )
  );
  traverseUsedReferenceIdsByType(returns, usedReferenceIds, references);

  return {
    serviceId,
    brickName,
    comment,
    endpoint,
    parameters,
    returns,
    references,
    usedReferenceIds: Array.from(usedReferenceIds),
  };
}

function getTags(tags: Record<string, any>[]) {
  if (!tags.length) {
    return {};
  }
  return tags.reduce((prev, curr) => {
    prev[curr.tag] = curr.text;

    return prev;
  }, {});
}

function traverseReferences(
  doc: ContainerReflection,
  references: Map<string | number, Reflection>
): void {
  if (Array.isArray((doc as ContainerReflection).children)) {
    for (const child of (doc as ContainerReflection).children) {
      references.set(child.id, child);
      if (
        child.kindString === "Interface" &&
        child.flags.isExported &&
        child.name.substr(0, 5) === "Model"
      ) {
        references.set(child.name, child);
      }
      traverseReferences(child, references);
    }
  }
}

interface TraversableReflection {
  $$traversed?: boolean;
}

function traverseUsedReferenceIdsByType(
  type: Type,
  usedReferenceIds: Set<number>,
  references: Map<string | number, Reflection>
): void {
  if ((type as TraversableReflection).$$traversed) {
    return;
  }
  (type as TraversableReflection).$$traversed = true;
  switch ((type as any).type) {
    case "union":
    case "intersection":
      (type as UnionType).types.forEach((item) =>
        traverseUsedReferenceIdsByType(item, usedReferenceIds, references)
      );
      break;
    case "array":
      traverseUsedReferenceIdsByType(
        (type as ArrayType).elementType,
        usedReferenceIds,
        references
      );
      break;
    case "reference":
      if ((type as ReferenceType).id) {
        usedReferenceIds.add((type as ReferenceType).id);
        traverseUsedReferenceIdsByReflection(
          references.get((type as ReferenceType).id),
          usedReferenceIds,
          references
        );
      } /* istanbul ignore next */ else if (
        (type as ReferenceType).name &&
        references.has((type as ReferenceType).name)
      ) {
        // TODO(steve): hacking for `indexedAccess`, they miss `id` currently.
        const ref = references.get((type as ReferenceType).name);
        (type as ReferenceType).id = ref.id;
        usedReferenceIds.add(ref.id);
        traverseUsedReferenceIdsByReflection(ref, usedReferenceIds, references);
      }
      if (
        (type as ReferenceType).typeArguments &&
        (type as ReferenceType).typeArguments.length > 0
      ) {
        (type as ReferenceType).typeArguments.forEach((item) =>
          traverseUsedReferenceIdsByType(item, usedReferenceIds, references)
        );
      }
      break;
    // TODO(steve): hard to mock
    /* istanbul ignore next */
    case "indexedAccess":
      traverseUsedReferenceIdsByType(
        (type as IndexedAccessType).objectType,
        usedReferenceIds,
        references
      );
      // traverseUsedReferenceIdsByType((type as IndexedAccessType).indexType, usedReferenceIds, references);
      break;
  }
}

function traverseUsedReferenceIdsByReflection(
  reflection: Reflection,
  usedReferenceIds: Set<number>,
  references: Map<string | number, Reflection>
): void {
  if (!reflection) {
    return;
  }
  switch (reflection.kindString) {
    case "Interface":
      (reflection as ContainerReflection).children
        .filter((item) => item.kindString === "Property")
        .forEach((item) =>
          traverseUsedReferenceIdsByType(
            (item as DeclarationReflection).type,
            usedReferenceIds,
            references
          )
        );
      break;
    case "Type alias":
      traverseUsedReferenceIdsByType(
        (reflection as DeclarationReflection).type,
        usedReferenceIds,
        references
      );
      break;
  }
}
