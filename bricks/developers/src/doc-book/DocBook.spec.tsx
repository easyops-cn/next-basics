import React from "react";
import { shallow } from "enzyme";
import { DocBook } from "./DocBook";

jest.mock("@next-core/brick-kit");

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
});
