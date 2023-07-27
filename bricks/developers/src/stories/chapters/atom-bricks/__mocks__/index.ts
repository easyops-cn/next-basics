import { Chapter } from "@next-core/brick-types";

export const atomBook: Chapter[] = [
  {
    title: {
      en: "Fake Chapter en 1",
      zh: "Fake Chapter zh 1",
    },
    stories: [
      {
        storyId: "fake-story-of-correct",
        type: "brick",
        text: {
          en: "Fake Story of Correct En",
          zh: "Fake Story of Correct Zh",
        },
        conf: {
          brick: "fake-brick-of-correct",
          properties: {
            for: "good",
          },
          events: {
            ok: {
              action: "console.log",
            },
          },
        },
        description: {
          en: "Fake description of Correct En",
          zh: "Fake description of Correct Zh",
        },
        tags: [
          {
            en: "en",
            zh: "zh",
          },
        ],
        actions: [
          {
            text: "testAction()",
            method: "setAttribute",
            args: ["title", "modified"],
          },
          {
            text: "testPrompt()",
            method: "setAttribute",
            prompt: true,
          },
        ],
      },
      {
        storyId: "fake-story-of-slots",
        type: "brick",
        text: {
          en: "Fake Story of Slots En",
          zh: "Fake Story of Slots Zh",
        },
        description: {
          en: "",
          zh: "Fake description of Slots Zh",
        },
        conf: {
          brick: "fake-brick-of-slots",
          slots: {
            first: {
              type: "bricks",
              bricks: [
                {
                  brick: "fake-brick-of-slotted-brick-a",
                },
                {
                  brick: "fake-brick-of-slotted-brick-b",
                  properties: {
                    title: "slotted",
                  },
                },
              ],
            },
          },
        },
      },
      {
        storyId: "fake-story-of-slots-invalid",
        type: "brick",
        text: {
          en: "Fake Story of Slots Invalid En",
          zh: "Fake Story of Slots Invalid Zh",
        },
        conf: {
          brick: "fake-brick-of-slots",
          slots: {
            first: {
              type: "routes",
              routes: [],
            },
          },
        },
      },
      {
        storyId: "fake-story-of-empty",
        type: "brick",
        text: {
          en: "Fake Story of Empty En",
          zh: "Fake Story of Empty Zh",
        },
        conf: [
          {
            brick: "fake-brick-of-empty",
          },
          {
            template: "fake-template-of-empty",
          },
        ],
      },
    ],
  },
];
