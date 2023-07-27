import ReactDOM from "react-dom";
import "./";

const spyOnRender = jest
  .spyOn(ReactDOM, "render")
  .mockImplementation(() => null);
const unmountComponentAtNode = jest
  .spyOn(ReactDOM, "unmountComponentAtNode")
  .mockImplementation(() => null);

describe("developers.illustration-card", () => {
  it("should create a custom element", () => {
    const element = document.createElement("developers.illustration-card-list");
    (element as any).dataSource = [
      { category: "default", color: "pink", name: "a" },
      { category: "default", color: "pink", name: "b" },
    ];
    expect(spyOnRender).not.toBeCalled();
    document.body.appendChild(element);
    expect(spyOnRender).toBeCalled();
    document.body.removeChild(element);
    expect(unmountComponentAtNode).toBeCalled();
  });
});
