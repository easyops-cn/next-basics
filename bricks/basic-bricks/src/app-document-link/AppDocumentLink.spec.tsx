import React from "react";
import { shallow } from "enzyme";
import { AppDocumentLink } from "./AppDocumentLink";

describe("AppBarDocumentLink", () => {
  it("should work", () => {
    const wrapper = shallow(<AppDocumentLink />);
    expect(wrapper).toBeTruthy();
  });
});
