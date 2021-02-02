import { Chapter } from "../../../interfaces";

export const businessBook: Chapter[] = [
  {
    title: {
      en: "Fake Chapter 1",
      zh: "Fake Chapter 1"
    },
    stories: [
      {
        storyId: "fake-story-of-business",
        type: "template",
        text: {
          en: "Fake Story of Correct En",
          zh: "Fake Story of Correct Zh"
        },
        conf: {
          template: "fake-brick-of-business",
          properties: {
            for: "good"
          },
          events: {
            ok: {
              action: "console.log"
            }
          }
        }
      }
    ]
  }
];
