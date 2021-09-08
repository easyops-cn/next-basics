import {
  getHanderType,
  getHandlerName,
  isFlowAPiProvider,
} from "./processEventHandler";
import { HandlerType } from "./interfaces";
import { BrickEventHandler } from "@next-core/brick-types";

describe("procesoor", () => {
  describe("isFlowAPiProvider", () => {
    it.each([
      ["api.cmdb.provider", false],
      ["namespace@getDetail:1.0.0", true],
    ])("%s should %s", (provider, result) => {
      expect(isFlowAPiProvider(provider)).toEqual(result);
    });
  });

  describe("getHanderType", () => {
    it.each([
      [{ action: "console.log", args: ["test"] }, HandlerType.BuiltinAction],
      [
        { useProvider: "api.cmdb.provider", args: ["abc"] },
        HandlerType.UseProvider,
      ],
      [
        { target: "#create-form", properties: { value: { a: 4 } } },
        HandlerType.SetPorps,
      ],
      [
        {
          target: "#create-form",
          method: "setInitValue",
          args: [{ value: { a: 4 } }],
        },
        HandlerType.ExectuteMethod,
      ],
      [{}, HandlerType.Unkown],
    ])("%j should return %j", (data, result) => {
      expect(getHanderType(data as BrickEventHandler)).toEqual(result);
    });
  });

  describe("getHandlerName", () => {
    it.each([
      [{ action: "console.log", args: ["test"] }, "console.log"],
      [
        { useProvider: "api.cmdb.provider", args: ["abc"] },
        "api.cmdb.provider.resolve",
      ],
      [
        { useProvider: "api.cmdb.provider", args: ["abc"], method: "setArgs" },
        "api.cmdb.provider.setArgs",
      ],
      [
        { target: "#create-form", properties: { value: { a: 4 } } },
        "#create-form.setProperties",
      ],
      [
        { targetRef: "create-form-ref", properties: { value: { a: 4 } } },
        "create-form-ref.setProperties",
      ],
      [
        {
          target: "#create-form",
          method: "setInitValue",
          args: [{ value: { a: 4 } }],
        },
        "#create-form.setInitValue",
      ],
      [
        {
          targetRef: "create-form-ref",
          method: "setInitValue",
          args: [{ value: { a: 4 } }],
        },
        "create-form-ref.setInitValue",
      ],
      [{ a: "test" }, "unkown"],
    ])("case %# should work", (data, result) => {
      expect(getHandlerName(data as BrickEventHandler)).toEqual(result);
    });
  });
});
