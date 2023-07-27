import React from "react";
import { mount } from "enzyme";
import { DeleteConfirmModal } from "./DeleteConfirmModal";

describe("DeleteConfirmModal", () => {
  it("should work", () => {
    const wrapper = mount(
      <DeleteConfirmModal
        visible={false}
        name={"hello"}
        handleCancel={jest.fn}
        handleConfirm={jest.fn}
      />
    );
    expect(wrapper).toMatchSnapshot();

    wrapper.setProps({ visible: true });
    wrapper.update();
  });
});
