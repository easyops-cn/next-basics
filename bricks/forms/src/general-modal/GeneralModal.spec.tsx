import React from "react";
import { shallow } from "enzyme";
import { GeneralModal } from "./GeneralModal";
import { GeneralIcon } from "@next-libs/basic-components";

describe("GeneralModal", () => {
  it("should work", () => {
    const srcIcon = {
      imgSrc:
        "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    } as any;
    const menuIcon = {
      icon: "plus",
      lib: "antd",
    } as any;

    const titleMatchObj1 = (
      <div
        className="formsGeneralModalTitle"
        style={{ alignItems: "center", display: "flex" }}
      >
        <GeneralIcon
          icon={{
            imgSrc:
              "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
            imgStyle: { marginRight: "8px" },
          }}
          size={20}
        />
        配置管理
      </div>
    );
    const titleMatchObj2 = (
      <div
        className="formsGeneralModalTitle"
        style={{ alignItems: "center", display: "flex" }}
      >
        <GeneralIcon
          icon={{ menuIcon: { icon: "plus", lib: "antd" } }}
          style={{ fontSize: "20px", marginRight: "8px" }}
        />
        配置管理
      </div>
    );

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
        titleIcon={srcIcon}
      />
    );
    expect(wrapper.find("Modal").prop("title")).toMatchObject(titleMatchObj1);

    wrapper.setProps({ titleIcon: { menuIcon } });
    wrapper.update();
    expect(wrapper.find("Modal").prop("title")).toMatchObject(titleMatchObj2);
  });
});
