import { Storyboard } from "@next-core/brick-types";
import { findUsedImagesInStoryboard } from "./findUsedImages";

jest.spyOn(console, "warn").mockImplementation(() => void 0);
const consoleError = jest
  .spyOn(console, "error")
  .mockImplementation(() => void 0);

describe("findUsedImagesInStoryboard", () => {
  const regex = /\/oss\/(.+?\.(?:png|jpe?g|gif))/g;
  it("should work", () => {
    const storyboard: Storyboard = {
      app: null,
      routes: [
        {
          path: "/",
          type: "bricks",
          bricks: [
            {
              brick: "my-brick",
              properties: {
                propA: "<% IMG.get('a.png') %>",
                propB:
                  "<% FLAGS['some'] ? IMG.get('b.png') : IMG.get('c.png') %>",
                propC: "(D:/oss/d.jpg E:/oss/e.gif)",
                propD: "<% IMG.get(a ? 'bad.png' : 'bad.gif') %>",
                propE: "IMG.get('bad.png')",
                propF: "<% CTX.get('bad.png') %>",
              },
            },
          ],
        },
      ],
    };
    const images = new Set<string>();
    findUsedImagesInStoryboard(storyboard, regex, images);
    expect([...images]).toEqual(["a.png", "b.png", "c.png", "d.jpg", "e.gif"]);
  });

  it("should log error if failed to parse evaluation string", () => {
    const storyboard: Storyboard = {
      app: null,
      routes: [
        {
          path: "/",
          type: "bricks",
          bricks: [
            {
              brick: "my-brick",
              properties: {
                propA: "<% IMG get('a.png') %>",
                propB: "<% IMG.get('b.png') %>",
              },
            },
          ],
        },
      ],
    };
    const images = new Set<string>();
    findUsedImagesInStoryboard(storyboard, regex, images);
    expect([...images]).toEqual(["b.png"]);
    expect(consoleError).toBeCalledTimes(1);
  });
});
