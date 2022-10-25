import { replaceWidgetFunctions } from "./replaceWidgetFunctions";

jest.spyOn(console, "error").mockImplementation(() => void 0);

describe("replaceWidgetFunctions", () => {
  it.each<[input: unknown, output: unknown]>([
    [
      {
        props: {
          a: '<% CTX.haveFun(FN.abc(), FN.xyz, "FN") %>',
          b: [
            `
            <%~ CTX.haveFun(FN.abc(), FN.xyz, "FN") %>
          `,
          ],
          c: 1,
          d: undefined,
          e: ["good", "FN.bad()"],
          f: ["FN.bad()", "<% FN. %>"],
          g: '<% CTX.haveFun("FN") %>',
          h: '<% IMG.get("my.png") %>',
          i: '<% I18N("HELLO") %>',
        },
      },
      {
        props: {
          a: '<% CTX.haveFun(__WIDGET_FN__["test-app"].abc(), __WIDGET_FN__["test-app"].xyz, "FN") %>',
          b: [
            `
            <%~ CTX.haveFun(__WIDGET_FN__["test-app"].abc(), __WIDGET_FN__["test-app"].xyz, "FN") %>
          `,
          ],
          c: 1,
          d: undefined,
          e: ["good", "FN.bad()"],
          f: ["FN.bad()", "<% FN. %>"],
          g: '<% CTX.haveFun("FN") %>',
          h: '<% __WIDGET_IMG__("test-app").get("my.png") %>',
          i: '<% __WIDGET_I18N__("test-app")("HELLO") %>',
        },
      },
    ],
  ])("should work", (input, output) => {
    expect(replaceWidgetFunctions(input, "test-app")).toEqual(output);
  });

  test("with version", () => {
    expect(
      replaceWidgetFunctions('<% IMG.get("my.png") %>', "test-app", "1.2.3")
    ).toEqual('<% __WIDGET_IMG__("test-app","1.2.3").get("my.png") %>');
  });
});
