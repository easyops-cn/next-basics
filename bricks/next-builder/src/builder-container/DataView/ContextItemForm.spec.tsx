import React from "react";
import { mount } from "enzyme";
import { ContextItemForm, ContextItemFormProps } from "./ContextItemForm";
import { AutoComplete, Form, Radio } from "antd";
import { RadioChangeEvent } from "antd/lib/radio";
import { useBuilderUIContext } from "../BuilderUIContext";

jest.mock("../BuilderUIContext");

const mockUseBuilderUIContext = useBuilderUIContext as jest.Mock;

describe("ContextItemForm", () => {
  it("should work", async () => {
    const onContextItemUpdate = jest.fn();
    mockUseBuilderUIContext.mockReturnValue({
      providerList: undefined,
    });
    const Component = (
      props: Omit<ContextItemFormProps, "settingItemForm">
    ): React.ReactElement => {
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
            onReject: {
              transform: {
                value: "<% DATA.message %>",
              },
            },
          },
        }}
        onContextItemUpdate={onContextItemUpdate}
      />
    );
    expect(wrapper.find(Form.Item).length).toBe(10);

    mockUseBuilderUIContext.mockReturnValue({
      providerList: ["provider-a", "provider-b"],
    });
    // Trigger component updating.
    wrapper.setProps({});

    wrapper.find(Form).invoke("onFinish")({
      name: "data-a",
      type: "resolve",
      resolve: {
        useProvider: "provider-a",
        args: "- arg1\n",
        if: "false\n",
        transform: "value: <% DATA %>\n",
        onReject: "transform:\n  value: <% DATA.message %>",
      },
    });

    expect(onContextItemUpdate).toBeCalled();

    wrapper.find(AutoComplete).invoke("onSearch")("provider-a");
    wrapper.find(Radio.Group).invoke("onChange")({
      target: {
        value: "value",
      },
    } as RadioChangeEvent);
    expect(wrapper.find(Form.Item).length).toBe(5);
    wrapper.setProps({
      data: {
        name: "data-b",
        value: "<% QUERY.objectId %>",
      },
    });
    expect(wrapper.find(Form.Item).length).toBe(5);
    expect(wrapper.find(Radio).children().length).toBe(2);

    wrapper.setProps({
      data: {
        name: "data-c",
        type: "selector-resolve",
        resolve: {
          provider: "provider-a",
          args: "- arg1\n",
          if: "false\n",
          transform: "value: <% DATA %>\n",
        },
      },
    });
    expect(wrapper.find(Radio).children().length).toBe(3);
  });
});
