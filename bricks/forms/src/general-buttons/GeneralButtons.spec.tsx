import React from "react";
import { shallow } from "enzyme";
import { GeneralButtons } from "./GeneralButtons";
import { Button } from "antd";

describe("GeneralButtons", () => {
  it("should work", () => {
    const onSubmitClick = jest.fn();
    const wrapper = shallow(
      <GeneralButtons
        submitText="提交"
        submitType="primary"
        onSubmitClick={onSubmitClick}
      />
    );
    expect(wrapper.find(Button).length).toBe(1);
    wrapper.find(Button).simulate("click");
    expect(onSubmitClick).toBeCalled();
  });

  it("submitDisabled", () => {
    const formElement = {
      formUtils: {
        getFieldDecorator: jest.fn().mockReturnValue(jest.fn())
      },
      layout: "horizontal",
      labelCol: {
        span: 4
      },
      wrapperCol: {
        span: 14
      }
    };
    const onSubmitClick = jest.fn();
    const wrapper = shallow(
      <GeneralButtons
        formElement={formElement as any}
        submitText="提交"
        submitType="primary"
        onSubmitClick={onSubmitClick}
        submitDisabled={true}
      />
    );
    expect(wrapper.find(Button).prop("disabled")).toEqual(true);
  });
});
