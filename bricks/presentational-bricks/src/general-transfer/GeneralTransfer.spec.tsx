import React from "react";
import { Transfer } from "antd";
import { shallow } from "enzyme";
import { GeneralTransfer } from "./GeneralTransfer";

describe("GeneralTransfer", () => {
  it("should work", () => {
    const changeFn = jest.fn();
    const selectFn = jest.fn();

    const wrapper = shallow(
      <GeneralTransfer
        dataSource={[]}
        onChange={changeFn}
        onSelectedChange={selectFn}
      />
    );
    let transfer = wrapper.find(Transfer).first();
    transfer.invoke("onChange")([], "", []);
    expect(changeFn).toBeCalledWith([]);
    transfer.invoke("onSelectChange")([], []);
    expect(selectFn).toBeCalledWith([], []);
    transfer.invoke("filterOption")("x", {
      key: "host.disk.used_total",
      title: "disk used total",
    });

    wrapper.setProps({ maxSelected: 10 });
    transfer = wrapper.find(Transfer).first();
    expect(transfer.invoke("footer")(null)).toBeTruthy();
    expect(transfer.invoke("render")({ key: "x", title: "title" })).toBe(
      "title"
    );
  });
  it("should work and maxSelected", () => {
    const changeFn = jest.fn();
    const selectFn = jest.fn();
    const wrapper = shallow(
      <GeneralTransfer
        dataSource={[
          {
            key: "1",
            title: "test1",
          },
          {
            key: "2",
            title: "test2",
          },
          {
            key: "3",
            title: "test3",
          },
          {
            key: "4",
            title: "test3",
          },
        ]}
        onChange={changeFn}
        onSelectedChange={selectFn}
        maxSelected={2}
      />
    );
    const transfer = wrapper.find(Transfer).first();
    transfer.invoke("onChange")(["1", "2", "3"], "right", []);
    expect(changeFn).not.toHaveBeenCalled();
  });
});
