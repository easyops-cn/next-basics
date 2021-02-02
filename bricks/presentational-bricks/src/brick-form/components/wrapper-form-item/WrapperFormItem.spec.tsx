import React from "react";
import { shallow } from "enzyme";
import { WrapperFormItem } from "./WrapperFormItem";

describe("WrapperFormItem", () => {
  const props = {
    field: "name",
    label: "名称",
    form: {
      getFieldDecorator: () => (comp: React.Component) => comp
    },
    onFieldChange: jest.fn()
  };
  const TestComponent = () => <div>should works</div>;

  it("should work", () => {
    const WrapperComponent = WrapperFormItem(TestComponent);
    const wrapper = shallow(
      <WrapperComponent {...props} optionList={["a", "b", "c"]} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("should trigger change event", () => {
    const onChange = jest.fn();
    const WrapperComponent = WrapperFormItem(TestComponent);
    const wrapper = shallow(
      <WrapperComponent {...props} isRequire={true} onChange={onChange} />
    );
    wrapper.find(TestComponent).invoke("onChange")();
    expect(wrapper).toMatchSnapshot();
  });

  it("should control the form item show/hidden", () => {
    const newProps = {
      field: "name",
      label: "名称",
      component: "Input",
      hideFromField: "enable",
      rules: [
        {
          pattern: "^[a-zA-Z0-9]{1,100}$",
          message: "产品名称只能包含中英文、数字和_，且不能超过100个字符"
        }
      ],
      allFields: [
        {
          field: "name",
          label: "名称",
          component: "Input",
          hideFromField: "enable"
        },
        {
          field: "enable",
          label: "开启",
          component: "Switch",
          valuePropName: "checked",
          defaultValue: false
        }
      ],
      form: {
        getFieldDecorator: () => (comp: React.Component) => comp,
        getFieldValue: jest.fn().mockReturnValue(undefined)
      },
      onChange: jest.fn()
    };
    const WrapperComponent = WrapperFormItem(TestComponent);
    const wrapper = shallow(<WrapperComponent {...newProps} />);

    expect(wrapper).toMatchSnapshot();

    wrapper.setProps({
      form: {
        getFieldDecorator: () => (comp: React.Component) => comp,
        getFieldValue: jest.fn().mockReturnValue(true)
      }
    });

    wrapper.update();

    expect(wrapper).toMatchSnapshot();
  });
});
