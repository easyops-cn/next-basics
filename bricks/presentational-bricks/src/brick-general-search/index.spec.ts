import ReactDOM from "react-dom";
import "./";
import { createHistory, getHistory } from "@next-core/brick-kit";
import { BrickGeneralSearchElement } from "./";

createHistory();

const spyOnRender = jest.spyOn(ReactDOM, "render").mockImplementation(() => {});
const unmountComponentAtNode = jest
  .spyOn(ReactDOM, "unmountComponentAtNode")
  .mockImplementation((() => {}) as any);
const mockEventListener = jest.fn(e => {});

afterEach(() => {
  spyOnRender.mockClear();
});

describe("presentational-bricks.brick-general-search", () => {
  it("should create a custom element", async () => {
    const element = document.createElement(
      "presentational-bricks.brick-general-search"
    );
    // Always waiting for async `(dis)connectedCallback`
    await jest.runAllTimers();
    expect(spyOnRender).not.toBeCalled();
    document.body.appendChild(element);
    await jest.runAllTimers();
    expect(spyOnRender).toBeCalled();
    Object.assign(element, {
      field: "[0].query",
      defaultArgs: [
        {
          name: "page",
          value: 1,
          field: "[0].page"
        }
      ],
      q: "1",
      shouldUpdateUrlParams: false,
      shouldTrimQuery: true,
      inputStyle: {
        broder: "1px solid #ccc"
      },
      buttonStyle: {
        padding: "5px"
      }
    });
    document.body.removeChild(element);
    await jest.runAllTimers();
    expect(unmountComponentAtNode).toBeCalled();
  });

  const cases: [boolean, string][] = [[true, "123"], [false, " 123 "]];
  it.each(cases)(
    "when shouldTrimQuery is (%s) should q to be %s",
    async (shouldTrimQuery, expected) => {
      const element = document.createElement(
        "presentational-bricks.brick-general-search"
      ) as BrickGeneralSearchElement;
      Object.assign(element, {
        field: "[0].query",
        defaultArgs: [
          {
            name: "page",
            value: 1,
            field: "[0].page"
          }
        ],
        q: "1",
        size: "large",
        placeholder: "输入关键字搜索",
        shape: "round",
        shouldTrimQuery
      });
      element.addEventListener("filter.update", mockEventListener);
      document.body.appendChild(element);
      await jest.runAllTimers();
      spyOnRender.mock.calls[spyOnRender.mock.calls.length - 1][0][
        "props"
      ].children.props.onUpdate(" 123 ");
      const history = getHistory();
      const urlSearchParams = new URLSearchParams(history.location.search);
      expect(urlSearchParams.get("q")).toBe(expected);
      document.body.removeChild(element);
    }
  );

  it(`should dispatch "query.change" when query is changed"`, async () => {
    const element = document.createElement(
      "presentational-bricks.brick-general-search"
    );
    Object.assign(element, {
      field: "[0].query",
      q: "1",
      shouldUpdateUrlParams: true,
      shouldTrimQuery: true,
      inputStyle: {
        broder: "1px solid #ccc"
      },
      buttonStyle: {
        padding: "5px"
      }
    });
    element.addEventListener("query.change", mockEventListener);
    document.body.appendChild(element);
    await jest.runAllTimers();
    spyOnRender.mock.calls[spyOnRender.mock.calls.length - 1][0][
      "props"
    ].children.props.onChange("123");
    expect(mockEventListener).toHaveBeenCalled();
    document.body.removeChild(element);
  });
});
