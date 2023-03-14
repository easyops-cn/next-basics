import { mount, shallow } from "enzyme";
import React, { useRef } from "react";
import useImageTransform from "./useImageTransform";

jest.mock("rc-util/lib/Dom/css", () => {
  const getClientSize = () => {
    return {
      width: 400,
      height: 400,
    };
  };

  return {
    getClientSize,
  };
});

const Mock = () => {
  const imgRef = useRef<HTMLImageElement>();
  const { transform, resetTransform, updateTransform, dispatchZoomChange } =
    useImageTransform(imgRef);
  return (
    <div>
      <div id="resetTransformBtn" onClick={resetTransform}></div>
      <div
        id="updateTransformBtn"
        onClick={() => updateTransform({ x: 10, y: 10 })}
      ></div>
      <div
        id="dispatchZoomChangeBtn"
        onClick={() => dispatchZoomChange(0.5)}
      ></div>
      <img
        src="./1.jpg"
        width={100}
        height={100}
        ref={imgRef}
        style={{
          transform: `translate3d(${transform.x}px, ${
            transform.y
          }px, 0) scale3d(${transform.flipX ? "-" : ""}1, ${
            transform.flipY ? "-" : ""
          }1, 1) rotate(90deg)`,
        }}
      />
    </div>
  );
};

describe("useImageTransform", () => {
  it("should work", () => {
    const wrapper = shallow(<Mock />);
    expect(wrapper.find("img").props().style).toEqual({
      transform: "translate3d(0px, 0px, 0) scale3d(1, 1, 1) rotate(90deg)",
    });
  });

  it("updateTransformBtn should work", () => {
    const wrapper = mount(<Mock />);
    wrapper
      .find('[id="updateTransformBtn"]')
      .props()
      .onClick({} as any);
    jest.runAllTimers();
    wrapper.update();
    expect(wrapper.find("img").props().style).toEqual({
      transform: "translate3d(10px, 10px, 0) scale3d(1, 1, 1) rotate(90deg)",
    });

    wrapper
      .find('[id="resetTransformBtn"]')
      .props()
      .onClick({} as any);
    jest.runAllTimers();
    wrapper.update();
    expect(wrapper.find("img").props().style).toEqual({
      transform: "translate3d(0px, 0px, 0) scale3d(1, 1, 1) rotate(90deg)",
    });
  });

  it("dispatchZoomChange should work", () => {
    const wrapper = mount(<Mock />);
    wrapper
      .find('[id="dispatchZoomChangeBtn"]')
      .props()
      .onClick({} as any);
    jest.runAllTimers();
    wrapper.update();
    expect(wrapper.find("img").props().style).toEqual({
      transform: "translate3d(0px, 0px, 0) scale3d(1, 1, 1) rotate(90deg)",
    });
  });
});
