import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Image from "./Image";

describe("Image", () => {
  it("snapshot", () => {
    const { asFragment } = render(<Image src="./1.jpg" width={200} />);

    expect(asFragment().firstChild).toMatchSnapshot();
  });

  it("With click", () => {
    const onClickMock = jest.fn();
    const { container } = render(<Image src="./1.jpg" onClick={onClickMock} />);

    fireEvent.click(container.querySelector(".rc-image"));

    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  it("With click when disable preview", () => {
    const onClickMock = jest.fn();
    const { container } = render(
      <Image src="./1.jpg" onClick={onClickMock} preview={false} />
    );

    fireEvent.click(container.querySelector(".rc-image"));

    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  it("className and style props should work on img element", () => {
    const { container } = render(
      <Image
        src="./1.jpg"
        className="img"
        style={{
          objectFit: "cover",
        }}
      />
    );
    const img = container.querySelector("img");
    expect(img.className).toEqual("rc-image-img img");
    expect(img.style.getPropertyValue("object-fit")).toEqual("cover");
  });

  it("wrapperClassName and wrapperStyle should work on image wrapper element", () => {
    const { container } = render(
      <Image
        src="./1.jpg"
        wrapperClassName="wrapper"
        wrapperStyle={{
          objectFit: "cover",
        }}
      />
    );
    const wrapperElement = container.querySelector("img").parentElement;
    expect(wrapperElement.className).toEqual("rc-image wrapper");
    expect(wrapperElement.style.getPropertyValue("object-fit")).toEqual(
      "cover"
    );
  });

  it('preview mask should be hidden when image has style { display: "none" }', () => {
    const { container } = render(
      <Image
        src="./1.jpg"
        style={{
          display: "none",
        }}
        preview={{ mask: "Click to Preview" }}
      />
    );
    const maskElement = container.querySelector(".rc-image-mask");
    expect(maskElement.style.getPropertyValue("display")).toEqual("none");
  });
});
