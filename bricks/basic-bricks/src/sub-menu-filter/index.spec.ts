import ReactDOM from "react-dom";
import "./";

const spyOnRender = jest
  .spyOn(ReactDOM, "render")
  .mockImplementation(() => null);
const unmountComponentAtNode = jest
  .spyOn(ReactDOM, "unmountComponentAtNode")
  .mockImplementation(() => null);
const mockEventListener = jest.fn((e) => null);

describe("basic-bricks.sub-menu-filter", () => {
  it("should create a custom element", () => {
    const element = document.createElement("basic-bricks.sub-menu-filter");
    (element as any).placeholder = "fakePlaceholder";
    (element as any).selectable = true;
    (element as any).searchable = true;
    (element as any).defaultSelectedKeys = ["c++"];
    (element as any).defaultOpenKeys = ["language"];
    (element as any).multiple = true;
    (element as any).suffixBrick = {
      useBrick: {
        brick: "div",
      },
    };
    (element as any).menuItems = [
      {
        type: "item",
        title: "全部",
        key: "All",
        count: 100,
        icon: {
          lib: "fa",
          icon: "cube",
        },
      },
    ];
    expect(spyOnRender).not.toBeCalled();
    document.body.appendChild(element);
    expect(spyOnRender).toBeCalled();
    document.body.removeChild(element);
    expect(unmountComponentAtNode).toBeCalled();
  });

  it("should be call menu.select event", async () => {
    const element = document.createElement("basic-bricks.sub-menu-filter");
    (element as any).placeholder = "fakePlaceholder";
    (element as any).selectable = true;
    (element as any).defaultSelectedKeys = ["c++"];
    (element as any).defaultOpenKeys = ["language"];
    (element as any).suffixBrick = {
      useBrick: {
        brick: "div",
      },
    };
    (element as any).menuItems = [
      {
        type: "item",
        title: "全部",
        key: "All",
        count: 100,
        icon: {
          lib: "fa",
          icon: "cube",
        },
      },
    ];

    element.addEventListener("menu.select", mockEventListener);
    document.body.appendChild(element);
    await jest.runAllTimers();
    spyOnRender.mock.calls[spyOnRender.mock.calls.length - 1][0][
      "props"
    ].children["props"].onSelect(["a", "b"]);
    expect(
      (mockEventListener.mock.calls[
        mockEventListener.mock.calls.length - 1
      ][0] as CustomEvent).detail
    ).toEqual(["a", "b"]);
    mockEventListener.mockClear();
  });

  it("should be call menu.search event", async () => {
    const element = document.createElement("basic-bricks.sub-menu-filter");
    (element as any).placeholder = "fakePlaceholder";
    (element as any).selectable = true;
    (element as any).defaultSelectedKeys = ["c++"];
    (element as any).defaultOpenKeys = ["language"];
    (element as any).suffixBrick = {
      useBrick: {
        brick: "div",
      },
    };
    (element as any).menuItems = [
      {
        type: "item",
        title: "全部",
        key: "All",
        count: 100,
        icon: {
          lib: "fa",
          icon: "cube",
        },
      },
    ];

    element.addEventListener("menu.search", mockEventListener);

    document.body.appendChild(element);
    await jest.runAllTimers();
    spyOnRender.mock.calls[spyOnRender.mock.calls.length - 1][0][
      "props"
    ].children["props"].onSearch(["q"]);
    expect(
      (mockEventListener.mock.calls[
        mockEventListener.mock.calls.length - 1
      ][0] as CustomEvent).detail
    ).toEqual(["q"]);
  });
});
