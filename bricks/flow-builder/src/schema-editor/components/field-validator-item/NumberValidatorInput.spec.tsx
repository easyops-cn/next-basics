import React from "react";
import { act } from "react-dom/test-utils";
import { Select, InputNumber } from "antd";
import { shallow } from "enzyme";
import { NumberValidatorInput } from "./NumberValidatorInput";

describe("NumberValidatorInput", () => {
  it("should work", () => {
    const props = {
      value: [
        { method: "gt", value: 10 },
        { method: "lt", value: 20 },
      ],
      onAdd: jest.fn(),
      onRemove: jest.fn(),
      onChange: jest.fn(),
    };
    const wrapper = shallow(<NumberValidatorInput {...props} />);

    wrapper.find(Select).at(0).invoke("onChange")("gte", undefined);
    expect(props.onChange.mock.calls[0][0]).toEqual([
      { method: "gte", value: 10 },
      { method: "lt", value: 20 },
    ]);

    act(() => {
      wrapper.find(".iconBtn").last().simulate("click");
    });

    expect(props.onAdd).toHaveBeenCalled();

    act(() => {
      wrapper.find(".iconBtn").at(0).simulate("click");
    });

    expect(props.onRemove).toHaveBeenCalledWith(0);

    wrapper.find(InputNumber).at(0).invoke("onChange")(12);

    expect(props.onChange.mock.calls[1][0]).toEqual([
      { method: "gt", value: 12 },
      { method: "lt", value: 20 },
    ]);
  });
});
