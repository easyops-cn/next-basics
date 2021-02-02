import React from "react";
import { shallow } from "enzyme";
import { EntryCardItem } from "./EntryCardItem";

describe("EntryCardItem", () => {
  it("should work", () => {
    const wrapper = shallow(
      <EntryCardItem
        cardTitle="卡片标题"
        iconColor="brightOrange"
        icon={{
          lib: "easyops",
          category: "model",
          icon: "host",
        }}
        url="/123"
      />
    );
    expect(wrapper.find("Link").length).toBe(1);
  });
});
