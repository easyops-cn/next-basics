import ReactDOM from "react-dom";
import "./";

const spyOnRender = jest
  .spyOn(ReactDOM, "render")
  .mockImplementation(() => null);
const unmountComponentAtNode = jest
  .spyOn(ReactDOM, "unmountComponentAtNode")
  .mockImplementation(() => null);

describe("presentational-bricks.collapsible-card-item", () => {
  it("should create a custom element", async () => {
    const element = document.createElement(
      "presentational-bricks.collapsible-card-item"
    );
    Object.assign(element, {
      fields: {
        cardTitle: "name",
      },
      dataSource: {
        name: "gitlab",
      },
      hoverable: false,
      cardStyle: {
        border: "none",
      },
    });
    // Always waiting for async `(dis)connectedCallback`
    await jest.runAllTimers();
    expect(spyOnRender).not.toBeCalled();
    document.body.appendChild(element);
    await jest.runAllTimers();
    element.open();
    expect(element.isActive).toBe(true);
    element.close();
    expect(element.isActive).toBe(false);
    element.toggle();
    expect(element.isActive).toBe(true);
    expect(spyOnRender).toBeCalled();
    element.dispatchEvent(
      new MouseEvent("click", {
        bubbles: true,
      })
    );
    element.disableClickHeaderToOpen = true;
    element.dispatchEvent(
      new MouseEvent("click", {
        bubbles: true,
      })
    );
    document.body.removeChild(element);
    await jest.runAllTimers();
    expect(unmountComponentAtNode).toBeCalled();
  });
});
