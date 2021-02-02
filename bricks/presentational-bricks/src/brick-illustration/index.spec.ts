import ReactDOM from "react-dom";
import "./";

const spyOnRender = jest
  .spyOn(ReactDOM, "render")
  .mockImplementation(() => null);
const unmountComponentAtNode = jest
  .spyOn(ReactDOM, "unmountComponentAtNode")
  .mockImplementation(() => null);

describe("presentational-bricks.brick-illustration", () => {
  it("should create a custom element", () => {
    const element = document.createElement(
      "presentational-bricks.brick-illustration"
    );
    (element as any).header = { title: "Header", description: "desc.." };
    (element as any).footer = {
      label: "word",
      url: "example.com",
      text: "hello",
    };
    (element as any).category = "default";
    (element as any).name = "no-content";
    (element as any).mode = "feedback";

    expect(spyOnRender).not.toBeCalled();
    document.body.appendChild(element);
    expect(spyOnRender).toBeCalled();
    document.body.removeChild(element);
    expect(unmountComponentAtNode).toBeCalled();
  });
});
