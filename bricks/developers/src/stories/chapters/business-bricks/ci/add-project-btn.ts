import { Story } from "../../../interfaces";
import docMD from "../../../docs/ci/add-project-btn.md";

export const story: Story = {
  storyId: "ci.add-project-btn",
  type: "brick",
  text: {
    en: "Add CI Project",
    zh: "添加CI项目",
  },
  description: {
    en: "",
    zh: "根据git代码仓库（首选默认的），将对应仓库的代码项目添加到CI",
  },
  icon: {
    lib: "antd",
    icon: "folder-add",
    theme: "filled",
  },
  conf: {
    brick: "ci.add-project-btn",
    properties: {
      icon: "plus",
      btnText: "添加项目",
    },
    events: {
      "project.create": {
        action: "console.log",
      },
    },
  },
  doc: docMD,
};
