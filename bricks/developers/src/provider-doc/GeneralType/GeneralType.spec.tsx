import React from "react";
import { mount } from "enzyme";
import { Type } from "typedoc/dist/lib/serialization/schema";
import { GeneralType } from "./GeneralType";

jest.mock("@next-libs/basic-components", () => ({
  HashLink(props: React.PropsWithChildren<any>) {
    return <a href={props.to}>{props.children}</a>;
  },
}));

describe("GeneralType", () => {
  it.each<[string, Type, string]>([
    [
      "union types",
      {
        type: "union",
        types: [
          {
            type: "intrinsic",
            name: "string",
          },
          {
            type: "intrinsic",
            name: "number",
          },
        ],
      },
      "string | number",
    ],
    [
      "array of reflection types",
      {
        type: "array",
        elementType: {
          type: "reflection",
        },
      },
      "object[]",
    ],
    [
      "array of intersection types",
      {
        type: "array",
        elementType: {
          type: "intersection",
          types: [
            {
              type: "intrinsic",
              name: "string",
            },
            {
              type: "intrinsic",
              name: "boolean",
            },
          ],
        },
      },
      "(string & boolean)[]",
    ],
    [
      "reference types",
      {
        type: "reference",
        name: "Promise",
      },
      "Promise",
    ],
    [
      "reference with id and arguments types",
      {
        type: "reference",
        id: 1,
        name: "ResponseListWrapper",
        typeArguments: [
          {
            type: "intrinsic",
            name: "string",
          },
          {
            type: "intrinsic",
            name: "number",
          },
        ],
      },
      "ResponseListWrapper<string, number>",
    ],
    [
      "string literal types",
      {
        type: "stringLiteral",
        value: "good",
      },
      '"good"',
    ],
    [
      "indexed access types",
      {
        type: "indexedAccess",
        indexType: {
          type: "stringLiteral",
          value: "metadata",
        },
        objectType: {
          type: "reference",
          name: "ModelFlow",
        },
      },
      'ModelFlow["metadata"]',
    ],
    [
      "indexed access of union types",
      {
        type: "indexedAccess",
        indexType: {
          type: "stringLiteral",
          value: "metadata",
        },
        objectType: {
          type: "union",
          types: [
            {
              type: "reference",
              name: "ModelFlow",
            },
            {
              type: "reference",
              name: "ModelTool",
            },
          ],
        },
      },
      '(ModelFlow | ModelTool)["metadata"]',
    ],
    [
      "expected unknown types",
      {
        type: "unknown",
        name: "-1",
      },
      "-1",
    ],
    [
      "unexpected unknown types",
      {
        type: "unknown",
      },
      '{"type":"unknown"}',
    ],
    [
      "other types",
      {
        type: "others",
      },
      '{"type":"others"}',
    ],
  ])("%s (%j) should be displayed as '%s'", (name, type, text) => {
    const wrapper = mount(<GeneralType type={type} />);
    expect(wrapper.text()).toBe(text);
  });
});
