import { GetTypeDeclarationsOfFn } from "./GetTypeDeclarationsOfFn";

describe("GetTypeDeclarationsOfFn", () => {
  it("should work", () => {
    const libs = GetTypeDeclarationsOfFn("two", [
      {
        name: "one",
        typescript: true,
        source: `
          function one(input: string): boolean {
            return true;
          }
        `,
      },
      {
        name: "two",
        source: `
          function two(input) {
            return input;
          }
        `,
      },
      {
        name: "three",
        source: `
          function three(input) {
            return;
          }
        `,
      },
    ]);
    expect(libs).toMatchInlineSnapshot(`
      Array [
        Object {
          "content": "
                export function one(input: string): boolean {
                  return true;
                }
              ",
          "filePath": "storyboard/functions/one.ts",
          "model": true,
        },
        Object {
          "content": "
                export function three(input) {
                  return;
                }
              ",
          "filePath": "storyboard/functions/three.js",
          "model": true,
        },
        Object {
          "content": "export * from \\"./functions/one\\";
      export * from \\"./functions/three\\";",
          "filePath": "storyboard/FN-exports.ts",
        },
        Object {
          "content": "declare const FN: typeof import(\\"./FN-exports\\");",
          "filePath": "storyboard/FN.d.ts",
        },
      ]
    `);
  });
});
