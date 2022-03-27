import React from "react";
import { EditorTitleProps, EditorOfContext } from "./interfaces";
import i18next from "i18next";
import { K, NS_FLOW_BUILDER } from "../i18n/constants";

export const titleList: EditorTitleProps[] = [
  { title: i18next.t(`${NS_FLOW_BUILDER}:${K.NAME_LABEL}`), key: "name" },
  {
    title: i18next.t(`${NS_FLOW_BUILDER}:${K.REQUIRED_LABEL}`),
    width: "150px",
    key: "required",
  },
  { title: i18next.t(`${NS_FLOW_BUILDER}:${K.TYPE_LABEL}`), key: "label" },
  {
    title: i18next.t(`${NS_FLOW_BUILDER}:${K.DESCRIPTION_LABEL}`),
    key: "description",
  },
  {
    title: i18next.t(`${NS_FLOW_BUILDER}:${K.SETTING_LABEL}`),
    width: "100px",
    key: "setting",
  },
];

export const innerTypeList = [
  "string",
  "bool",
  "int",
  "int64",
  "float",
  "map",
  "object",
  "value",
  "file",
];

export const rootTraceId = "root";

export const compareMethodList = ["gte", "lte", "gt", "lt"];

export const numberTypeList = ["int", "int64", "float"];

export const EditorContext = React.createContext<EditorOfContext>({});
