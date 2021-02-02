import React from "react";
import { shallow, mount } from "enzyme";
import { getRuntime } from "@next-core/brick-kit";
import { DocBook } from "./DocBook";

jest.mock("@next-core/brick-kit");

const spyOnSetPageTitle = jest.fn();
(getRuntime as jest.Mock).mockReturnValue({
  appBar: {
    setPageTitle: spyOnSetPageTitle,
  },
});

describe("DocBook", () => {
  it.each<[string]>([["release"]])(
    "should render when docId is %j",
    (docId) => {
      const wrapper = shallow(<DocBook docId={docId} />);
      expect(wrapper.find("BrickDoc").prop("doc")).toEqual("markdown mock");
    }
  );

  it("should throw error if doc not found", () => {
    expect(() => {
      shallow(<DocBook docId={"not-found"} />);
    }).toThrowError();
  });

  it("should set page title", () => {
    mount(<DocBook docId="release" />);
    expect(spyOnSetPageTitle).toBeCalledWith("RELEASE");
  });
});
