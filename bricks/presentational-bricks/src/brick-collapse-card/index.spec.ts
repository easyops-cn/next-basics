import ReactDOM from "react-dom";
import "./";

const spyOnRender = jest.spyOn(ReactDOM, "render").mockImplementation(() => {});
const unmountComponentAtNode = jest
  .spyOn(ReactDOM, "unmountComponentAtNode")
  .mockImplementation((() => {}) as any);

describe("presentational-bricks.brick-collapse-card", () => {
  it("should create a custom element", async () => {
    const element = document.createElement(
      "presentational-bricks.brick-collapse-card"
    );
    // Always waiting for async `(dis)connectedCallback`
    await jest.runAllTimers();
    expect(spyOnRender).not.toBeCalled();
    document.body.appendChild(element);
    await jest.runAllTimers();
    expect(spyOnRender).toBeCalled();
    Object.assign(element, {
      fields: {
        title: "name"
      },
      dataSource: {
        name: "lynette"
      },
      expandActiveText: "收起",
      expandInactiveText: "展开",
      expandActiveIcon: "up",
      expandInactiveIcon: "down",
      isActive: true,
      title: "",
      containerStyle: {
        background: "#ccc"
      },
      headerStyle: {
        padding: "10px"
      },
      contentStyle: {
        padding: "20px"
      },
      hasHeaderSlot: false
    });
    document.body.removeChild(element);
    await jest.runAllTimers();
    expect(unmountComponentAtNode).toBeCalled();
  });

  it("should trigger click event", async () => {
    const element = document.createElement(
      "presentational-bricks.brick-collapse-card"
    );
    await jest.runAllTimers();
    Object.assign(element, {
      fields: {
        dataSource: "list[0]"
      },
      dataSource: {
        name: "lynette",
        list: [
          {
            name: "root"
          }
        ]
      },
      expandActiveText: "收起",
      expandInactiveText: "工具详情",
      expandActiveIcon: "up",
      expandInactiveIcon: "down",
      isActive: false,
      title: "工具"
    });
    await jest.runAllTimers();
    document.body.appendChild(element);
    await jest.runAllTimers();
    const spyOnTogglePanel = jest.spyOn(element, "togglePanel");
    element.dispatchEvent(
      new MouseEvent("click", {
        bubbles: true
      })
    );
    await jest.runAllTimers();
    expect(spyOnTogglePanel).toHaveBeenCalled();
  });
});
