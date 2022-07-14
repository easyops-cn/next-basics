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
  {
    type: "LabelTooltipProps",
    description: `
    interface LabelTooltipProps {
      // tooltip 的文本内容
      content: string;
      // 图标设值跟平台图标设置一致
      icon: MenuIcon;
      // tooltip 的样式设置
      style?: React.CSSProperties;
      // 图标的样式设置
      iconStyle?: React.CSSProperties;
    }
    `,
  },
  {
    type: "HelpBrickProps",
    description: `
    interface HelpBrickProps {
       // 支持自定义组件
       useBrick: UseBrickConf;
       // 所放的位置，目前仅支持右侧和底部显示
       placement?: "right" | "bottom";
       // 组件容器的样式 可通过 top, bottom, left, right 精确调整位置
       containerStyle?: React.CSSProperties;
     }
    `,
  },
  {
    type: "LabelBrick",
    description: `
    interface LabelBrick {
      useBrick: UseBrickConf;
    }
    `,
  },
  {
    type: "GeneralOption",
    description: `
    type GeneralOption =
      | string
      | number
      | boolean
      | {label: string; value: string | number | boolean}
      | Record<string, any>;
    `,
  },
  {
    type: "ColProps",
    description: `
      type ColSpanType = number | string;

      interface ColSize {
        span?: ColSpanType;
        offset?: ColSpanType;
      }

      interface ColProps {
        span?: ColSpanType;
        offset?: ColSpanType;
        xs?: ColSpanType | ColSize;
        sm?: ColSpanType | ColSize;
        md?: ColSpanType | ColSize;
        lg?: ColSpanType | ColSize;
        xl?: ColSpanType | ColSize;
        xxl?: ColSpanType | ColSize;
      }
    `,
  },
  {
    type: "ValidationRule",
    description: `
    interface ValidationRule {
      /** 可通过 validator 进行简单的自定义校验, value 为传出的当前值 */
      validator?: (rule: any, value: any, callback: any,) => any;
    }
    `,
  },
  {
    type: "GeneralComplexOption",
    description: `
    interface GeneralComplexOption<T = string | number | boolean> {
      label: string;
      value: T;
  }
    `,
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
  {
    type: "EasyopsEmptyProps",
    url: "/next-docs/docs/api-reference/brick-kit.easyopsemptyprops#easyopsemptyprops-interface",
  },
];
