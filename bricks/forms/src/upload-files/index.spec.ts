import ReactDOM from "react-dom";
import "./";
import { UploadFilesElement } from "./";

import { http } from "@next-core/brick-http";

const spyOnRender = jest
  .spyOn(ReactDOM, "render")
  .mockImplementation(() => null);
const unmountComponentAtNode = jest
  .spyOn(ReactDOM, "unmountComponentAtNode")
  .mockImplementation(() => null);

describe("forms.upload-file", () => {
  it("should create a custom element", async () => {
    const element = document.createElement("forms.upload-files");
    expect(spyOnRender).not.toBeCalled();

    (element as UploadFilesElement)._files = [""];
    (element as UploadFilesElement).data = {
      a: "a",
    };

    jest.spyOn(http, "post").mockResolvedValue({});
    await (element as UploadFilesElement).upload();

    document.body.appendChild(element);
    expect(spyOnRender).toBeCalled();
    document.body.removeChild(element);
    expect(unmountComponentAtNode).toBeCalled();
  });
});
