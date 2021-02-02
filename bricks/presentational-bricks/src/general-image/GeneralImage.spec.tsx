import React from "react";
import { shallow } from "enzyme";
import { Image } from "antd";
import { GeneralImage } from "./GeneralImage";

describe("GeneralImages", () => {
  it("should work", () => {
    const props = {
      src: "/images/1234.jpg",
      extra: {
        useBrick: {
          brick: "div",
          properties: {
            textContent: "1234.jpg",
          },
        },
      },
    };
    const wrapper = shallow(<GeneralImage {...props} />);
    expect(wrapper.find(Image).prop("src")).toEqual("/images/1234.jpg");
  });
});
