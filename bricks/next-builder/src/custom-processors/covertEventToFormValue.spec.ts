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
      {
        action: "history.push",
        args: ["${APP.homepage}/test", { notify: false }],
      },
      {
        action: "history.push",
        handlerType: "builtinAction",
        path: "${APP.homepage}/test",
        args: "- notify: false\n",
      },
    ],
    [
      { action: "history.push" },
      {
        action: "history.push",
        handlerType: "builtinAction",
      },
    ],
    [
      { action: "segue.push", args: ["go-to-detail", { id: "abc" }] },
      {
        action: "segue.push",
        handlerType: "builtinAction",
        segueId: "go-to-detail",
        args: "- id: abc\n",
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
        useProviderMethod: "resolve",
      },
    ],
    [
      {
        action: "message.subscribe",
        args: ["abc"],
        callback: {
          success: [{ action: "console.log" }],
        },
      },
      {
        action: "message.subscribe",
        args: "- abc\n",
        callback: "success:\n  - action: console.log\n",
        handlerType: "builtinAction",
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
        useProviderMethod: "resolve",
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
        useProviderMethod: "resolve",
        pollEnabled: true,
        args: "- abc\n",
        poll: 'expectPollEnd: <% (result) => result.status === "done" %>\n',
      },
    ],
    [
      { target: "#create-form", properties: { value: { a: 4 } } },
      {
        handlerType: "customBrick",
        brickEventType: "setProps",
        properties: "value:\n  a: 4\n",
        brickSelector: "#create-form",
        selectorType: "target",
      },
    ],
    [
      { targetRef: "create-form-ref", properties: { value: { a: 4 } } },
      {
        handlerType: "customBrick",
        brickEventType: "setProps",
        properties: "value:\n  a: 4\n",
        brickSelector: "create-form-ref",
        selectorType: "targetRef",
      },
    ],
    [
      { target: "#create-form", method: "setInitValue", args: [{ a: 3 }] },
      {
        handlerType: "customBrick",
        brickEventType: "executeMethod",
        args: "- a: 3\n",
        brickSelector: "#create-form",
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
        handlerType: "customBrick",
        brickEventType: "executeMethod",
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
