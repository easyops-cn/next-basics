import ReactDOM from "react-dom";
import "./";

const spyOnRender = jest
  .spyOn(ReactDOM, "render")
  .mockImplementation(() => void 0);
const unmountComponentAtNode = jest
  .spyOn(ReactDOM, "unmountComponentAtNode")
  .mockImplementation((() => void 0) as any);

jest.spyOn(console, "warn").mockImplementation(() => void 0);

describe("presentational-bricks.brick-humanize-time", () => {
  it("should create a custom element", async () => {
    const element = document.createElement(
      "presentational-bricks.brick-humanize-time"
    ) as any;
    Object.assign(element, {
      dataSource: {},
      fields: { value: "" },
      isCostTime: false,
      isMillisecond: true,
      formatter: "accurate",
    });
    // Always waiting for async `(dis)connectedCallback`
    await jest.runAllTimers();
    expect(spyOnRender).not.toBeCalled();
    document.body.appendChild(element);
    await jest.runAllTimers();
    expect(spyOnRender).toBeCalled();
    element.value = 1563506779;
    element.link = { detailUrlTemplate: "" };
    document.body.removeChild(element);
    await jest.runAllTimers();
    expect(unmountComponentAtNode).toBeCalled();
  });
});
