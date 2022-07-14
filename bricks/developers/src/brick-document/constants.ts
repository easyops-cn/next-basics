import { TypeDescItem, TypeExtendItem } from "../interfaces";

export const sharedTypeDescList: TypeDescItem[] = [
  {
    type: "CSSProperties",
    description:
      "`CSSProperties` 包含的样式属性可查看该 [文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference)，需注意文档中的属性需要转为小驼峰命名的方式，具体可 [查看](https://zh-hans.reactjs.org/docs/dom-elements.html#style)",
  },
  {
    type: "ButtonType",
    description: `type ButtonType = "link" | "default" | "primary" | "ghost" | "dashed" | "icon" | "text"`,
  },
];

export const sharedTypeExtendLink: TypeExtendItem[] = [
  {
    type: "MenuIcon",
    url: "/next-docs/docs/api-reference/brick-types.menuicon#menuicon-interfacef",
  },
  {
    type: "UseBrickConf",
    url: "/next-docs/docs/micro-app/brick-use-brick",
  },
  {
    type: "MenuConf",
    url: "/next-docs/docs/api-reference/brick-types.menuconf",
  },
];
