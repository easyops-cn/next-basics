import React from "react";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
import { Upload, Modal, message, Input } from "antd";
import { RcFile } from "antd/lib/upload/interface";
import { http } from "@next-core/brick-http";
import { UploadImg } from "./UploadImg";

jest.mock("@next-core/brick-http");

HTMLCanvasElement.prototype.getContext = jest.fn();
window.URL.createObjectURL = jest.fn();

const fileList = [
  {
    uid: "123",
    size: 1234,
    type: "image/png",
    name: "image",
    status: "done",
    url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
  },
];

describe("UploadImg", () => {
  it("should work", async () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <UploadImg
        bucketName="agile"
        value={{
          text: "desc",
        }}
        listType="picture-card"
        onChange={onChange}
        showTextarea={true}
      />
    );
    expect(wrapper.find(Input.TextArea).text()).toBe("desc");
    wrapper.find(Input.TextArea).invoke("onChange")({
      target: {
        value: "",
      },
    });
    await Promise.resolve();
    expect(onChange).toHaveBeenCalled();
    message.error = jest.fn();
    wrapper.find(Upload).invoke("onChange")({
      file: {
        uid: "123",
        size: 1234,
        type: "application/json",
        name: "json",
        status: "done",
        url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
      },
      fileList: [...fileList],
    });
    wrapper.find(Upload).invoke("beforeUpload")(
      {
        uid: "123",
        size: 1234,
        type: "application/json",
        name: "json",
      } as RcFile,
      [...fileList]
    );
    expect(message.error).toHaveBeenCalled();
    wrapper.find(Upload).invoke("onChange")({
      file: {
        uid: "123",
        size: 1234,
        type: "image/png",
        name: "image.png",
        status: "done",
        response: {
          data: {
            objectName: "image.png",
          },
        },
      },
      fileList: [...fileList],
    });
    expect(wrapper.find(".ant-upload-list-item").length).toBe(1);
    wrapper.find(Upload).invoke("onChange")({
      file: {
        uid: "123",
        size: 1234,
        type: "image/png",
        name: "image.png",
        status: "removed",
        response: {
          data: {
            objectName: "image.png",
          },
        },
      },
      fileList: [],
    });
    await jest.runAllTimers();
    wrapper.update();
    expect(wrapper.find(".ant-upload-list-item").length).toBe(0);
    wrapper.find(Upload).invoke("onChange")({
      file: {
        uid: "-img1",
        size: 1024,
        type: "image/png",
        name: "image.png",
        status: "uploading",
        response: {
          data: {
            objectName: "image.png",
          },
        },
      },
      fileList: [
        ...fileList,
        {
          uid: "-img1",
          size: 1024,
          type: "image/png",
          name: "image.png",
          status: "uploading",
          response: {
            data: {
              objectName: "image.png",
            },
          },
        },
      ],
    });
    expect(wrapper.find(Upload).prop("disabled")).toBe(true);
    wrapper.find(Input.TextArea).invoke("onPaste")({
      clipboardData: {
        items: [
          {
            getAsFile: jest.fn(
              () => new File([], "xxx.json", { type: "application/json" })
            ),
          },
        ],
      },
    });
    expect(message.error).not.toBeCalledWith("还有附件正在上传，请稍候再试。");
    wrapper.find(Input.TextArea).invoke("onPaste")({
      clipboardData: {
        items: [
          {
            getAsFile: jest.fn(
              () => new File([], "xxx.png", { type: "image/png" })
            ),
          },
        ],
      },
    });
    expect(message.error).toBeCalledWith("还有附件正在上传，请稍候再试。");
    await act(async () => {
      wrapper.find(Upload).invoke("onPreview")({
        size: 1024,
        name: "123",
        type: "image/png",
        uid: "-3",
        status: "done",
        originFileObj: new File([], "xxx.png", { type: "image/png" }),
      });
      await (global as any).flushPromises();
    });
    wrapper.find(Upload).invoke("onPreview")({
      uid: "123",
      size: 1234,
      type: "image/png",
      name: "image",
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    });
    expect(wrapper.find(Modal).prop("visible")).toBe(true);
    wrapper.find(Modal).invoke("onCancel")({});
    expect(wrapper.find(Modal).prop("visible")).toBe(false);
  });

  it("should work with empty value", async () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <UploadImg
        listType="picture-card"
        onChange={onChange}
        bucketName="agile"
        showTextarea={true}
      />
    );
    expect(wrapper.find(Input.TextArea).text()).toBe("");
    await act(async () => {
      message.error = jest.fn();
      jest.spyOn(http, "put").mockRejectedValueOnce(new Error("http error"));
      wrapper.find(Input.TextArea).invoke("onPaste")({
        clipboardData: {
          items: [
            {
              getAsFile: jest.fn(
                () => new File([], "xxx.png", { type: "image/png" })
              ),
            },
          ],
        },
      });
      await (global as any).flushPromises();
    });
    expect(message.error).toHaveBeenCalled();
    await act(async () => {
      message.error = jest.fn();
      jest.spyOn(http, "put").mockResolvedValueOnce({
        data: {
          objectName: "newImage.png",
        },
      });
      wrapper.find(Input.TextArea).invoke("onPaste")({
        clipboardData: {
          items: [
            {
              getAsFile: jest.fn(
                () => new File([], "newImage.png", { type: "image/png" })
              ),
            },
          ],
        },
      });
      await (global as any).flushPromises();
    });
    wrapper.update();
    expect(wrapper.find(".ant-upload-list-item").length).toBe(1);
  });

  it("test error", async () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <UploadImg
        listType="picture-card"
        onChange={onChange}
        bucketName="agile"
        showTextarea={true}
      />
    );
    wrapper.find(Upload).invoke("onChange")({
      file: {
        uid: "-img1",
        size: 1024,
        type: "image/png",
        name: "image.png",
        status: "uploading",
      },
      fileList: [
        {
          uid: "-img1",
          size: 1024,
          type: "image/png",
          name: "image.png",
          status: "uploading",
        },
      ],
    });
    wrapper.update();
    expect(wrapper.find(".ant-upload-list-item").length).toBe(1);
    wrapper.find(Upload).invoke("onChange")({
      file: {
        uid: "-img1",
        size: 1024,
        type: "image/png",
        name: "image.png",
        status: "error",
      },
      fileList: [],
    });
    await act(async () => {
      await jest.runAllTimers();
    });
    wrapper.update();
    expect(wrapper.find(".ant-upload-list-item").length).toBe(0);
  });

  it("test set value by outside", async () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <UploadImg
        listType="picture-card"
        onChange={onChange}
        bucketName="agile"
        showTextarea={true}
      />
    );
    wrapper.find(Upload).invoke("onChange")({
      file: {
        uid: "-img1",
        size: 1024,
        type: "image/png",
        name: "image.png",
        status: "done",
      },
      fileList: [
        {
          uid: "-img1",
          size: 1024,
          type: "image/png",
          name: "image.png",
          status: "done",
        },
      ],
    });
    wrapper.update();
    expect(wrapper.find(".ant-upload-list-item").length).toBe(1);
    wrapper.setProps({
      value: {
        images: [
          {
            url: "image2.png",
          },
          {
            url: "image2.png",
          },
        ],
      },
    });
    await act(async () => {
      await jest.runAllTimers();
    });
    wrapper.update();
    expect(wrapper.find(".ant-upload-list-item").length).toBe(2);
  });

  it("test maxNumber and showTextarea", async () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <UploadImg
        listType="picture-card"
        onChange={onChange}
        bucketName="agile"
        maxNumber={1}
      />
    );
    await act(async () => {
      wrapper.find(Upload).invoke("onChange")({
        file: {
          uid: "-img1",
          size: 1024,
          type: "image/png",
          name: "image.png",
          status: "done",
          response: {
            data: {
              objectName: "image.png",
            },
          },
          originFileObj: new File([], "image.png", { type: "image/png" }),
        },
        fileList: [
          {
            uid: "-img1",
            size: 1024,
            type: "image/png",
            name: "image.png",
            status: "done",
            response: {
              data: {
                objectName: "image.png",
              },
            },
            originFileObj: new File([], "image.png", { type: "image/png" }),
          },
        ],
      });
      await (global as any).flushPromises();
    });
    wrapper.update();
    expect(wrapper.find(".ant-upload-list-item").length).toBe(0);
    wrapper.setProps({
      maxNumber: 2,
      value: {
        images: [
          {
            url: "image2.png",
          },
          {
            url: "image2.png",
          },
        ],
      },
    });
    await act(async () => {
      await jest.runAllTimers();
    });
    wrapper.update();
    expect(wrapper.find(".ant-upload-list-item").length).toBe(2);
    expect(wrapper.find(Input.TextArea).length).toBe(0);
    expect(wrapper.find(".ant-upload-text").length).toBe(0);
    wrapper.setProps({
      maxNumber: 3,
    });
    expect(wrapper.find(".ant-upload-text").length).toBe(1);
  });

  it("should work when listType is picture", async () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <UploadImg listType="picture" onChange={onChange} bucketName="agile" />
    );
    wrapper.find(Upload).invoke("onChange")({
      file: {
        uid: "-img1",
        size: 1024,
        percent: 28,
        type: "image/png",
        name: "image.png",
        status: "uploading",
      },
      fileList: [
        {
          uid: "-img1",
          size: 1024,
          percent: 28,
          type: "image/png",
          name: "image.png",
          status: "uploading",
        },
      ],
    });
    wrapper.update();
    expect(wrapper.find(".ant-upload-list-item").length).toBe(1);
    expect(wrapper.find(".upload-file-main-info").length).toBe(1);
    expect(wrapper.find(".upload-file-error-info").length).toBe(1);
    wrapper.find(Upload).invoke("onChange")({
      file: {
        uid: "-img1",
        size: 1024,
        type: "image/png",
        name: "image.png",
        status: "done",
      },
      fileList: [
        {
          uid: "-img1",
          size: 1024,
          type: "image/png",
          name: "image.png",
          status: "done",
        },
      ],
    });
    await act(async () => {
      await jest.runAllTimers();
    });
    wrapper.update();
    expect(wrapper.find(".ant-upload-list-item").length).toBe(1);
    expect(wrapper.find(".upload-file-main-info").length).toBe(1);
    expect(wrapper.find(".upload-file-error-info").length).toBe(0);
    wrapper.find(Upload).invoke("onChange")({
      file: {
        uid: "-img1",
        size: 1024,
        type: "image/png",
        name: "image.png",
        status: "error",
      },
      fileList: [
        {
          uid: "-img1",
          size: 1024,
          type: "image/png",
          name: "image.png",
          status: "error",
        },
      ],
    });
    await act(async () => {
      await jest.runAllTimers();
    });
    wrapper.update();
    expect(wrapper.find(".ant-upload-list-item").length).toBe(0);
    expect(wrapper.find(".upload-file-main-info").length).toBe(0);
    expect(wrapper.find(".upload-file-error-info").length).toBe(0);
  });

  it("test getPreview", async () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <UploadImg
        listType="picture-card"
        onChange={onChange}
        bucketName="agile"
        maxNumber={1}
        getPreview={true}
      />
    );
    await act(async () => {
      wrapper.find(Upload).invoke("onChange")({
        file: {
          uid: "-img1",
          size: 1024,
          type: "image/png",
          name: "image.png",
          status: "done",
          response: {
            data: {
              objectName: "image.png",
            },
          },
          originFileObj: new File([], "image.png", { type: "image/png" }),
        },
        fileList: [
          {
            uid: "-img1",
            size: 1024,
            type: "image/png",
            name: "image.png",
            status: "done",
            response: {
              data: {
                objectName: "image.png",
              },
            },
            originFileObj: new File([], "image.png", { type: "image/png" }),
          },
        ],
      });
      await (global as any).flushPromises();
    });
    wrapper.update();
    expect(onChange).toBeCalledWith({
      images: [
        {
          name: "image.png",
          preview: "data:image/png;base64,",
          url: "api/gateway/object_store.object_store.GetObject/api/v1/objectStore/bucket/agile/object/image.png",
        },
      ],
    });

    const wrapper2 = mount(
      <UploadImg
        listType="picture-card"
        onChange={onChange}
        bucketName="agile"
        maxNumber={2}
        getPreview={true}
      />
    );
    await act(async () => {
      wrapper2.find(Upload).invoke("onChange")({
        file: {
          uid: "-img1",
          size: 1024,
          type: "image/png",
          name: "image.png",
          status: "done",
          response: {
            data: {
              objectName: "image.png",
            },
          },
          originFileObj: new File([], "image.png", { type: "image/png" }),
        },
        fileList: [
          {
            uid: "-img1",
            size: 1024,
            type: "image/png",
            name: "image.png",
            status: "done",
            response: {
              data: {
                objectName: "image.png",
              },
            },
            originFileObj: new File([], "image.png", { type: "image/png" }),
          },
        ],
      });
      await (global as any).flushPromises();
    });
    wrapper2.update();
    expect(onChange).toBeCalledWith({
      images: [
        {
          name: "image.png",
          preview: "data:image/png;base64,",
          url: "api/gateway/object_store.object_store.GetObject/api/v1/objectStore/bucket/agile/object/image.png",
        },
      ],
    });
  });
});
