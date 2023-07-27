import React from "react";
import { shallow } from "enzyme";
import { GeneralReference } from "./GeneralReference";

describe("GeneralReference", () => {
  it("should display references", () => {
    const reference: any = {
      kindString: "Interface",
      name: "ModelCmdbObject",
      children: [
        {
          kindString: "property"
        }
      ]
    };
    const wrapper = shallow(<GeneralReference reference={reference} />);
    expect(wrapper.find("h3").text()).toBe("ModelCmdbObject");
  });

  it("should display type parameters", () => {
    const reference: any = {
      kindString: "Interface",
      name: "ResponseListWrapper",
      children: [
        {
          kindString: "property"
        }
      ],
      typeParameter: [
        {
          name: "T"
        },
        {
          name: "D"
        }
      ]
    };
    const wrapper = shallow(<GeneralReference reference={reference} />);
    expect(wrapper.find("h3").text()).toBe("ResponseListWrapper<T, D>");
  });

  it("should display type alias", () => {
    const reference: any = {
      kindString: "Type alias",
      name: "GetString",
      type: {
        type: "intrinsic",
        name: "string"
      }
    };
    const wrapper = shallow(<GeneralReference reference={reference} />);
    expect(wrapper.find("pre > code").text()).toBe("= <GeneralType />");
  });

  it("should display unknown references", () => {
    const reference: any = {
      kindString: "Unknown",
      name: "ResponseListWrapper",
      children: [
        {
          kindString: "property"
        }
      ]
    };
    const wrapper = shallow(<GeneralReference reference={reference} />);
    expect(wrapper.find("pre > code").text()).toMatchInlineSnapshot(`
      "{
        \\"kindString\\": \\"Unknown\\",
        \\"name\\": \\"ResponseListWrapper\\",
        \\"children\\": [
          {
            \\"kindString\\": \\"property\\"
          }
        ]
      }"
    `);
  });
});
