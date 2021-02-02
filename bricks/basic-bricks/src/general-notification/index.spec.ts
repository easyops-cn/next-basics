import ReactDOM from "react-dom";
import "./";
import { notification } from "antd";

const spyOnRender = jest
  .spyOn(ReactDOM, "render")
  .mockImplementation(() => null);
const unmountComponentAtNode = jest
  .spyOn(ReactDOM, "unmountComponentAtNode")
  .mockImplementation(() => null);
jest.mock("antd");
describe("basic-bricks.general-notification", () => {
  it("should create a custom element", () => {
    const element = document.createElement("basic-bricks.general-notification");
    (element as any).icon = "smile";
    (element as any).message = "有话好好说";
    (element as any).duration = "smile";
    (element as any).placement = "topRight";
    (element as any).description = "安红，额想你";
    (element as any).iconStyle = { color: "#108ee9" };
    expect(spyOnRender).not.toBeCalled();
    document.body.appendChild(element);
    document.body.removeChild(element);
    expect(unmountComponentAtNode).toBeCalled();
  });

  const events = [["click"], ["close"]];

  it.each<[string]>(events)("should dispatch %s event", (event) => {
    const mockEventListener = jest.fn((e) => null);
    const element = document.createElement("basic-bricks.general-notification");
    element.addEventListener(
      `general.notification.${event}`,
      mockEventListener
    );
    document.body.appendChild(element);

    (element as any)[
      `handle${event.charAt(0).toUpperCase() + event.slice(1)}`
    ]();
    expect(
      (mockEventListener.mock.calls[
        mockEventListener.mock.calls.length - 1
      ][0] as CustomEvent).detail
    ).toEqual({});
    document.body.removeChild(element);
  });
  const cases = [
    [
      "success",
      {
        message: "success title",
        description: "description success",
        duration: 5,
      },
      {
        message: "success title",
        description: "description success",
        duration: 5,
      },
    ],
    [
      "error",
      {
        message: "error title",
        description: "description error",
        placement: "bottomRight",
      },
      {
        message: "error title",
        description: "description error",
        placement: "bottomRight",
      },
    ],
    [
      "info",
      {
        message: "info title",
        description: "description info",
        duration: 5,
        placement: "bottomRight",
      },
      {
        message: "info title",
        description: "description info",
        duration: 5,
        placement: "bottomRight",
      },
    ],
    [
      "warning",
      {
        message: "warning title",
        description: "description warning",
        duration: 5,
        placement: "topLeft",
      },
      {
        message: "warning title",
        description: "description warning",
        duration: 5,
        placement: "topLeft",
      },
    ],
    [
      "warn",
      {
        message: "warn title",
        description: "description warn",
        duration: 5,
        placement: "topLeft",
      },
      {
        message: "warn title",
        description: "description warn",
        duration: 5,
        placement: "topLeft",
      },
    ],
    [
      "open",
      {
        message: "open title",
        description: "description open",
        duration: 5,
        placement: "topLeft",
        icon: "smile",
        iconStyle: { color: "red" },
      },
      {
        message: "open title",
        description: "description open",
        duration: 5,
        placement: "topLeft",
      },
    ],
  ];
  it.each<[string, Record<string, any>, Record<string, any>]>(cases)(
    "should call method %s of notification",
    (method, config, expection) => {
      const element = document.createElement(
        "basic-bricks.general-notification"
      );
      Object.entries(config).forEach(([k, v]) => {
        (element as any)[k] = v;
      });
      document.body.appendChild(element);
      const spyNotification = jest.spyOn(notification, method);
      (element as any).open(method);
      expect(spyNotification).toHaveBeenCalledWith(
        expect.objectContaining(expection)
      );
      document.body.removeChild(element);
    }
  );
});
