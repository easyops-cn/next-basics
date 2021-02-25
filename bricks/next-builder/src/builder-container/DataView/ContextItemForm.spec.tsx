import React from "react";
import { mount } from "enzyme";
import { ContextItemForm, ContextItemFormProps } from "./ContextItemForm";
import { AutoComplete, Form, Radio } from "antd";
import { RadioChangeEvent } from "antd/lib/radio";

describe("ContextItemForm", () => {
  it("should work", async () => {
    const onContextItemUpdate = jest.fn();
    const Component = (
      props: Omit<ContextItemFormProps, "settingItemForm">
    ) => {
      const [settingItemForm] = Form.useForm();
      return <ContextItemForm {...props} settingItemForm={settingItemForm} />;
    };
    const wrapper = mount(
      <Component
        data={{
          name: "data-a",
          resolve: {
            useProvider: "provider-a",
            args: ["arg1"],
            if: false,
            transform: {
              value: "<% DATA %>",
            },
          },
        }}
        brickList={[
          {
            type: "brick",
            name: "brick-a",
          },
          {
            type: "provider",
            name: "provider-a",
          },
          {
            type: "provider",
            name: "provider-b",
          },
        ]}
        onContextItemUpdate={onContextItemUpdate}
      />
    );
    expect(wrapper.find(Form.Item).length).toBe(6);
    wrapper.find(Form).invoke("onFinish")({
      name: "data-a",
      type: "resolve",
      resolve: {
        useProvider: "provider-a",
        args: "- arg1\n",
        if: "false\n",
        transform: "value: <% DATA %>\n",
      },
    });

    expect(onContextItemUpdate).toBeCalled();
    wrapper.find(AutoComplete).invoke("onSearch")("provider-a");
    wrapper.find(Radio.Group).invoke("onChange")({
      target: {
        value: "value",
      },
    } as RadioChangeEvent);
    expect(wrapper.find(Form.Item).length).toBe(3);
    wrapper.setProps({
      data: {
        name: "data-b",
        value: "<% QUERY.objectId %>",
      },
    });
    expect(wrapper.find(Form.Item).length).toBe(3);
  });
});
