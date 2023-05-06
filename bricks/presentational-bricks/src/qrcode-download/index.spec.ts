import ReactDOM from "react-dom";
import { QrcodeDownloadElement } from "./";
import "./";

const spyOnRender = jest
  .spyOn(ReactDOM, "render")
  .mockImplementation(() => null);
const unmountComponentAtNode = jest
  .spyOn(ReactDOM, "unmountComponentAtNode")
  .mockImplementation(() => null);

describe("presentational-bricks.qrcode-download", () => {
  it("should create a custom element", async () => {
    const element = document.createElement(
      "presentational-bricks.qrcode-download"
    ) as QrcodeDownloadElement;
    element.isEnablePack = true;
    element.domain = "http://static.runoob.com";
    expect(spyOnRender).not.toBeCalled();
    document.body.appendChild(element);
    element.downloadFile(
      [{ url: "/images/demo/demo1.jpg", name: "text" }],
      "APP"
    );
    await (global as any).flushPromises();
    expect(spyOnRender).toBeCalled();
    document.body.removeChild(element);
    expect(unmountComponentAtNode).toBeCalled();
  });

  it("should create a custom element with isEnablePack is false", async () => {
    const element = document.createElement(
      "presentational-bricks.qrcode-download"
    ) as QrcodeDownloadElement;
    element.isEnablePack = false;
    document.body.appendChild(element);
    element.downloadFile(
      [{ url: "http://static.runoob.com/images/demo/demo1.jpg", name: "text" }],
      "APP"
    );
  });

  it("should create a custom element with data is empty", async () => {
    const element = document.createElement(
      "presentational-bricks.qrcode-download"
    ) as QrcodeDownloadElement;
    element.isEnablePack = false;
    document.body.appendChild(element);
    element.downloadFile([], "APP");
  });

  it("should create a custom element with downloadMaxNum is 0", async () => {
    const element = document.createElement(
      "presentational-bricks.qrcode-download"
    ) as QrcodeDownloadElement;
    element.isEnablePack = false;
    element.downloadMaxNum = 0;
    document.body.appendChild(element);
    element.downloadFile(
      [{ url: "http://static.runoob.com/images/demo/demo1.jpg", name: "text" }],
      "APP"
    );
  });
});
