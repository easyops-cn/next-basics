import React from "react";
import { act } from "react-dom/test-utils";
import { shallow } from "enzyme";
import { Image } from "antd";
import { ImagePreviewType } from "rc-image";

import { GeneralImage, GeneralImageProps } from "./GeneralImage";

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
    const wrapper = shallow<GeneralImageProps>(<GeneralImage {...props} />);
    const imageProps = wrapper.find(Image).props();
    expect(imageProps.src).toEqual("/images/1234.jpg");
    expect(imageProps.preview).toBeUndefined();

    const handleVisibleChange = jest.fn();
    wrapper.setProps({ visible: true, onVisibleChange: handleVisibleChange });
    const preview = wrapper.find(Image).prop("preview") as ImagePreviewType;
    expect(preview.visible).toBe(true);
    act(() => {
      preview.onVisibleChange(false, true);
    });
    expect(handleVisibleChange).toBeCalledWith(false, true);
  });
});
