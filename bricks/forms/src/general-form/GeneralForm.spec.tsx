import React from "react";
import { shallow } from "enzyme";
import { Form } from "@ant-design/compatible";
import moment from "moment";
import { GeneralForm, LegacyGeneralForm } from "./GeneralForm";

jest.spyOn(Form, "createFormField");

describe("GeneralForm", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should work", () => {
    const formElement = {} as any;
    shallow(
      <GeneralForm
        formElement={formElement}
        layout="inline"
        values={{
          username: "hello",
          date: "2019-10-01",
          time: "09:14:30",
          emptyDateTime: null,
          password: "world",
        }}
        valueTypes={{
          date: "moment",
          time: "moment|HH:mm:ss",
          emptyDateTime: "moment",
          password: "",
        }}
        formStyle={{
          width: "100%",
        }}
      />
    );
    expect(Form.createFormField).toBeCalledTimes(5);
    expect(Form.createFormField).toHaveBeenNthCalledWith(1, { value: "hello" });
    expect(Form.createFormField).toHaveBeenNthCalledWith(2, {
      value: moment("2019-10-01", undefined),
    });
    expect(Form.createFormField).toHaveBeenNthCalledWith(3, {
      value: moment("09:14:30", "HH:mm:ss"),
    });
    expect(Form.createFormField).toHaveBeenNthCalledWith(4, { value: null });
    expect(Form.createFormField).toHaveBeenNthCalledWith(5, { value: "world" });
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
          username: "hello",
        }}
      />
    );
    expect(formElement.formUtils).toBe(formUtils);
  });
});
