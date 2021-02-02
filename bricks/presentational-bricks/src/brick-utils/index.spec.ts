import ReactDOM from "react-dom";
import { message } from "antd";
import { copyToClipboard } from "@next-libs/clipboard";
import "./";

jest.mock("antd");
jest.mock("@next-libs/clipboard");

const spyOnRender = jest
  .spyOn(ReactDOM, "render")
  .mockImplementation(() => null);
const unmountComponentAtNode = jest
  .spyOn(ReactDOM, "unmountComponentAtNode")
  .mockImplementation((() => null) as any);

describe("presentational-bricks.brick-utils", () => {
  beforeAll(() => {
    jest.spyOn(console, "warn").mockImplementation(() => null);
  });

  it("should handle http error", async () => {
    const element = document.createElement(
      "presentational-bricks.brick-utils"
    ) as any;
    // Always waiting for async `(dis)connectedCallback`
    await jest.runAllTimers();
    expect(spyOnRender).not.toBeCalled();
    document.body.appendChild(element);
    await jest.runAllTimers();

    const spy = jest.spyOn(element, "handleHttpError");
    const getListPromise = () =>
      Promise.reject({ detail: "error" }).catch(err =>
        element.handleHttpError(err)
      );
    await getListPromise();
    expect(spy).toHaveBeenCalledWith({ detail: "error" });
  });

  it("message.xx should work", async () => {
    const element = document.createElement(
      "presentational-bricks.brick-utils"
    ) as any;
    // Always waiting for async `(dis)connectedCallback`
    await jest.runAllTimers();
    expect(spyOnRender).not.toBeCalled();
    document.body.appendChild(element);
    await jest.runAllTimers();

    const spyMessage = jest.spyOn(message, "success");
    element.message("success", "更新成功");

    expect(spyMessage).toHaveBeenCalled();
  });

  it("copy should work", () => {
    const element = document.createElement(
      "presentational-bricks.brick-utils"
    ) as any;

    (copyToClipboard as jest.Mock).mockReturnValueOnce(true);
    const spyMessage = jest.spyOn(message, "success");
    element.copy("hello");
    expect(spyMessage).toHaveBeenCalled();

    (copyToClipboard as jest.Mock).mockReturnValueOnce(false);
    const spyMessageError = jest.spyOn(message, "error");
    element.copy("may fail");
    expect(spyMessageError).toHaveBeenCalled();
  });

  it("copyTargetProperty should work", () => {
    const element = document.createElement(
      "presentational-bricks.brick-utils"
    ) as any;
    document.body.appendChild(element);
    const div = document.createElement("div");
    div.id = "target";
    div.title = "text in title";
    document.body.appendChild(div);

    (copyToClipboard as jest.Mock).mockReturnValue(true);
    const spyCopy = jest.spyOn(element, "copy");
    element.copyTargetProperty("#target", "title");
    expect(spyCopy).toBeCalledWith("text in title");

    const spyMessageWarn = jest.spyOn(message, "warn");
    element.copyTargetProperty("element-not-exists", "x");
    expect(spyMessageWarn).toHaveBeenCalled();
  });
});
