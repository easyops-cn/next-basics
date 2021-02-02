import React from "react";
import { shallow } from "enzyme";
import { GeneralForm, LegacyGeneralForm } from "./GeneralForm";

describe("GeneralForm", () => {
  it("should work", () => {
    const formElement = {} as any;
    const wrapper = shallow(
      <GeneralForm
        formElement={formElement}
        layout="inline"
        values={{
          username: "hello",
          date: "2019-10-01",
          time: "09:14:30",
          password: "world"
        }}
        valueTypes={{
          date: "moment",
          time: "moment|HH:mm:ss",
          password: ""
        }}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});

describe("LegacyGeneralForm", () => {
  it("should assign `formUtils`", () => {
    const formElement = {} as any;
    const formUtils = {} as any;
    shallow(
      <LegacyGeneralForm
        formElement={formElement}
        form={formUtils}
        layout="inline"
        values={{
          username: "hello"
        }}
      />
    );
    expect(formElement.formUtils).toBe(formUtils);
  });
});
