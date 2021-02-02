import React from "react";
import { shallow } from "enzyme";
import { BrickAlertValue } from "./BrickAlertValue";

describe("BrickAlertValue", () => {
  it("should work, with bigger", () => {
    const alertEvent: any = {
      alert_conditions: {
        alert_type: "host",
        comparators: [
          {
            threshold: 95,
            type: "bigger_than",
            level: 1
          }
        ],
        alert_sub_type: "host",
        attr_id: "host.disk.max_used_percent",
        alert_table: "host",
        unit: "%"
      },
      value: 98,
      level: 1
    };

    const wrapper = shallow(<BrickAlertValue alertEvent={alertEvent} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("should work, without bigger or smaller", () => {
    const alertEvent: any = {
      alert_conditions: {
        alert_type: "host",
        alert_sub_type: "host",
        attr_id: "host.disk.max_used_percent",
        alert_table: "host",
        unit: "%"
      },
      value: 98.9987,
      level: 1
    };

    const wrapper = shallow(<BrickAlertValue alertEvent={alertEvent} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("should work, value is not number", () => {
    const alertEvent: any = {
      alert_conditions: {
        alert_type: "host",
        alert_sub_type: "host",
        attr_id: "host.disk.max_used_percent",
        alert_table: "host",
        unit: "%"
      },
      value: "192.168.100.162",
      level: 1
    };

    const wrapper = shallow(<BrickAlertValue alertEvent={alertEvent} />);
    expect(wrapper).toMatchSnapshot();
  });
});
