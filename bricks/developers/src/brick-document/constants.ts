import { TypeDescItem, TypeExtendItem } from "../interfaces";

export const sharedTypeDescList: TypeDescItem[] = [
  {
    type: "CSSProperties",
    description: {
      zh: "`CSSProperties` 包含的样式属性可查看该 [文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference)，需注意文档中的属性需要转为小驼峰命名的方式，具体可 [查看](https://zh-hans.reactjs.org/docs/dom-elements.html#style)",
      en: "See this [document](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference) for the style properties that `CSSProperties` supports. Note that the properties listed there need to be converted to lower camel case, see [here](https://reactjs.org/docs/dom-elements.html#style) for details.",
    },
  },
  {
    type: "ButtonType",
    description: `type ButtonType = "link" | "default" | "primary" | "ghost" | "dashed" | "icon" | "text"`,
  },
  {
    type: "LabelTooltipProps",
    description: {
      zh: `
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
      en: `
    interface LabelTooltipProps {
      // Text content of the tooltip
      content: string;
      // The icon value follows the platform icon settings
      icon: MenuIcon;
      // Style of the tooltip
      style?: React.CSSProperties;
      // Style of the icon
      iconStyle?: React.CSSProperties;
    }
    `,
    },
  },
  {
    type: "HelpBrickProps",
    description: {
      zh: `
    interface HelpBrickProps {
       // 支持自定义组件
       useBrick: UseBrickConf;
       // 所放的位置，目前仅支持右侧和底部显示
       placement?: "right" | "bottom";
       // 组件容器的样式 可通过 top, bottom, left, right 精确调整位置
       containerStyle?: React.CSSProperties;
     }
    `,
      en: `
    interface HelpBrickProps {
       // Custom components are supported
       useBrick: UseBrickConf;
       // Where it is placed, currently only right and bottom are supported
       placement?: "right" | "bottom";
       // Style of the component container, use top, bottom, left and right to position it precisely
       containerStyle?: React.CSSProperties;
     }
    `,
    },
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
    description: {
      zh: `
    interface ValidationRule {
      /** 可通过 validator 进行简单的自定义校验, value 为传出的当前值 */
      validator?: (rule: any, value: any, callback: any,) => any;
    }
    `,
      en: `
    interface ValidationRule {
      /** A simple custom validation can be done with validator, value is the current value passed out */
      validator?: (rule: any, value: any, callback: any,) => any;
    }
    `,
    },
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
