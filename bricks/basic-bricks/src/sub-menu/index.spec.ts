import ReactDOM from "react-dom";
import ".";

const spyOnRender = jest.spyOn(ReactDOM, "render").mockImplementation(() => {});
const unmountComponentAtNode = jest
  .spyOn(ReactDOM, "unmountComponentAtNode")
  .mockImplementation((() => {}) as any);

describe("basic-bricks.sub-menu", () => {
  it("should create a custom element", async () => {
    const element = document.createElement("basic-bricks.sub-menu");
    // Always waiting for async `(dis)connectedCallback`
    await jest.runAllTimers();
    expect(spyOnRender).not.toBeCalled();
    Object.assign(element, {
      dataSource: {
        title: "IP网段管理",
        menuItems: [
          {
            type: "default",
            text: "基本信息",
            to: "/contract/subMenu",
            exact: true
          },
          {
            type: "group",
            title: "资源关系",
            items: [
              {
                text: "所在机柜",
                to: "/contract/subMenu/host"
              },
              {
                text: "运维人员",
                to: "/contract/subMenu/person"
              }
            ]
          }
        ]
      }
    });
    document.body.appendChild(element);
    await jest.runAllTimers();
    expect(spyOnRender).toBeCalled();
    document.body.removeChild(element);
    await jest.runAllTimers();
    expect(unmountComponentAtNode).toBeCalled();
  });
});
