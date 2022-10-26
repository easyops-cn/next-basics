import React from "react";
import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { GeneralPopup } from "./GeneralPopup";

jest.mock("@next-core/brick-utils", () => ({
  JsonStorage: jest.fn(() => {
    return {
      getItem: () => [66, 66],
      setItem: jest.fn(),
    };
  }),
  debounceByAnimationFrame: jest.fn((fn) => fn),
}));

window.innerWidth = 1000;
window.innerHeight = 500;

const originalOffsetWidth = Object.getOwnPropertyDescriptor(
  HTMLElement.prototype,
  "offsetWidth"
);
const originalOffsetHeight = Object.getOwnPropertyDescriptor(
  HTMLElement.prototype,
  "offsetHeight"
);
const getBoundingClientRectSpy = jest.fn(() => ({ width: 600, height: 400 }));
beforeAll(() => {
  Object.defineProperty(HTMLElement.prototype, "offsetWidth", {
    configurable: true,
    value: 600,
  });
  Object.defineProperty(HTMLElement.prototype, "offsetHeight", {
    configurable: true,
    value: 400,
  });
  Object.defineProperty(HTMLElement.prototype, "getBoundingClientRect", {
    configurable: true,
    value: getBoundingClientRectSpy,
  });
});

afterAll(() => {
  Object.defineProperty(
    HTMLElement.prototype,
    "offsetHeight",
    originalOffsetHeight
  );
  Object.defineProperty(
    HTMLElement.prototype,
    "offsetWidth",
    originalOffsetWidth
  );
});

describe("GeneralPopup", () => {
  it("popup should work", async () => {
    const props = {
      visible: true,
      modalTitle: "title",
      popupWidth: 600,
      popupHeight: 400,
    };
    const { baseElement } = render(<GeneralPopup {...props} />);
    const GeneralPopupElement =
      baseElement.getElementsByClassName("GeneralPopup");
    expect(GeneralPopupElement.length).toBe(1);
    // init position
    expect((GeneralPopupElement[0] as HTMLElement).style.transform).toBe(
      "translate(200px, 50px)"
    );

    const headerElement = baseElement.getElementsByClassName(
      "general-popup-header"
    );

    const event = new MouseEvent("mousedown", {
      bubbles: true,
      cancelable: true,
    });

    Object.defineProperty(event, "offsetX", { get: () => 20 });
    Object.defineProperty(event, "offsetY", { get: () => 10 });

    fireEvent(headerElement[0], event);

    window.dispatchEvent(
      new MouseEvent("mousemove", {
        clientX: 100,
        clientY: 100,
      })
    );
    window.dispatchEvent(new MouseEvent("mouseup", {}));

    expect((GeneralPopupElement[0] as HTMLElement).style.transform).toBe(
      "translate(80px, 90px)"
    );

    // move to outside window
    // left top
    fireEvent(headerElement[0], event);

    window.dispatchEvent(
      new MouseEvent("mousemove", {
        clientX: -100,
        clientY: -100,
      })
    );

    window.dispatchEvent(new MouseEvent("mouseup", {}));

    expect((GeneralPopupElement[0] as HTMLElement).style.transform).toBe(
      "translate(0px, 0px)"
    );

    // right top
    fireEvent(headerElement[0], event);

    window.dispatchEvent(
      new MouseEvent("mousemove", {
        clientX: 1200,
        clientY: 0,
      })
    );

    window.dispatchEvent(new MouseEvent("mouseup", {}));

    expect((GeneralPopupElement[0] as HTMLElement).style.transform).toBe(
      "translate(400px, 0px)"
    );

    // left bottom
    fireEvent(headerElement[0], event);

    window.dispatchEvent(
      new MouseEvent("mousemove", {
        clientX: -100,
        clientY: 600,
      })
    );

    window.dispatchEvent(new MouseEvent("mouseup", {}));

    expect((GeneralPopupElement[0] as HTMLElement).style.transform).toBe(
      "translate(0px, 100px)"
    );

    // right bottom
    fireEvent(headerElement[0], event);

    window.dispatchEvent(
      new MouseEvent("mousemove", {
        clientX: 1200,
        clientY: 600,
      })
    );
    window.dispatchEvent(new MouseEvent("mouseup", {}));

    expect((GeneralPopupElement[0] as HTMLElement).style.transform).toBe(
      "translate(400px, 100px)"
    );
  });

  it("popup should hidden", () => {
    const props = {
      visible: false,
      modalTitle: "title",
    };
    const { baseElement } = render(<GeneralPopup {...props} />);
    const GeneralPopupElement =
      baseElement.getElementsByClassName("GeneralPopup");
    expect(GeneralPopupElement.length).toBe(0);
  });

  it("popup should use localstory position", async () => {
    const props = {
      visible: false,
      modalTitle: "title",
      popupWidth: 600,
      popupHeight: 400,
      popupId: "a",
      namespace: "popup-",
    };
    const { baseElement, rerender } = render(<GeneralPopup {...props} />);
    rerender(<GeneralPopup {...props} visible={true} />);
    const GeneralPopupElement =
      baseElement.getElementsByClassName("GeneralPopup");

    expect((GeneralPopupElement[0] as HTMLElement).style.transform).toBe(
      "translate(66px, 66px)"
    );
  });
});
