import React from "react";
import { act } from "react-dom/test-utils";
import { mount } from "enzyme";
import { Modal, Row, Radio, Button, Table, Input, Select } from "antd";
import { CmdbObjectApi_getObjectAll } from "@next-sdk/cmdb-sdk";
import { ObjectAttrStruct } from "./ObjectAttrStruct";
import { NS_FORMS, K } from "../../i18n/constants";
import i18n from "i18next";
jest.mock("@next-sdk/cmdb-sdk");

const spyOnModalConfirm = jest.spyOn(Modal, "confirm");
const mockLoadObject = CmdbObjectApi_getObjectAll as jest.Mock;

mockLoadObject.mockResolvedValue({
  data: [
    {
      objectId: "object1",
      attrList: [
        {
          id: "id1",
          name: "name1",
          value: {
            type: "str",
          },
        },
      ],
    },

    {
      objectId: "object2",
      attrList: [
        {
          id: "id2",
          name: "name2",
          value: {
            type: "date",
          },
        },
      ],
    },
  ],
});

const defaultValue = {
  default: "",
  struct_define: [],
};

describe("ObjectAttrStruct", () => {
  it("should work", async () => {
    const props = {
      value: defaultValue,
      onChange: jest.fn(),
    };

    const wrapper = mount(<ObjectAttrStruct {...props} />);
    expect(wrapper.find(Radio.Group).at(0).props().value).toBe("new");
    expect(wrapper.find(Row).at(1).children(0).text()).toBe(
      i18n.t(`${NS_FORMS}:${K.ADD_STRUCTURE_ITEM}`)
    );
    await act(async () => {
      wrapper.find(Radio.Group).at(0).invoke("onChange")({
        target: {
          value: "import",
        },
      });

      await (global as any).flushPromises();
    });
    wrapper.update();
    expect(wrapper.find(Row).at(1).children(0).text()).toBe(
      i18n.t(`${NS_FORMS}:${K.SELECT_MODEL}`)
    );
  });

  it.each([
    ["enum", "", ""],
    ["enums", "", ""],
    ["json", "", ""],
    ["enum", ["enum1", "enum2"], "enum1,enum2"],
  ])(
    "should work with props has struct_define (%s %s)",
    (type, regex, expected) => {
      const wrapper = mount(
        <ObjectAttrStruct
          {...{
            value: {
              ...defaultValue,
              struct_define: [
                {
                  id: "struId",
                  name: "struName",
                  type,
                  regex,
                },
              ],
            },
          }}
        />
      );

      expect(wrapper.find("tbody tr").childAt(3).text()).toBe(expected);
    }
  );

  it("test add new struct", async () => {
    const props = {
      value: defaultValue,
      onChange: jest.fn(),
    };

    const wrapper = mount(<ObjectAttrStruct {...props} />);
    wrapper.find(Button).at(0).invoke("onClick")();
    expect(wrapper.find("Modal").at(0).props().visible).toBeTruthy();
    wrapper.update();
    wrapper.find(Input).at(0).invoke("onChange")("structId");
    wrapper.find(Input).at(1).invoke("onChange")("structName");
    wrapper.find(Select).at(0).invoke("onChange")("date");

    wrapper.find(Modal).at(0).invoke("onOk")(); // 点击弹窗确认按钮

    expect(props.onChange).toBeCalledWith({
      default: "",
      struct_define: [
        {
          id: "structId",
          name: "structName",
          type: "date",
        },
      ],
    });

    wrapper.update();
    expect(wrapper.find("Modal").at(0).props().visible).toBeFalsy();
    expect(wrapper.find(Table).at(0).props().dataSource.length).toBe(1);
    const optionBtnDiv = wrapper.find(".struct-option-btn-group").at(0);
    expect(optionBtnDiv.props().children.length).toBe(2);
    optionBtnDiv.childAt(0).invoke("onClick")();

    await jest.runAllTimers();
    wrapper.update();
    expect(wrapper.find("Modal").at(0).props().title).toBe(
      i18n.t(`${NS_FORMS}:${K.TITLE_EDIT_STRUCTURE_ITEM}`)
    );

    wrapper.find(Modal).at(0).invoke("onCancel")(); // 点击弹窗确认按钮

    await jest.runAllTimers();
    wrapper.update();
    expect(wrapper.find("Modal").at(0).props().visible).toBeFalsy();
    optionBtnDiv.childAt(1).invoke("onClick")();
    expect(spyOnModalConfirm).toBeCalledWith(
      expect.objectContaining({
        title: i18n.t(`${NS_FORMS}:${K.NOTICE}`),
      })
    );

    act(() => {
      spyOnModalConfirm.mock.calls[
        spyOnModalConfirm.mock.calls.length - 1
      ][0].onOk(); // 点击弹窗确认按钮
    });

    expect(props.onChange).toBeCalledWith({
      default: "",
      struct_define: [],
    });
  });
  it("test add new struct and enum or enums", async () => {
    const props = {
      value: defaultValue,
      onChange: jest.fn(),
    };

    const wrapper = mount(<ObjectAttrStruct {...props} />);
    wrapper.find(Button).at(0).invoke("onClick")();
    expect(wrapper.find("Modal").at(0).props().visible).toBeTruthy();
    wrapper.update();
    wrapper.find(Input).at(0).invoke("onChange")("structId");
    wrapper.find(Input).at(1).invoke("onChange")("structName");
    wrapper.find(Select).at(0).invoke("onChange")("enum");
    wrapper.find(Modal).at(0).invoke("onOk")(); // 点击弹窗确认按钮
    expect(props.onChange).toBeCalledWith({
      default: "",
      struct_define: [
        {
          id: "structId",
          name: "structName",
          type: "enum",
          regex: [],
        },
      ],
    });
  });

  it("test import struct", async () => {
    const props = {
      value: defaultValue,
      onChange: jest.fn(),
    };

    const wrapper = mount(<ObjectAttrStruct {...props} />);
    wrapper.find(Radio.Group).at(0).invoke("onChange")({
      target: {
        value: "import",
      },
    });

    wrapper.update();
    wrapper.find(Button).at(0).invoke("onClick")();
    await (global as any).flushPromises();
    expect(wrapper.find("Modal").at(1).props().visible).toBeTruthy();
    wrapper.update();
    wrapper.find(Select).at(0).invoke("onChange")("object2");
    wrapper.update();
    expect(wrapper.find("Table").at(2).props().dataSource.length).toBe(1);
    wrapper.find("Modal").at(1).invoke("onOk")(); // 点击弹窗确认按钮

    expect(props.onChange).toBeCalledWith({
      default: "",
      struct_define: [
        {
          id: "id2",
          name: "name2",
          type: "date",
        },
      ],
    });
  });
});
