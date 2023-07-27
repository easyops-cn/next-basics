import React from "react";
import { shallow } from "enzyme";
import { IconSelect } from "./IconSelect";
import { IconSelectItem } from "@next-libs/forms";

describe("IconSelect", () => {
  it("should work", async () => {
    const onChange = jest.fn();
    const openModal = jest.fn();
    const handleCancel = jest.fn();
    const wrapper = shallow(
      <IconSelect
        onChange={onChange}
        visible={false}
        value={{
          lib: "fa",
          icon: "image",
        }}
        openModal={openModal}
        handleCancel={handleCancel}
      />
    );
    wrapper.find(IconSelectItem).invoke("openModal")();
    expect(openModal).toHaveBeenCalled();

    wrapper.find(IconSelectItem).invoke("onChange")(null);
    expect(onChange).toHaveBeenCalled();

    wrapper.find(IconSelectItem).invoke("handleCancel")();
    expect(handleCancel).toHaveBeenCalled();
  });
});
