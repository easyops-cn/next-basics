import ReactDOM from "react-dom";
import "./";
import moment from "moment";

const spyOnRender = jest
  .spyOn(ReactDOM, "render")
  .mockImplementation(() => null);
const unmountComponentAtNode = jest
  .spyOn(ReactDOM, "unmountComponentAtNode")
  .mockImplementation(() => null);

describe("presentational-bricks.brick-calendar", () => {
  it("should create a custom element", () => {
    const element = document.createElement("presentational-bricks.calendar");
    expect(spyOnRender).not.toBeCalled();
    document.body.appendChild(element);
    expect(spyOnRender).toBeCalled();
    document.body.removeChild(element);
    expect(unmountComponentAtNode).toBeCalled();
  });

  it(`should dispatch "presentational.calendar.onSelect" event`, async () => {
    const element = document.createElement("presentational-bricks.calendar");

    Object.assign(element, {
      value: moment("2017-01-25"),
      fullscreen: true,
      mode: "year",
    });
    const mockEventListener = jest.fn((e) => null);
    element.addEventListener(
      "presentational.calendar.onSelect",
      mockEventListener
    );
    document.body.appendChild(element);
    await jest.runAllTimers();
    const date = moment("2020-05-25");
    spyOnRender.mock.calls[spyOnRender.mock.calls.length - 1][0][
      "props"
    ].children.props.onSelect(date);
    expect(mockEventListener).toHaveBeenCalledWith(
      expect.objectContaining({ detail: date })
    );
  });

  it("should show up custom brick component", async () => {
    const element = document.createElement("presentational-bricks.calendar");
    Object.assign(element, {
      value: moment("2017-01-25"),
      dateCell: {
        useBrick: {
          brick: "div",
          transform: {
            id: "test-container",
            style: {
              display: "flex",
              "justify-content": "center",
              "align-items": "center",
              height: "100%",
              color: "rgb(85, 151, 220)",
              "font-size": "16px",
            },
            textContent: moment("2017-01-25"),
          },
        },
      },
      monthCell: {
        useBrick: {
          brick: "div",
          transform: {
            style: {
              display: "flex",
              "justify-content": "center",
              "align-items": "center",
              height: "100%",
            },
            color: "orange",
            showCard: false,
            showTagCircle: true,
            tagList: "<% [DATA.date.format('LLL')] %>",
          },
        },
      },
    });

    /*    element.dateCellRender = jest.fn();
    element.monthCellRender = jest.fn();*/

    document.body.appendChild(element);
    await jest.runAllTimers();
    const date = moment("2020-05-25");

    spyOnRender.mock.calls[spyOnRender.mock.calls.length - 1][0][
      "props"
    ].children.props.dateCellRender(date);
    spyOnRender.mock.calls[spyOnRender.mock.calls.length - 1][0][
      "props"
    ].children.props.monthCellRender(date);

    expect((element as any).dateCell.useBrick).toBeTruthy();
    expect((element as any).monthCell.useBrick).toBeTruthy();
  });

  it(`should dispatch "presentational.calendar.onChange" event `, async () => {
    const element = document.createElement("presentational-bricks.calendar");
    Object.assign(element, {
      value: moment("2017-01-25"),
      fullscreen: true,
      mode: "year",
    });
    const mockEventListener = jest.fn((e) => null);
    element.addEventListener(
      "presentational.calendar.onChange",
      mockEventListener
    );
    document.body.appendChild(element);
    await jest.runAllTimers();
    const date = moment("2020-05-25");
    spyOnRender.mock.calls[spyOnRender.mock.calls.length - 1][0][
      "props"
    ].children.props.onChange(date);
    expect(mockEventListener).toHaveBeenCalledWith(
      expect.objectContaining({ detail: date })
    );
  });
});
