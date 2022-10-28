import React from "react";
import { mount } from "enzyme";
import { ContextItemForm, ContextItemFormProps } from "./ContextItemForm";
import { AutoComplete, Form, Radio, Select } from "antd";
import { RadioChangeEvent } from "antd/lib/radio";
import { useBuilderUIContext } from "../BuilderUIContext";
import { CodeEditorItem } from "@next-libs/code-editor-components";
import { ContractAutoComplete } from "../../shared/components/contract-auto-complete/ContractAutoComplete";

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
          track: true,
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
    expect(wrapper.find(Form.Item).length).toBe(12);

    mockUseBuilderUIContext.mockReturnValue({
      providerList: ["provider-a", "provider-b"],
    });
    // Trigger component updating.
    wrapper.setProps({});
    wrapper.update();

    expect(
      wrapper
        .find('FormItemInput[label="useProvider"]')
        .find(Select)
        .prop("options")
    ).toEqual([
      { label: "provider-a", value: "provider-a" },
      { label: "provider-b", value: "provider-b" },
    ]);

    expect(wrapper.html().indexOf("onChange is error") <= 0).toBeTruthy();

    wrapper.find(Form).invoke("onFinish")({
      name: "data-a",
      type: "resolve",
      onChange: "-a: \nb",
    });

    expect(onContextItemUpdate).toBeCalledTimes(0);
    expect(wrapper.html().indexOf("onChange is error") >= 0).toBeTruthy();

    wrapper.find(CodeEditorItem).last().invoke("onChange")("onChange");
    await jest.runAllTimers();

    expect(wrapper.html().indexOf("onChange is error") <= 0).toBeTruthy();

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
    expect(wrapper.find(Form.Item).length).toBe(6);
    wrapper.setProps({
      data: {
        name: "data-b",
        value: "<% QUERY.objectId %>",
      },
    });
    expect(wrapper.find(Form.Item).length).toBe(6);
    expect(wrapper.find(Radio).children().length).toBe(3);

    wrapper.setProps({
      data: {
        name: "data-c",
        type: "selector-resolve",
        resolve: {
          provider: "provider-a",
          args: "- arg1\n",
          if: "false\n",
          transform: "value: <% DATA %>\n",
          lazy: true,
        },
      },
    });
    expect(wrapper.find(Radio).children().length).toBe(4);

    wrapper.setProps({
      data: {
        name: "data-d",
        type: "flow-api",
        resolve: {
          useProvider: "cmdb.instance.postsearch@1.0.0",
          args: "- arg1\n",
          if: "false\n",
          transform: "value: <% DATA %>\n",
        },
      },
    });

    wrapper.update();
    expect(wrapper.find(ContractAutoComplete).length).toEqual(1);
  });
});
