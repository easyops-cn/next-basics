import { getBrickConfig } from "./getBrickConfig";

jest.mock("@next-core/brick-kit", () => ({
  getRuntime: () => ({
    registerCustomProcessor: jest.fn(),
  }),
}));

const slots = [
  {
    description: "内容插槽",
    name: "content",
  },
  {
    description: "右上角操作区插槽，使用时请设置 hasExtraSlot 为 true",
    name: "extra",
  },
  {
    description: "标题后缀的插槽",
    name: "titleSuffix",
  },
];

const properties = [
  {
    default: "-",
    description: "卡片标题",
    name: "cardTitle",
    required: "false",
    type: "string",
  },
  {
    default: "-",
    description:
      "完全透传给 antd 的 Card 属性，详见：[https://ant.design/components/card-cn/#Card](https://ant.design/components/card-cn/#Card)",
    name: "configProps",
    required: "false",
    type: "map",
  },
  {
    default: "false",
    description: "设置该属性后，设置卡片高度为 100%，卡片高度会自动撑满父容器",
    name: "fillVertical",
    required: "false",
    type: "boolean",
  },
  {
    default: "false",
    description: "是否右上角有操作区 slot",
    name: "hasExtraSlot",
    required: "false",
    type: "boolean",
  },
  {
    default: "-",
    description:
      "右上角的操作按钮列表，可自定义指定该按钮的名字，并配置该按钮点击后发出的事件，在 storyboard 去监听该事件传给目标",
    name: "operationButtons",
    required: "false",
    type: "OperationButton[]",
  },
  {
    default: "false",
    description: "设置该属性后，卡片内容区的元素自动垂直居中",
    name: "verticalCenter",
    required: "false",
    type: "boolean",
  },
];

const stories = [
  {
    storyId: "basic-bricks.general-card",
    doc: {
      slots,
      properties,
    },
  },
];

describe("getBrickConfig", () => {
  it("should work", () => {
    expect(getBrickConfig(stories, "basic-bricks.general-card")).toEqual({
      slots,
      properties,
      events: [],
      methods: [],
    });
  });
});
