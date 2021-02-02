import ReactDOM from "react-dom";
import { CardItemElement } from "./";
import "./";

const spyOnRender = jest
  .spyOn(ReactDOM, "render")
  .mockImplementation(jest.fn());
const unmountComponentAtNode = jest
  .spyOn(ReactDOM, "unmountComponentAtNode")
  .mockImplementation(jest.fn());

describe("presentational-bricks.card-item", () => {
  it("should create a custom element", async () => {
    const element = document.createElement(
      "presentational-bricks.card-item"
    ) as CardItemElement;
    // Always waiting for async `(dis)connectedCallback`
    await jest.runAllTimers();
    expect(spyOnRender).not.toBeCalled();
    Object.assign(element, {
      urlTemplate: "/#{id}",
      fields: {
        cardTitle: "name",
        descriptionList: "descriptionList",
        icon: "icon"
      }
    });
    document.body.appendChild(element);
    await jest.runAllTimers();
    Object.assign(element, {
      dataSource: {
        id: "1",
        name: "k8s",
        descriptionList: ["Deployment 工作模式", "1 个负载均衡器"],
        icon: "newIcon"
      }
    });
    expect(spyOnRender).toBeCalled();
    const mutableProps = {};
    element.initData(mutableProps);
    expect(mutableProps).toEqual({
      cardTitle: "k8s",
      descriptionList: ["Deployment 工作模式", "1 个负载均衡器"],
      icon: "newIcon"
    });
    element.dispatchEvent(
      new MouseEvent("click", {
        bubbles: true
      })
    );
    document.body.removeChild(element);
    await jest.runAllTimers();
    expect(unmountComponentAtNode).toBeCalled();
  });
  it("should work with getDescriptionList", () => {
    const element = document.createElement(
      "presentational-bricks.card-item"
    ) as CardItemElement;
    const descriptionList1 = [
      { label: "目标", field: "target" },
      { label: "插件", field: "plugin" }
    ];
    const descriptionList2 = [
      { label: "目标", field: "target", value: "custom" },
      { label: "插件", field: "plugin", value: "collector" }
    ];
    const dataSource1 = {
      title: "k8s",
      target: "GAG服务",
      plugin: "信息采集"
    };
    const dataSource2 = {
      title: "k8s"
    };
    expect(element.getDescriptionList(descriptionList1, dataSource1)).toEqual([
      {
        label: "目标",
        field: "target",
        value: "GAG服务"
      },
      {
        label: "插件",
        field: "plugin",
        value: "信息采集"
      }
    ]);
    expect(element.getDescriptionList(descriptionList2, dataSource2)).toEqual([
      {
        label: "目标",
        field: "target",
        value: "custom"
      },
      {
        label: "插件",
        field: "plugin",
        value: "collector"
      }
    ]);
  });
});
