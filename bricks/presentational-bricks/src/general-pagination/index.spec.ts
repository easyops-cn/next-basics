import ReactDOM from "react-dom";
import "./";
import { createHistory, getHistory } from "@next-core/brick-kit";

createHistory();

const spyOnRender = jest.spyOn(ReactDOM, "render").mockImplementation(() => {});
const unmountComponentAtNode = jest
  .spyOn(ReactDOM, "unmountComponentAtNode")
  .mockImplementation((() => {}) as any);

const mockEventListener = jest.fn(e => {});
afterEach(() => {
  spyOnRender.mockClear();
});

const props = {
  page: 1,
  pageSize: 10,
  total: 50,
  configProps: {
    showSizeChanger: true
  },
  fields: {
    total: "total"
  },
  dataSource: {
    list: [],
    total: 500
  }
};

describe("presentational-bricks.general-pagination", () => {
  it("should create a custom element", async () => {
    const element = document.createElement(
      "presentational-bricks.general-pagination"
    );
    // Always waiting for async `(dis)connectedCallback`
    await jest.runAllTimers();
    expect(spyOnRender).not.toBeCalled();
    document.body.appendChild(element);
    await jest.runAllTimers();
    expect(spyOnRender).toBeCalled();
    Object.assign(element, props);
    document.body.removeChild(element);
    await jest.runAllTimers();
    expect(unmountComponentAtNode).toBeCalled();
  });

  it(`should dispatch "page.update" when page is changed"`, async () => {
    const element = document.createElement(
      "presentational-bricks.general-pagination"
    );
    Object.assign(element, props);
    element.addEventListener("page.update", mockEventListener);
    document.body.appendChild(element);
    await jest.runAllTimers();
    spyOnRender.mock.calls[spyOnRender.mock.calls.length - 1][0][
      "props"
    ].children.props.handleOnChange(2, 10);
    const history = getHistory();
    const urlSearchParams = new URLSearchParams(history.location.search);
    expect(urlSearchParams.get("page")).toBe("2");
    document.body.removeChild(element);
  });

  it(`should dispatch "filter.update" when pageSize is changed"`, async () => {
    const element = document.createElement(
      "presentational-bricks.general-pagination"
    );
    Object.assign(element, props);
    element.addEventListener("filter.update", mockEventListener);
    document.body.appendChild(element);
    await jest.runAllTimers();
    spyOnRender.mock.calls[spyOnRender.mock.calls.length - 1][0][
      "props"
    ].children.props.onShowSizeChange(1, 50);
    const history = getHistory();
    const urlSearchParams = new URLSearchParams(history.location.search);
    expect(urlSearchParams.get("page")).toBe("1");
    expect(urlSearchParams.get("pageSize")).toBe("50");
    document.body.removeChild(element);
  });
});
