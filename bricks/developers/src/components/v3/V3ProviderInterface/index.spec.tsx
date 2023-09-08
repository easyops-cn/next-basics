import React from "react";
import { mount, shallow } from "enzyme";
import * as brickKit from "@next-core/brick-kit";
import { V3ProviderInterface } from "./";
import { V3ProviderParams } from "./V3ProviderParams";
import { V3ProviderReturns } from "./V3ProviderReturns";

jest.mock("@next-core/brick-kit");

jest.spyOn(brickKit, "getHistory").mockReturnValue({
  location: {},
  createHref: () => "/test",
} as any);

const params = [
  {
    annotation: {
      type: "keyword",
      value: "string",
    },
    description: "语言",
    name: "lang",
  },
];

const returns = {
  annotation: {
    type: "reference",
    typeName: {
      name: "Promise",
      type: "identifier",
    },
    typeParameters: {
      params: [
        {
          type: "keyword",
          value: "void",
        },
      ],
      type: "typeParameterInstantiation",
    },
  },
};

describe("V3ProviderParams", () => {
  it("should work", async () => {
    const wrapper = shallow(<V3ProviderParams params={params} />);
    await (global as any).flushPromises();

    expect(wrapper.find("table")).toBeTruthy();
  });
});

describe("V3ProviderReturns", () => {
  it("should work", async () => {
    const wrapper = shallow(<V3ProviderReturns returns={returns} />);
    await (global as any).flushPromises();

    expect(wrapper).toBeTruthy();
  });
});

describe("V3ProviderInterface", () => {
  it("should work", async () => {
    const data = {
      params,
      returns,
    };
    const wrapper = mount(<V3ProviderInterface data={data} />);
    await (global as any).flushPromises();

    expect(wrapper.find(V3ProviderParams)).toHaveLength(1);
    expect(wrapper.find(V3ProviderReturns)).toHaveLength(1);
  });
});
