import React from "react";
import { mount, shallow } from "enzyme";
import "@testing-library/jest-dom";
import { ProviderItem } from "./ProviderItem";
import { act } from "react-dom/test-utils";
import { GeneralIcon } from "@next-libs/basic-components";

describe("ProviderItem", () => {
  it("should work", async () => {
    const onActionClick = jest.fn();
    const wrapper = mount(
      <ProviderItem
        title="test"
        id="basic.test"
        onActionClick={onActionClick}
      />
    );

    wrapper.find(GeneralIcon).invoke("onClick")(null);
    expect(onActionClick).toBeCalled();
  });
});
