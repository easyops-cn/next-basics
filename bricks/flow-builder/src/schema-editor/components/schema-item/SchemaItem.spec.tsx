import React from "react";
import { shallow, mount } from "enzyme";
import { AddPropertyModal } from "../add-property-modal/AddPropertyModal";
import { SchemaItem } from "./SchemaItem";
import { EditorContext } from "../../constants";
import { ModelDefinition } from "../../interfaces";

describe("SchemaItem", () => {
  it("should work", () => {
    const onModalFn = jest.fn();
    const onRemoveFn = jest.fn();

    const modelDefinitionList: ModelDefinition[] = [];
    const showModelDefinition = jest.fn();
    const props = {
      traceId: "root-0-1",
      itemData: {
        type: "string",
        name: "name",
        description: "名称",
      },
    };

    const TestComponent = (props: any): React.ReactElement => (
      <EditorContext.Provider
        value={{
          modelDefinitionList,
          showModelDefinition,
          onModal: onModalFn,
          onRemove: onRemoveFn,
        }}
      >
        <SchemaItem {...props} />
      </EditorContext.Provider>
    );
    const wrapper = mount(<TestComponent {...props} />);

    wrapper.find(".iconBtn").at(0).invoke("onClick")(null);

    expect(onModalFn).toHaveBeenCalledWith(
      { description: "名称", name: "name", type: "string" },
      true,
      "root-0-1"
    );

    wrapper.find(".deleteBtn").at(0).invoke("onClick")(null);
    expect(onRemoveFn).toHaveBeenCalledWith("root-0-1");

    wrapper.setProps({
      itemData: {
        ref: "IP",
      },
    });

    wrapper.update();
    expect(wrapper.find(".refTag").at(0).text()).toEqual("IP");
  });

  it("should work with fields", () => {
    const onModalFn = jest.fn();
    const onRemoveFn = jest.fn();

    const modelDefinitionList: ModelDefinition[] = [
      {
        name: "Street",
        fields: [
          {
            name: "a",
            type: "string",
          },
        ],
      },
    ];
    const showModelDefinition = jest.fn();
    const hideModelDefinition = jest.fn();

    const TestComponent = (props: any): React.ReactElement => (
      <EditorContext.Provider
        value={{
          modelDefinitionList,
          showModelDefinition,
          onModal: onModalFn,
          onRemove: onRemoveFn,
          hideModelDefinition,
        }}
      >
        <SchemaItem {...props} />
      </EditorContext.Provider>
    );

    const props = {
      traceId: "root-0",
      itemData: {
        type: "object",
        name: "address",
        description: "地址",
        fields: [
          { name: "city", type: "string", description: "城市" },
          { name: "street", type: "Street", description: "街道" },
        ],
      },
    };
    const wrapper = mount(<TestComponent {...props} />);

    expect(wrapper.find(SchemaItem).length).toEqual(3);

    wrapper.find(".iconBtn").last().invoke("onMouseEnter")(null);

    wrapper.update();

    expect(wrapper.find("div[title='address']").prop("style")).toEqual({
      color: "var(--color-brand)",
      paddingLeft: 20,
    });

    wrapper.find(".iconBtn").last().invoke("onMouseLeave")(null);

    wrapper.update();

    expect(wrapper.find("div[title='address']").prop("style")).toEqual({
      paddingLeft: 20,
    });

    wrapper.find("div[title='street']").find("span").at(0).simulate("click");

    expect(showModelDefinition).toBeCalled();

    wrapper.find("div[title='street']").find("span").at(0).simulate("click");
    expect(hideModelDefinition).toBeCalled();
  });
});
