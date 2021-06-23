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

let uploadFileElement: UploadFilesElement;
beforeAll(() => {
  uploadFileElement = new UploadFilesElement();
});

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

  describe("upload test", () => {
    it("oversize", async () => {
      uploadFileElement._files = [
        {
          size: 1024 * 1024 * 1024,
        },
      ];
      uploadFileElement.data = {
        a: "a",
      };
      uploadFileElement._handleOnError = jest.fn();

      expect(uploadFileElement._handleOnError).toBeCalledTimes(0);
      await uploadFileElement.upload();
      expect(uploadFileElement._handleOnError).toBeCalledTimes(1);
    });

    it("normalsize", async () => {
      uploadFileElement._files = [
        {
          size: 1024,
        },
      ];
      uploadFileElement.data = {
        a: "a",
      };
      uploadFileElement._handleOnError = jest.fn();

      expect(uploadFileElement._handleOnError).toBeCalledTimes(0);
      await uploadFileElement.upload();
      expect(uploadFileElement._handleOnError).toBeCalledTimes(0);
    });
  });
});
