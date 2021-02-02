import ReactDOM from "react-dom";
import "./";

const spyOnRender = jest.spyOn(ReactDOM, "render").mockImplementation(() => {});
const unmountComponentAtNode = jest
  .spyOn(ReactDOM, "unmountComponentAtNode")
  .mockImplementation((() => {}) as any);

describe("brick-descriptions", () => {
  it("should create a custom element", async () => {
    const element = document.createElement(
      "presentational-bricks.brick-descriptions"
    );
    // Always waiting for async `(dis)connectedCallback`
    await jest.runAllTimers();
    expect(spyOnRender).not.toBeCalled();
    document.body.appendChild(element);
    await jest.runAllTimers();
    expect(spyOnRender).toBeCalled();
    Object.assign(element, {
      showCard: true,
      itemList: [
        {
          label: "UserName",
          field: "name"
        },
        {
          label: "Age",
          field: "age"
        },
        {
          text: "secret",
          label: "phoneNumber"
        }
      ],
      configProps: {
        title: "User Info"
      },
      dataSource: {
        name: "Lynette",
        age: "18"
      }
    });
    element.showCard = false;
    document.body.removeChild(element);
    await jest.runAllTimers();
    expect(unmountComponentAtNode).toBeCalled();
  });
});
