import React from "react";
import { shallow } from "enzyme";
import { AddPropertyModal } from "../add-property-modal/AddPropertyModal";
import { SchemaItem } from "./SchemaItem";

describe("SchemaItem", () => {
  it("should work", () => {
    const props = {
      trackId: "root-0-1",
      itemData: {
        type: "string",
        name: "name",
        description: "名称",
      },
      onEdit: jest.fn(),
      onRemove: jest.fn(),
      onCreate: jest.fn(),
    };
    const wrapper = shallow(<SchemaItem {...props} />);

    wrapper.find(".iconBtn").invoke("onClick")(null);

    expect(wrapper.find(AddPropertyModal).prop("visible")).toEqual(true);

    wrapper.find(AddPropertyModal).invoke("onClose")();
    expect(wrapper.find(AddPropertyModal).prop("visible")).toEqual(false);

    wrapper.find(".deleteBtn").invoke("onClick")(null);
    expect(props.onRemove).toHaveBeenCalledWith("root-0-1");

    wrapper.setProps({
      itemData: {
        ref: "IP",
      },
    });

    wrapper.update();
    expect(wrapper.find(".refTag").text()).toEqual("IP");

    wrapper.find(AddPropertyModal).invoke("onSubmit")(
      { name: "new value", type: "string" },
      "root-0-1",
      true
    );
    expect(props.onEdit).toHaveBeenCalledWith(
      { name: "new value", type: "string" },
      "root-0-1"
    );

    wrapper.find(AddPropertyModal).invoke("onSubmit")(
      { name: "new value", type: "string" },
      "root-0-2",
      false
    );
    expect(props.onCreate).toHaveBeenCalledWith(
      { name: "new value", type: "string" },
      "root-0-2"
    );
  });

  it("should work with feilds", () => {
    const props = {
      trackId: "root-0",
      itemData: {
        type: "object",
        name: "address",
        description: "地址",
        fields: [
          { name: "city", type: "string", description: "城市" },
          { name: "street", type: "string", description: "街道" },
        ],
      },
      onEdit: jest.fn(),
      onRemove: jest.fn(),
    };
    const wrapper = shallow(<SchemaItem {...props} />);

    expect(wrapper.find(SchemaItem).length).toEqual(2);

    wrapper.find(SchemaItem).at(0).invoke("onEdit")(
      { name: "city", type: "string", description: "城市" },
      "root-0-0"
    );

    expect(props.onEdit).toHaveBeenCalledWith(
      { name: "city", type: "string", description: "城市" },
      "root-0-0"
    );

    wrapper.find(".iconBtn").last().invoke("onClick")(null);

    expect(wrapper.find(AddPropertyModal).prop("visible")).toEqual(true);

    wrapper.find(SchemaItem).at(0).invoke("onRemove")(null);
    expect(props.onRemove).toHaveBeenCalled();
  });
});
