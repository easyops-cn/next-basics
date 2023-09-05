import React from "react";
import { mount, shallow } from "enzyme";
import * as brickKit from "@next-core/brick-kit";
import { GeneralType } from "./GeneralType";
import { V3BrickDocEnums } from "./Enum";
import { V3BrickDocTypeAlias } from "./TypeAlias";
import {
  DeclarationEnum,
  DeclarationInterface,
  DeclarationTypeAlias,
} from "./annotation";
import { V3BrickDocInterface } from "./Interface";
import { V3BrickDocTypes } from "./";

jest.mock("@next-core/brick-kit");

jest.spyOn(brickKit, "getHistory").mockReturnValue({
  location: {},
  createHref: () => "/test",
} as any);

const enumAnnotation = {
  members: [
    {
      id: {
        name: "blue",
        type: "identifier",
      },
      initializer: {
        type: "jsLiteral",
        value: "blue",
      },
      type: "enumMember",
    },
    {
      id: {
        type: "jsLiteral",
        value: "blue-inverse",
      },
      initializer: {
        type: "jsLiteral",
        value: "blue-inverse",
      },
      type: "enumMember",
    },
  ],
  name: "TagColor",
  type: "enum",
} as DeclarationEnum;

const typeAliasAnnotation = {
  annotation: {
    type: "union",
    types: [
      {
        type: "jsLiteral",
        value: "large",
      },
      {
        type: "jsLiteral",
        value: "medium",
      },
      {
        type: "jsLiteral",
        value: "small",
      },
      {
        type: "jsLiteral",
        value: "xs",
      },
    ],
  },
  name: "ComponentSize",
  type: "typeAlias",
} as DeclarationTypeAlias;

const interfaceAnnotation = {
  body: [
    {
      annotation: {
        type: "reference",
        typeName: {
          name: "ComponentSize",
          type: "identifier",
        },
      },
      computed: false,
      key: {
        name: "size",
        type: "identifier",
      },
      optional: true,
      type: "propertySignature",
    },
    {
      annotation: {
        type: "reference",
        typeName: {
          name: "GeneralIconProps",
          type: "identifier",
        },
      },
      computed: false,
      key: {
        name: "icon",
        type: "identifier",
      },
      optional: true,
      type: "propertySignature",
    },
    {
      annotation: {
        type: "union",
        types: [
          {
            type: "reference",
            typeName: {
              name: "TagColor",
              type: "identifier",
            },
          },
          {
            type: "keyword",
            value: "string",
          },
        ],
      },
      computed: false,
      key: {
        name: "color",
        type: "identifier",
      },
      optional: true,
      type: "propertySignature",
    },
    {
      annotation: {
        type: "keyword",
        value: "boolean",
      },
      computed: false,
      key: {
        name: "closable",
        type: "identifier",
      },
      optional: true,
      type: "propertySignature",
    },
    {
      annotation: {
        type: "reference",
        typeName: {
          left: {
            name: "React",
            type: "identifier",
          },
          right: {
            name: "CSSProperties",
            type: "identifier",
          },
          type: "qualifiedName",
        },
      },
      computed: false,
      key: {
        name: "tagStyle",
        type: "identifier",
      },
      optional: true,
      type: "propertySignature",
    },
  ],
  name: "TagProps",
  type: "interface",
} as DeclarationInterface;

describe("Enum", () => {
  it("should work", async () => {
    const wrapper = shallow(
      <V3BrickDocEnums enumDeclaration={enumAnnotation} />
    );
    await (global as any).flushPromises();

    expect(wrapper.find(GeneralType)).toHaveLength(4);
  });
});

describe("TypeAlias", () => {
  it("should work", async () => {
    const wrapper = shallow(
      <V3BrickDocTypeAlias typeAliasDeclaration={typeAliasAnnotation} />
    );
    await (global as any).flushPromises();

    expect(wrapper.find(GeneralType)).toHaveLength(2);
  });
});

describe("Interface", () => {
  it("should work", async () => {
    const wrapper = shallow(
      <V3BrickDocInterface interfaceDeclaration={interfaceAnnotation} />
    );
    await (global as any).flushPromises();

    expect(wrapper.find("tbody tr")).toHaveLength(5);
  });
});

describe("V3BrickDocTypes", () => {
  it("should work", async () => {
    const wrapper = shallow(
      <V3BrickDocTypes
        types={[enumAnnotation, typeAliasAnnotation, interfaceAnnotation]}
      />
    );
    await (global as any).flushPromises();

    expect(wrapper.find(V3BrickDocEnums)).toHaveLength(1);
    expect(wrapper.find(V3BrickDocTypeAlias)).toHaveLength(1);
    expect(wrapper.find(V3BrickDocInterface)).toHaveLength(1);
  });
});
