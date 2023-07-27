import { TypeDescItem } from "../interfaces";
import { isEmpty } from "lodash";
import {
  StoryDocType,
  StoryDoc,
  StoryDocInterfaceProperty,
  StoryDocInterface,
} from "@next-core/brick-types";
import { sharedTypeDescList } from "./constants";

export function collectSharedTypeList(doc: StoryDoc | null): TypeDescItem[] {
  const typeSet: Set<TypeDescItem> = new Set();

  doc?.properties?.forEach((item) => {
    sharedTypeDescList.forEach((row) => {
      if (item.type.includes(row.type)) {
        typeSet.add(row);
      }
    });
  });

  doc?.interface?.forEach((item) => {
    sharedTypeDescList.forEach((row) => {
      const children = (item as StoryDocInterface).children;
      if (!isEmpty(children) && item.kind === "interface") {
        children.forEach((c) => {
          if ((c as StoryDocInterfaceProperty).type.includes(row.type)) {
            typeSet.add(row);
          }
        });
      } else {
        if ((item as StoryDocType).type?.includes(row.type)) {
          typeSet.add(row);
        }
      }
    });
  });

  return Array.from(typeSet);
}
