import {
  CustomBrickEventType,
  EventFormField,
  HandlerType,
} from "../shared/visual-events/interfaces";
import { covertFormValueToEvent } from "./covertFormValueToEvent";

jest.mock("@next-core/brick-kit", () => ({
  getRuntime: () => ({
    registerCustomProcessor: jest.fn(),
  }),
}));

describe("covertFormValueToEvent", () => {
  it.each([
    [
      {
        action: "console.log",
        args: "- abc\n",
        handlerType: HandlerType.BuiltinAction,
      },
      { action: "console.log", args: ["abc"] },
    ],
    [
      {
        action: "history.push",
        handlerType: HandlerType.BuiltinAction,
        path: "${APP.homepage}/test",
        args: "- notify: true",
      },
      {
        action: "history.push",
        args: ["${APP.homepage}/test", { notify: true }],
      },
    ],
    [
      {
        action: "history.push",
        handlerType: HandlerType.BuiltinAction,
        path: "${APP.homepage}/test",
        args: "",
      },
      {
        action: "history.push",
        args: ["${APP.homepage}/test"],
      },
    ],
    [
      {
        action: "segue.push",
        handlerType: HandlerType.BuiltinAction,
        segueId: "go-to-detail",
        args: "- id: abc",
      },
      {
        action: "segue.push",
        args: ["go-to-detail", { id: "abc" }],
      },
    ],
    [
      {
        action: "segue.push",
        handlerType: HandlerType.BuiltinAction,
        segueId: "go-to-list",
      },
      {
        action: "segue.push",
        args: ["go-to-list"],
      },
    ],
    [
      {
        action: "message.subscribe",
        args: "- abc\n",
        callback: "success:\n  - action: console.log\n",
        handlerType: "builtinAction",
      },
      {
        action: "message.subscribe",
        args: ["abc"],
        callback: {
          success: [{ action: "console.log" }],
        },
      },
    ],
    [
      {
        handlerType: HandlerType.UseProvider,
        provider: "api.cmdb.provider",
        providerType: "provider",
        useProviderMethod: "resolve",
        args: "- abc\n",
      },
      {
        useProvider: "api.cmdb.provider",
        args: ["abc"],
      },
    ],
    [
      {
        handlerType: HandlerType.UseProvider,
        provider: "api.cmdb.provider",
        providerType: "provider",
        useProviderMethod: "saveAs",
        args: "- abc\n",
      },
      {
        useProvider: "api.cmdb.provider",
        method: "saveAs",
        args: ["abc"],
      },
    ],
    [
      {
        handlerType: HandlerType.UseProvider,
        flow: "namespace@getDetail:1.0.0",
        useProviderMethod: "resolve",
        providerType: "flow",
        args: "- abc\n",
        poll: 'expectPollEnd: <% (result) => result.status === "done" %>\n',
        pollEnabled: true,
      },
      {
        args: ["abc"],
        poll: {
          enabled: true,
          expectPollEnd: '<% (result) => result.status === "done" %>',
        },
        useProvider: "namespace@getDetail:1.0.0",
      },
    ],
    [
      {
        handlerType: HandlerType.CustomBrick,
        brickEventType: CustomBrickEventType.ExecuteMethod,
        selectorType: "target",
        brickSelector: "#create-form",
        method: "setInitValue",
        args: " - abc\n",
      },
      {
        args: ["abc"],
        method: "setInitValue",
        target: "#create-form",
      },
    ],
    [
      {
        handlerType: HandlerType.CustomBrick,
        brickEventType: CustomBrickEventType.ExecuteMethod,
        selectorType: "targetRef",
        brickSelector: "create-form-ref",
        method: "setInitValue",
        args: " - abc\n",
      },
      {
        args: ["abc"],
        method: "setInitValue",
        targetRef: "create-form-ref",
      },
    ],
    [
      {
        handlerType: HandlerType.CustomBrick,
        brickEventType: CustomBrickEventType.SetProps,
        selectorType: "target",
        brickSelector: "#create-form",
        properties: "a: 3",
      },
      {
        properties: { a: 3 },
        target: "#create-form",
      },
    ],
    [
      {
        handlerType: HandlerType.CustomBrick,
        brickEventType: CustomBrickEventType.SetProps,
        selectorType: "targetRef",
        brickSelector: "create-form-ref",
        properties: "a: 3",
      },
      {
        properties: { a: 3 },
        targetRef: "create-form-ref",
      },
    ],
    [{}, undefined],
  ])("should work", (formValue, result) => {
    expect(covertFormValueToEvent(formValue as EventFormField)).toEqual(result);
  });
});
