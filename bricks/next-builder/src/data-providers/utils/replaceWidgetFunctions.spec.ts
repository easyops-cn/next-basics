import { replaceWidgetFunctions } from "./replaceWidgetFunctions";

jest.spyOn(console, "error").mockImplementation(() => void 0);

describe("replaceWidgetFunctions", () => {
  it.each<[input: unknown, output: unknown]>([
    [
      {
        props: {
          a: '<% CTX.haveFun(FN.abc(), FN.xyz, FN, FN["oops"], "FN") %>',
          b: [
            `
            <%~ CTX.haveFun(FN.abc(), FN.xyz, FN, FN["oops"], "FN") %>
          `,
          ],
          c: 1,
          d: undefined,
          e: ["good", "FN.bad()"],
          f: ["FN.bad()", "<% FN. %>"],
          g: '<% CTX.haveFun("FN") %>',
          h: '<% IMG.get("my.png") %>',
        },
      },
      {
        props: {
          a: '<% CTX.haveFun(__WIDGET_FN__["test-app"].abc(), __WIDGET_FN__["test-app"].xyz, FN, FN["oops"], "FN") %>',
          b: [
            `
            <%~ CTX.haveFun(__WIDGET_FN__["test-app"].abc(), __WIDGET_FN__["test-app"].xyz, FN, FN["oops"], "FN") %>
          `,
          ],
          c: 1,
          d: undefined,
          e: ["good", "FN.bad()"],
          f: ["FN.bad()", "<% FN. %>"],
          g: '<% CTX.haveFun("FN") %>',
          h: '<% __WIDGET_IMG__("test-app").get("my.png") %>',
        },
      },
    ],
  ])("should work", (input, output) => {
    expect(replaceWidgetFunctions(input, "test-app")).toEqual(output);
  });
});
