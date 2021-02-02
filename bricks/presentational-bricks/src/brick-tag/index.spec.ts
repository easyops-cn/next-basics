import ReactDOM from "react-dom";
import "./";

const spyOnRender = jest.spyOn(ReactDOM, "render").mockImplementation(() => {});
const unmountComponentAtNode = jest
  .spyOn(ReactDOM, "unmountComponentAtNode")
  .mockImplementation((() => {}) as any);

describe("brick-tag", () => {
  it("should create a custom element", async () => {
    const element = document.createElement("presentational-bricks.brick-tag");
    // Always waiting for async `(dis)connectedCallback`
    await jest.runAllTimers();
    expect(spyOnRender).not.toBeCalled();
    Object.assign(element, {
      showCard: true,
      componentType: "CheckableTag",
      tagList: ["a", "b", "c"],
      configProps: {
        closable: true,
        color: "#108ee9"
      },
      fields: {
        label: "name",
        key: "id"
      },
      textEllipsis: true,
      tagStyle: {
        color: "#ffffff"
      },
      tagCheckedStyle: {
        color: "#cccccc"
      },
      tagHoverStyle: {
        cursor: "pointer"
      },
      multipleCheck: false,
      dataSource: [
        {
          name: "kk",
          id: "1"
        },
        {
          name: "ly",
          id: "2"
        }
      ],
      label: "label: ",
      default: "b"
    });
    document.body.appendChild(element);
    await jest.runAllTimers();
    expect(spyOnRender).toBeCalled();
    Object.assign(element, {
      showCard: false,
      componentType: "Tag",
      fields: {
        label: "name",
        key: "id",
        dataSource: "input"
      },
      dataSource: {
        input: []
      }
    });
    document.body.removeChild(element);
    await jest.runAllTimers();
    expect(unmountComponentAtNode).toBeCalled();
  });
});
