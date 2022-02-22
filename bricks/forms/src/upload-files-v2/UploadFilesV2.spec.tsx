import React from "react";
import { act } from "react-dom/test-utils";
import { mount, shallow } from "enzyme";
import { Upload } from "antd";
import { UploadFilesV2 } from "./UploadFilesV2";
import { NS_FORMS, K } from "../i18n/constants";
import * as brickKit from "@next-core/brick-kit";
import { GeneralIcon } from "@next-libs/basic-components";
import i18n from "i18next";
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

const url = `api/gateway/object_store.object_store.PutObject/api/v1/objectStore/bucket/lytest/object`;

describe("UploadFilesV2", () => {
  it("should work", async () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <UploadFilesV2 url={url} value={fileList} onChange={onChange} />
    );
    await Promise.resolve();
    expect(wrapper.find(".ant-upload-list-item").length).toBe(1);
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

    expect(wrapper.find("Button").text()).toBe("Upload");
    expect(wrapper.find("GeneralIcon").at(0).prop("icon")).toEqual({
      lib: "antd",
      icon: "upload",
      theme: "outlined",
    });
    wrapper.setProps({
      uploadButtonProps: {
        buttonName: "Upload Now",
        buttonIcon: {
          lib: "antd",
          icon: "cloud-upload",
          theme: "outlined",
        },
        buttonType: "link",
      },
    });
    wrapper.update();
    expect(wrapper.find("Button").text()).toBe("Upload Now");
    expect(wrapper.find("Button").prop("type")).toBe("link");
    expect(wrapper.find("GeneralIcon").at(0).prop("icon")).toEqual({
      lib: "antd",
      icon: "cloud-upload",
      theme: "outlined",
    });
  });

  it("test remove", async () => {
    const onChange = jest.fn();
    const onRemove = jest.fn();
    const wrapper = mount(
      <UploadFilesV2 url={url} onChange={onChange} onRemove={onRemove} />
    );
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
      },
      fileList: [
        ...fileList,
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
        },
      ],
    });
    wrapper.update();
    expect(wrapper.find(".ant-upload-list-item").length).toBe(2);
    wrapper.find(Upload).invoke("onRemove")({
      uid: "-img1",
      size: 1024,
      type: "image/png",
      name: "image.png",
      response: {
        data: {
          objectName: "image.png",
        },
      },
    });
    wrapper.update();
    expect(onRemove).toHaveBeenCalled();
  });

  it("test error", async () => {
    const onChange = jest.fn();
    const onError = jest.fn();
    const wrapper = mount(
      <UploadFilesV2 url={url} onChange={onChange} onError={onError} />
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
    expect(onError).toHaveBeenCalled();
  });

  it("test set value by outside", async () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <UploadFilesV2 url={url} method="put" onChange={onChange} />
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
      value: [
        {
          url: "image2.png",
        },
        {
          url: "image2.png",
        },
      ],
    });
    await act(async () => {
      await jest.runAllTimers();
    });
    wrapper.update();
    expect(wrapper.find(".ant-upload-list-item").length).toBe(2);
  });

  it("test maxNumber", async () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <UploadFilesV2 url={url} method="put" onChange={onChange} />
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
    expect(wrapper.find(".ant-upload-list-item").length).toBe(1);
    wrapper.setProps({
      maxNumber: 2,
      value: [
        {
          url: "image2.png",
        },
        {
          url: "image2.png",
        },
      ],
    });
    await act(async () => {
      await jest.runAllTimers();
    });
    wrapper.update();
    expect(wrapper.find(".ant-upload-list-item").length).toBe(2);
    expect(
      wrapper.find(".ant-upload-select-text button").prop("disabled")
    ).toBe(true);
    wrapper.setProps({
      maxNumber: 3,
    });
    wrapper.update();
    expect(
      wrapper.find(".ant-upload-select-text button").prop("disabled")
    ).toBe(undefined);
  });

  describe("test limitSize", () => {
    const wrapper = mount(<UploadFilesV2 url={url} method="put" autoUpload />);
    it("while autoUpload is true", async () => {
      wrapper.setProps({
        limitSize: 1,
      });

      const notAllowResult = wrapper.find(Upload).invoke("beforeUpload")(
        {
          size: 1024 * 1024 * 10,
        },
        [
          {
            size: 1024 * 1024 * 10,
          },
        ]
      );
      await expect(notAllowResult).rejects.toStrictEqual(
        new Error(i18n.t(`${NS_FORMS}:${K.VOLUME_TOO_BIG}`))
      );

      wrapper.setProps({
        limitSize: 2,
      });

      const allowResult = wrapper.find(Upload).invoke("beforeUpload")(
        {
          size: 1024 * 1024,
        },
        [
          {
            size: 1024 * 1024,
          },
        ]
      );
      await expect(allowResult).resolves.toMatchObject({
        size: 1024 * 1024,
      });
    });

    it("while autoUpload is false", () => {
      wrapper.setProps({
        autoUpload: false,
      });
      wrapper.update();
      const autoUploadResult = wrapper.find(Upload).invoke("beforeUpload")(
        {
          size: 1024 * 1024,
        },
        [
          {
            size: 1024 * 1024,
          },
        ]
      );
      expect(autoUploadResult).toBeFalsy();
    });
  });

  it("test draggable", async () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <UploadFilesV2
        url={url}
        method="put"
        onChange={onChange}
        hideDragBtnWhenAchieveMax
        uploadDraggable
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
    expect(
      wrapper.find(".ant-upload-drag").hasClass("uploadContainerDisplayNone")
    ).toBeTruthy();
    wrapper.setProps({
      hideDragBtnWhenAchieveMax: false,
      value: [
        {
          url: "image2.png",
        },
      ],
    });
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
    expect(
      wrapper.find(".ant-upload-drag").hasClass("uploadContainerDisplayNone")
    ).toBeFalsy();
  });

  it("should show light icon", () => {
    const syponUseCurrentTheme = jest
      .spyOn(brickKit, "useCurrentTheme")
      .mockReturnValue("dark-v2");
    const wrapper = mount(
      <UploadFilesV2 url={url} value={fileList} uploadDraggable />
    );

    expect(wrapper.find(GeneralIcon).at(0).prop("icon")).toEqual({
      category: "colored-common",
      icon: "upload-dark",
      lib: "easyops",
    });
    syponUseCurrentTheme.mockRestore();
  });
});
