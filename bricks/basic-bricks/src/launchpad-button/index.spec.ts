import ReactDOM from "react-dom";
import "./";
jest.mock("../app-bar/LaunchpadService", () => {
  return {
    launchpadService: {
      fetchFavoriteList: () => [],
    },
  };
});

const spyOnRender = jest
  .spyOn(ReactDOM, "render")
  .mockImplementation(() => null);
const unmountComponentAtNode = jest
  .spyOn(ReactDOM, "unmountComponentAtNode")
  .mockImplementation(() => null);

describe("basic-bricks.launchpad-button", () => {
  it("should create a custom element", () => {
    const element = document.createElement("basic-bricks.launchpad-button");
    expect(spyOnRender).not.toBeCalled();
    document.body.appendChild(element);
    expect(spyOnRender).toBeCalled();
    document.body.removeChild(element);
    expect(unmountComponentAtNode).toBeCalled();
  });
});
