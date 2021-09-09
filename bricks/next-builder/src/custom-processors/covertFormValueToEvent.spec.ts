import {
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
        handlerType: HandlerType.UseProvider,
        provider: "api.cmdb.provider",
        providerType: "provider",
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
        flow: "namespace@getDetail:1.0.0",
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
        handlerType: HandlerType.ExectuteMethod,
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
        handlerType: HandlerType.ExectuteMethod,
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
        handlerType: HandlerType.SetPorps,
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
        handlerType: HandlerType.SetPorps,
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
