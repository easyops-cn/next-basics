import React from "react";
import { mount } from "enzyme";
import * as brickKit from "@next-core/brick-kit";
import { Upload } from "antd";
import { render } from "@testing-library/react";

import { UploadFiles, UploadFilesProps } from "./UploadFiles";

const file = {
  uid: "123",
  size: 1234,
  type: "image/png",
  name: "image.png",
  response: {
    data: {
      objectName: "image.png",
    },
  },
};

const url = `/api/gateway/cmdb.instance.ImportInstanceWithJson/import/object/_DASHBOARD/instance/json`;

describe("UploadFiles", () => {
  it("should work", () => {
    const result = render(
      <UploadFiles
        url={url}
        name="attachment"
        data={{
          "keys[0]": "instanceId",
        }}
        text={{
          main: "请点击或拖拽仪表盘文件到此区域",
          hint: "文件大小最多10M，支持任意扩展名",
        }}
        onChange={jest.fn}
        onSuccess={jest.fn()}
        onError={jest.fn()}
      />
    );
    const asFragment = result.asFragment;
    expect(asFragment()).toBeTruthy();
  });

  it("should upload with csrfToken", () => {
    jest.spyOn(brickKit, "getAuth").mockReturnValueOnce({ csrfToken: "abcde" });

    const wrapper = mount(
      <UploadFiles
        url={url}
        name="attachment"
        onChange={jest.fn}
        onSuccess={jest.fn()}
        onError={jest.fn()}
      />
    );

    expect(wrapper.find(Upload).prop("headers")).toEqual({
      "X-CSRF-Token": "abcde",
    });
  });

  describe("upload test", () => {
    const onChange = jest.fn();
    const onSuccess = jest.fn();
    const onError = jest.fn();
    const getWrapper = (props?: Partial<UploadFilesProps>) =>
      mount(
        <UploadFiles
          url={url}
          onChange={onChange}
          onSuccess={onSuccess}
          onError={onError}
          {...props}
        />
      );

    describe("handleOnChange", () => {
      it("normal status", () => {
        const wrapper = getWrapper();
        wrapper.find(Upload).invoke("onChange")({
          file: file,
          fileList: [file],
        });
        expect(wrapper.find(".ant-upload-list-item").length).toBe(1);
      });
      it("file status: done", () => {
        const wrapper = getWrapper();
        wrapper.find(Upload).invoke("onChange")({
          file: {
            ...file,
            status: "done",
          },
          fileList: [
            {
              ...file,
              status: "done",
            },
          ],
        });
        expect(onSuccess).toHaveBeenCalledTimes(1);
        expect(wrapper.find(".ant-upload-list-item").length).toBe(1);
      });
      it("file status: error", () => {
        const wrapper = getWrapper();
        wrapper.find(Upload).invoke("onChange")({
          file: {
            ...file,
            status: "error",
          },
          fileList: [
            {
              ...file,
              status: "error",
            },
          ],
        });
        expect(onError).toHaveBeenCalledTimes(1);
        expect(wrapper.find(".ant-upload-list-item").length).toBe(1);
      });
      it("file status: removed", () => {
        const wrapper = getWrapper();
        wrapper.find(Upload).invoke("onChange")({
          file: {
            ...file,
            status: "removed",
          },
          fileList: [
            {
              ...file,
              status: "removed",
            },
          ],
        });
        expect(wrapper.find(".ant-upload-list-item").length).toBe(1);
      });
    });

    describe("file size test", () => {
      describe("normalsize", () => {
        it("while autoUpload is true", async () => {
          const wrapper = getWrapper({
            autoUpload: true,
          });
          const successResult = wrapper.find(Upload).invoke("beforeUpload")(
            file,
            [file]
          );
          await expect(successResult).resolves.toMatchObject({
            size: 1234,
          });
        });

        it("while autoUpload is false", async () => {
          const wrapper = getWrapper({
            autoUpload: false,
          });
          const successResult = wrapper.find(Upload).invoke("beforeUpload")(
            file,
            [file]
          );
          expect(successResult).toBeFalsy();
        });
      });

      it("oversize", async () => {
        const wrapper = getWrapper();
        const errorResult = wrapper.find(Upload).invoke("beforeUpload")(
          {
            ...file,
            size: 1024 * 1024 * 1024,
          },
          [
            {
              ...file,
              size: 1024 * 1024 * 1024,
            },
          ]
        );
        await expect(errorResult).rejects.toStrictEqual(
          new Error("上传文件体积大于限定体积")
        );
      });
    });
  });
});
