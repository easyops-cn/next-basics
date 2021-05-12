import { Story } from "../../../interfaces";
import docMD from "../../../docs/basic-providers/no-op.md";

export const story: Story = {
  storyId: "basic-providers.provider-no-op",
  type: "brick",
  author: "steve",
  text: {
    en: "No-op Provider",
    zh: "无操作 Provider",
  },
  description: {
    en: "A provider which does no operations.",
    zh: "一个不做任何操作的 provider 构件。",
  },
  conf: [
    {
      description: {
        title: "使用已定义好的 context 数据",
      },
      brick: "div",
      lifeCycle: {
        useResolves: [
          {
            useProvider: "basic-providers.provider-no-op",
            transform: {
              textContent: '<% CTX.myAsyncData ?? "No context was found." %>',
            },
          },
        ],
      },
    },
  ],
  doc: docMD,
};
