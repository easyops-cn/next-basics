import { EditorTitleProps } from "./interfaces";

export const titleList: EditorTitleProps[] = [
  { title: "Name" },
  { title: "Required", width: "150px" },
  { title: "Type" },
  { title: "Description" },
  { title: "Setting", width: "100px" },
];

export const innerTypeList = [
  "string",
  "bool",
  "int",
  "int64",
  "float",
  "map",
  "object",
  "file",
];

export const compareMethodList = ["gte", "lte", "gt", "lt"];

export const numberTypeList = ["int", "int64", "float"];
