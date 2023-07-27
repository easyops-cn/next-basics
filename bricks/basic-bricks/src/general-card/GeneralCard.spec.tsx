import React from "react";
import { mount, shallow } from "enzyme";
import { GeneralCard, OperationButton } from "./GeneralCard";

describe("GeneralCard", () => {
  it("should work", () => {
    const wrapper = shallow(<GeneralCard />);
    expect(wrapper.find(".generalCardContainer").length).toBe(1);
    expect(wrapper.find(".generalCardExtra").length).toBe(0);
    expect(wrapper.find(".generalCardFooter").length).toBe(1);
  });
  it("should work and fillVertical is true and  verticalCenter is true", () => {
    const wrapper = shallow(
      <GeneralCard fillVertical={true} verticalCenter={true} />
    );
    expect(wrapper.getElement().props.style).toMatchObject({
      height: "100%",
      paddingBottom: 0,
      display: "grid",
      gridTemplate: "50px auto/auto",
    });
  });

  it("operation buttons should work", () => {
    const buttons: OperationButton[] = [
      {
        id: "id-1",
        eventName: "event-name-1",
        configProps: {},
      },
      {
        id: "id-2",
        eventName: "event-name-2",
        configProps: {},
        needData: true,
      },
    ];
    const wrapper = mount(<GeneralCard operationButtons={buttons} />);
    expect(wrapper.find(".generalCardExtra").length).toBe(1);
  });

  it("should work and hasExtraSlot is true ", () => {
    const wrapper = mount(<GeneralCard hasExtraSlot={true} />);
    expect(wrapper.find(".generalCardExtra").length).toBe(1);
  });
  it("cardTitle and should work", () => {
    const wrapper = mount(<GeneralCard cardTitle="xxx" />);
    expect(wrapper.find(".ant-card-head-title").text()).toEqual("xxx ");
  });
});
