import React from "react";
import { shallow } from "enzyme";
import { fireEvent, render } from "@testing-library/react";

import { DatetimeSelector, ResolutionProps } from "./DatetimeSelector";

jest.spyOn(console, "warn").mockImplementation(() => void 0);

describe("DatetimeSelector", () => {
  beforeEach(() => {
    jest
      .spyOn(Date, "now")
      .mockImplementation(() => new Date("2019-10-01 08:00:00").getTime());
  });

  it("should work", () => {
    let result = render(<DatetimeSelector from="now-1d" />);
    let asFragment = result.asFragment;
    expect(asFragment()).toBeTruthy();

    result = render(
      <DatetimeSelector from="1571673600076" to="1571846399076" />
    );
    asFragment = result.asFragment;
    expect(asFragment()).toBeTruthy();

    result = render(<DatetimeSelector />);
    asFragment = result.asFragment;
    expect(asFragment()).toBeTruthy();
  });

  it("should render custom time range", () => {
    const { queryByText, getByRole } = render(
      <DatetimeSelector
        type="custom"
        customTimeRange={[
          {
            range: "now-30d",
            text: "近30天",
          },
          {
            range: "now-1y",
            text: "近1年",
          },
        ]}
      />
    );
    const deleteButton = getByRole("button");
    fireEvent.click(deleteButton);
    expect(queryByText("近1年")).toBeTruthy();
  });

  it("should return specified resolution", () => {
    const handleConfirm = jest.fn();
    const props = {
      resolution: "s" as ResolutionProps,
      from: "1571673600",
      to: "1571846399",
      datetimeSelected: handleConfirm,
    };
    const wrapper = shallow(<DatetimeSelector {...props} />);

    wrapper.invoke("onConfirm")({
      type: "specifiedDate",
      value: {
        from: 1571672600123,
        to: 1571846299789,
      },
    });

    expect(handleConfirm).toHaveBeenCalledWith({
      type: "specifiedDate",
      value: {
        from: 1571672600,
        to: 1571846299,
      },
    });
  });
});
