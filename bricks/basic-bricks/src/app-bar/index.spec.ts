import ReactDOM from "react-dom";
import { BreadcrumbItemConf } from "@next-core/brick-types";
import "./";
jest.mock("./LaunchpadService");
const spyOnRender = jest
  .spyOn(ReactDOM, "render")
  .mockImplementation(() => null);
const unmountComponentAtNode = jest
  .spyOn(ReactDOM, "unmountComponentAtNode")
  .mockImplementation(() => null);

describe("app-bar", () => {
  it("should create a custom element", async () => {
    const element = document.createElement("basic-bricks.app-bar") as any;
    const breadcrumb: BreadcrumbItemConf[] = [
      {
        text: "hello",
      },
    ];
    element.breadcrumb = breadcrumb;
    expect(element.breadcrumb).toBe(breadcrumb);
    element.breadcrumb = null;
    expect(element.breadcrumb).toEqual([]);
    // Always waiting for async `(dis)connectedCallback`
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
