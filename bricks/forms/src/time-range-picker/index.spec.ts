import ReactDOM from "react-dom";
import "./";

const spyOnRender = jest
  .spyOn(ReactDOM, "render")
  .mockImplementation(() => null);
const unmountComponentAtNode = jest
  .spyOn(ReactDOM, "unmountComponentAtNode")
  .mockImplementation(() => null);

describe("forms.time-range-picker", () => {
  it("should create a custom element", async () => {
    const element = document.createElement("forms.time-range-picker") as any;
    // Always waiting for async `(dis)connectedCallback`
    element.required = true;
    await jest.runAllTimers();
    expect(spyOnRender).not.toBeCalled();
    document.body.appendChild(element);
    await jest.runAllTimers();
    expect(spyOnRender).toBeCalled();
    const cb = jest.fn();
    element.unequal("", { startTime: "00:00", endTime: "00:00" }, cb);
    expect(cb.mock.calls[0].length).toBe(1);
    element.unequal("", { startTime: "00:00", endTime: "03:00" }, cb);
    expect(cb.mock.calls[1].length).toBe(0);

    const scb = jest.fn();
    element.startTimeRequired("", { startTime: "", endTime: "00:00" }, scb);
    expect(scb.mock.calls[0].length).toBe(1);
    element.startTimeRequired(
      "",
      { startTime: "00:00", endTime: "03:00" },
      scb
    );
    expect(scb.mock.calls[1].length).toBe(0);

    const ecb = jest.fn();
    element.endTimeRequired("", { startTime: "00:00", endTime: "" }, ecb);
    expect(ecb.mock.calls[0].length).toBe(1);
    element.endTimeRequired("", { startTime: "00:00", endTime: "03:00" }, ecb);
    expect(ecb.mock.calls[1].length).toBe(0);

    document.body.removeChild(element);
    await jest.runAllTimers();
    expect(unmountComponentAtNode).toBeCalled();
  });

  it("for coverage", async () => {
    spyOnRender.mockReset();
    const element = document.createElement("forms.time-range-picker") as any;
    // Always waiting for async `(dis)connectedCallback`
    element.rangeType = "dateTime";
    element.validator = [];
    await jest.runAllTimers();
    expect(spyOnRender).not.toBeCalled();
    document.body.appendChild(element);
    await jest.runAllTimers();
    expect(spyOnRender).toBeCalled();
    document.body.removeChild(element);
    await jest.runAllTimers();
    expect(unmountComponentAtNode).toBeCalled();
  });

  it("should trigger event", async () => {
    const element = document.createElement("forms.time-range-picker") as any;
    await jest.runAllTimers();
    document.body.appendChild(element);

    const dispatchEvent = jest.spyOn(element, "dispatchEvent");

    element._handleChange({ startTime: "02:23:45", endTime: "08:30:00" });
    expect((dispatchEvent.mock.calls[0][0] as CustomEvent).detail).toEqual({
      startTime: "02:23:45",
      endTime: "08:30:00"
    });
  });
});
