import ReactDOM from "react-dom";
import "./";

const spyOnRender = jest.spyOn(ReactDOM, "render").mockImplementation(() => {});
const unmountComponentAtNode = jest
  .spyOn(ReactDOM, "unmountComponentAtNode")
  .mockImplementation((() => {}) as any);

describe("basic-bricks.print-button", () => {
  it("should create a custom element", async () => {
    const element = document.createElement("basic-bricks.print-button");
    // Always waiting for async `(dis)connectedCallback`
    (element as any).right = "10px";
    (element as any).top = "10px";
    (element as any).bottom = "24px";
    (element as any).prefixTitle = "hello";
    (element as any).color = "";
    (element as any).color = "white";
    (element as any).backgroundColor = "";
    (element as any).backgroundColor = "white";
    (element as any).border = "";
    (element as any).border = "1px solid grey";
    (element as any).instanceData = { name: "hello" };
    (element as any).instanceData = {
      name: "hello",
      _object_id: "_TOPO_INSTANCE_VIEW",
      objectId: "APP"
    };

    await jest.runAllTimers();
    expect(spyOnRender).not.toBeCalled();
    document.body.appendChild(element);
    await jest.runAllTimers();
    expect(spyOnRender).toBeCalled();
    document.body.removeChild(element);
    await jest.runAllTimers();
    expect(unmountComponentAtNode).toBeCalled();
  });
});
