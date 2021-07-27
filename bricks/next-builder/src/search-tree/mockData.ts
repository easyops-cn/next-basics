import {
  symbolForNodeId,
  symbolForNodeInstanceId,
} from "../shared/storyboard/buildStoryboard";

export const mockData = {
  routes: [
    {
      bricks: [
        {
          brick: "general-button",
          properties: {
            test: 1,
          },
          [symbolForNodeInstanceId]: "123123",
          [symbolForNodeId]: "B-02",
          path: "${APP.homepage}/test-1",
        },
        {
          brick: "general-select",
          properties: {
            test: 2,
          },
          [symbolForNodeInstanceId]: "234",
          [symbolForNodeId]: "B-04",
          path: "${APP.homepage}/test-2",
        },
      ],
      [symbolForNodeId]: "B-01",
      type: "bricks",
    },
  ],
  meta: {
    customTemplates: [
      {
        name: "tpl-test-1",
        [symbolForNodeId]: "t-01",
      },
      {
        name: "tpl-test-2",
        [symbolForNodeId]: "t-02",
      },
    ],
  },
};
