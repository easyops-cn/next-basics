import ReactDOM from "react-dom";
import "./";

const spyOnRender = jest
  .spyOn(ReactDOM, "render")
  .mockImplementation(() => null);
const unmountComponentAtNode = jest
  .spyOn(ReactDOM, "unmountComponentAtNode")
  .mockImplementation(() => null);

describe("basic-bricks.general-title", () => {
  it("should create a custom element", async () => {
    const element = document.createElement("basic-bricks.general-title");
    element.dataSource = {
      title: "test",
      desc: "一段描述",
    };
    element.mainTitle = "主机";
    element.description = "描述";
    await jest.runAllTimers();
    expect(spyOnRender).not.toBeCalled();
    document.body.appendChild(element);
    expect(spyOnRender).toBeCalled();
    expect(element.mainTitle).toBe("主机");
    document.body.removeChild(element);
    expect(unmountComponentAtNode).toBeCalled();
  });
});
