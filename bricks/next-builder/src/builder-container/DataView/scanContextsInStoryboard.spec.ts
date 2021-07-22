import { Storyboard, BrickConf } from "@next-core/brick-types";
import {
  scanContextsInStoryboard,
  scanContextsInAny,
} from "./scanContextsInStoryboard";

describe("scanContextsInStoryboard", () => {
  it("should work", () => {
    const selfRef: Record<string, any> = {
      quality: "good",
    };
    selfRef.ref = selfRef;
    const storyboard: Storyboard = {
      meta: {
        customTemplates: [
          {
            name: "ct-a",
            bricks: [
              {
                brick: "b-x",
                bg: true,
                properties: {
                  good1: "<% CTX.good1 %>",
                  good1Repeat: "<% CTX.good1 %>",
                  good2: "<% CTX.good2() %>",
                  goodX: "<% CTX['good-x'] %>",
                  notRelevant: "<% some.any %>",
                  bad: "CTX.bad1()",
                  bad3: "<% CTX[bad3] %>",
                },
              },
            ],
          },
        ],
      },
      routes: [
        {
          if: "<% CTX.good3 %>",
          bricks: [
            {
              brick: "b-a",
              properties: {
                any: "<% some.any(CTX.good4) %>",
                recursive: "<% CTX.good5(CTX.good6) %>",
                selfRef,
              },
              events: {
                click: [
                  {
                    action: "context.replace",
                    args: ["good7", "any"],
                  },
                  {
                    action: "context.assign",
                    args: ["good8"],
                  },
                  {
                    action: "context.unknown",
                    args: ["bad5"],
                  },
                  {
                    action: "context.replace",
                    args: [],
                  },
                  {
                    action: "context.assign",
                    args: [true],
                  },
                ],
              },
            },
          ],
        },
      ],
      app: {
        homepage: "<% CTX.bad5 %>",
      },
    } as any;
    expect(scanContextsInStoryboard(storyboard).sort()).toEqual([
      "good-x",
      "good1",
      "good2",
      "good3",
      "good4",
      "good5",
      "good6",
      "good7",
      "good8",
    ]);
  });
});

describe("scanContextsInAny", () => {
  it("should work", () => {
    const brickConf: BrickConf = {
      brick: "b-b",
      properties: {
        any: "<% CTX.good1 %>",
      },
      events: {
        click: {
          action: "context.replace",
          args: ["good2", "any"],
        },
      },
    } as any;
    expect(scanContextsInAny(brickConf).sort()).toEqual(["good1", "good2"]);
  });
});
