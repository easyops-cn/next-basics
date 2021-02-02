import { Story } from "../../../interfaces";
import docMD from "../../../docs/ci/variables-form-item.md";

export const story: Story = {
  storyId: "ci.variables-form-item",
  type: "brick",
  text: {
    en: "CI Variables Editor ",
    zh: "CI 流水线变量编辑器",
  },
  description: {
    en: "",
    zh: "展示编辑流水线变量（模板变量不可编辑）",
  },
  icon: {
    lib: "fa",
    icon: "list-ul",
    prefix: "fas",
  },
  conf: {
    brick: "ci.variables-form-item",
    properties: {
      value: [
        { name: "name1", value: "value1" },
        { name: "name2", value: "value2" },
        { name: "name3", value: "value3" },
      ],
      templateVariables: [
        { name: "name1", value: "value1" },
        { name: "name2", value: "value2" },
      ],
    },
  },
  doc: docMD,
};
