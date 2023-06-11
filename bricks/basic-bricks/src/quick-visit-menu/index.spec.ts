import ReactDOM from "react-dom";
import "./";

const spyOnRender = jest
  .spyOn(ReactDOM, "render")
  .mockImplementation(() => null);
const unmountComponentAtNode = jest
  .spyOn(ReactDOM, "unmountComponentAtNode")
  .mockImplementation(() => null);

describe("basic-bricks.quick-visit-menu", () => {
  const menu = {
    menuItems: [
      {
        title: "资源",
        items: [
          {
            title: "存储",
            items: [
              {
                text: "腾讯云·云硬盘cbs",
                to: "storage/cbs",
              },
              {
                text: "阿里云·云盘",
                to: "storage/ali-disk",
              },
            ],
          },
          {
            title: "网络",
            items: [
              {
                text: "服务名",
                to: "network/service-name",
              },
              {
                text: "阿里云·SSL证书",
                to: "network/ali-ssl",
              },
            ],
          },
        ],
      },
      {
        title: "服务",
        items: [
          {
            title: "数据库",
            items: [
              {
                text: "MySQL",
                to: "database/mysql",
              },
              {
                text: "MsSQL",
                to: "database/mssql",
              },
            ],
          },
        ],
      },
    ],
  };
  it("should create a custom element", async () => {
    const element = document.createElement("basic-bricks.quick-visit-menu");
    const mockAddEvent = jest.fn();
    const mockRemoveEvent = jest.fn();
    const mockClickEvent = jest.fn();
    const mockDragEvent = jest.fn();
    expect(spyOnRender).not.toBeCalled();
    document.body.appendChild(element);
    expect(spyOnRender).toBeCalled();
    element.addEventListener("menu.add", mockAddEvent);
    element.addEventListener("menu.remove", mockRemoveEvent);
    element.addEventListener("menu.drag", mockDragEvent);
    element.addEventListener("menu.click", mockClickEvent);
    await jest.runAllTimers();
    spyOnRender.mock.calls[spyOnRender.mock.calls.length - 1][0][
      "props"
    ].children["props"].handleMenuAdd(["a", "b"]);
    expect(mockAddEvent).toBeCalled();
    spyOnRender.mock.calls[spyOnRender.mock.calls.length - 1][0][
      "props"
    ].children["props"].handleMenuRemove(["a"]);
    expect(mockRemoveEvent).toBeCalled();
    spyOnRender.mock.calls[spyOnRender.mock.calls.length - 1][0][
      "props"
    ].children["props"].handleMenuClick(["a", "b"]);
    expect(mockClickEvent).toBeCalled();
    spyOnRender.mock.calls[spyOnRender.mock.calls.length - 1][0][
      "props"
    ].children["props"].handleMenuClick("a");
    expect(mockClickEvent).toBeCalled();
    document.body.removeChild(element);
    expect(unmountComponentAtNode).toBeCalled();
  });
});
