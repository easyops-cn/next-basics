import ReactDOM from "react-dom";
import "./";

const spyOnRender = jest
  .spyOn(ReactDOM, "render")
  .mockImplementation(() => null);
const unmountComponentAtNode = jest
  .spyOn(ReactDOM, "unmountComponentAtNode")
  .mockImplementation(() => null);

describe("presentational-bricks.basic-icon", () => {
  it("should create a custom element", async () => {
    const element = document.createElement("presentational-bricks.basic-icon");
    Object.assign(element, {
      icon: {
        lib: "fa",
        icon: "angle-left",
        prefix: "fas",
        color: "#167be0",
      },
      renderBg: true,
      bgColor: "#ff0000",
      bgSize: "58px",
      size: "29px",
    });
    expect(spyOnRender).not.toBeCalled();
    document.body.appendChild(element);
    await jest.runAllTimers();
    expect(spyOnRender).toBeCalled();
    document.body.removeChild(element);
    await jest.runAllTimers();
    expect(unmountComponentAtNode).toBeCalled();
  });
});
