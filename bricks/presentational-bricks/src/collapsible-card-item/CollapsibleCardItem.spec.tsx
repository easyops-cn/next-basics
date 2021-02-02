import React from "react";
import { shallow } from "enzyme";
import { CollapsibleCardItem } from "./CollapsibleCardItem";

describe("CollapsibleCardItem", () => {
  it("should work", () => {
    const wrapper = shallow(
      <CollapsibleCardItem
        cardTitle="gitlab"
        cardDesc="Easyops GIT"
        icon={{
          lib: "antd",
          type: "gitlab"
        }}
        isActive={true}
      />
    );
    expect(wrapper).toMatchSnapshot();
    wrapper.setProps({
      isActive: false
    });
    wrapper.update();
    expect(wrapper).toMatchSnapshot();
  });
});
