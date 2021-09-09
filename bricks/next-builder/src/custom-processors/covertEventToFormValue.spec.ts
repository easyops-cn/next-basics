import { covertEventToFormValue } from "./covertEventToFormValue";
import { BrickEventHandler } from "@next-core/brick-types";

jest.mock("@next-core/brick-kit", () => ({
  getRuntime: () => ({
    registerCustomProcessor: jest.fn(),
  }),
}));

describe("covertToEventFormValue", () => {
  it.each([
    [
      { action: "console.log", args: ["title"] },
      {
        action: "console.log",
        args: "- title\n",
        handlerType: "builtinAction",
      },
    ],
    [
      { useProvider: "api.cmdb.provider", args: ["abc"] },
      {
        provider: "api.cmdb.provider",
        args: "- abc\n",
        pollEnabled: undefined,
        handlerType: "useProvider",
        providerType: "provider",
      },
    ],
    [
      { useProvider: "mynamespace@getDetail:1.0.0", args: ["abc"] },
      {
        flow: "mynamespace@getDetail:1.0.0",
        handlerType: "useProvider",
        pollEnabled: undefined,
        providerType: "flow",
        args: "- abc\n",
      },
    ],
    [
      {
        useProvider: "api.cmdb.provider",
        args: ["abc"],
        poll: {
          enabled: true,
          expectPollEnd: '<% (result) => result.status === "done" %>',
        },
      },
      {
        handlerType: "useProvider",
        providerType: "provider",
        provider: "api.cmdb.provider",
        pollEnabled: true,
        args: "- abc\n",
        poll: 'expectPollEnd: <% (result) => result.status === "done" %>\n',
      },
    ],
    [
      { target: "#create-form", properties: { value: { a: 4 } } },
      {
        handlerType: "setPorps",
        properties: "value:\n  a: 4\n",
        brickSelector: "#create-form",
        selectorType: "target",
      },
    ],
    [
      { targetRef: "create-form-ref", properties: { value: { a: 4 } } },
      {
        handlerType: "setPorps",
        properties: "value:\n  a: 4\n",
        brickSelector: "create-form-ref",
        selectorType: "targetRef",
      },
    ],
    [
      { target: "#create-form", method: "setInitValue", args: [{ a: 3 }] },
      {
        args: "- a: 3\n",
        brickSelector: "#create-form",
        handlerType: "exectuteMethod",
        method: "setInitValue",
        selectorType: "target",
      },
    ],
    [
      {
        targetRef: "create-form-ref",
        method: "setInitValue",
        args: [{ a: 3 }],
      },
      {
        args: "- a: 3\n",
        brickSelector: "create-form-ref",
        handlerType: "exectuteMethod",
        method: "setInitValue",
        selectorType: "targetRef",
      },
    ],
    [{}, {}],
  ])("case %# should work", (handler, result) => {
    expect(covertEventToFormValue(handler as BrickEventHandler)).toEqual(
      result
    );
  });
});
