import React from "react";
import { shallow } from "enzyme";
import { GeneralModal } from "./GeneralModal";

describe("GeneralModal", () => {
  it("should work", () => {
    const wrapper = shallow(
      <GeneralModal
        name="management"
        label="配置管理"
        required={true}
        modalTitle="配置管理"
        visible={true}
        okText="保存"
        cancelText="取消"
        okType="default"
        btnText="点击调整"
      />
    );
    expect(wrapper.find("Modal").prop("title")).toBe("配置管理");
  });
});
