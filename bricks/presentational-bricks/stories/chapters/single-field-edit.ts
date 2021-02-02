import { Story } from "@next-core/brick-types";

export const SingleFieldEditStory: Story = {
  storyId: "presentational-bricks.single-field-edit",
  category: "form-input",
  type: "brick",
  author: "william",
  text: {
    en: "Single Field Edit",
    zh: "单字段编辑",
  },
  description: {
    en: "",
    zh: "",
  },
  icon: {
    lib: "fa",
    icon: "pen",
  },
  conf: {
    brick: "presentational-bricks.single-field-edit",
    properties: {
      modalTitle: "title",
      label: "label",
      type: "textarea",
      initialValue: "value",
      placeholder: "placeholder",
      rules: [
        {
          required: true,
        },
      ],
    },
    events: {
      "single-field-edit.ok": {
        action: "console.info",
      },
      "single-field-edit.cancel": {
        action: "console.info",
      },
    },
  },
  actions: [
    {
      text: "open()",
      method: "open",
    },
  ],
};
