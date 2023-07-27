import React from "react";
import { shallow } from "enzyme";
import { GeneralPreviewImage } from "./GeneralPreviewImage";
import Image from "./components/Image";

describe("GeneralPreviewImage", () => {
  it("should work", () => {
    const props = {
      width: 100,
      height: 100,
      alt: "xx",
      fallback: "fallback",
      src: "/images/1.jpg",
    };
    const wrapper = shallow(<GeneralPreviewImage {...props} />);
    const imageProps = wrapper.find(Image).props();
    expect(imageProps.src).toEqual("/images/1.jpg");
  });

  it("should work when srcList isn't empty", () => {
    const props = {
      width: 100,
      height: 100,
      alt: "xx",
      fallback: "fallback",
      src: "/images/2.jpg",
      srcList: ["/images/1.jpg", "/images/2.jpg"],
    };
    const wrapper = shallow(<GeneralPreviewImage {...props} />);
    const imageProps = wrapper.find(Image).at(0).props();
    expect(imageProps.src).toEqual("/images/2.jpg");
    imageProps.onClick({} as any);
    expect(wrapper.find(Image.PreviewGroup).length).toBeTruthy();
  });
});
