import React from "react";
import { shallow } from "enzyme";
import { GeneralModal } from "./GeneralModal";
import { GeneralIcon } from "@next-libs/basic-components";

describe("GeneralModal", () => {
  it("should work", () => {
    const icon = {
      imgSrc:
        "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    } as any;
    const titleObj = (
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
        titleIcon={icon}
      />
    );
    expect(wrapper.find("Modal").prop("title")).toMatchObject(titleObj);
  });
});
