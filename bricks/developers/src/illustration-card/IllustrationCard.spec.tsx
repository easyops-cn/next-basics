import React from "react";
import { shallow } from "enzyme";
import { IllustrationCard, IllustrationCardList } from "./IllustrationCard";
import { message } from "antd";
const spyONSuccess = jest.spyOn(message, "success");
describe("IllustrationCardList", () => {
  it("should work", () => {
    const wrapper = shallow(
      <IllustrationCardList
        illustrations={[
          { category: "default", color: "pink", name: "a" },
          { category: "default", color: "pink", name: "b" },
        ]}
      />
    );
    expect(wrapper.find(IllustrationCard)).toHaveLength(2);
  });
});

describe("IllustrationsCard", () => {
  it("should work", () => {
    const props = {
      name: "a",
      category: "default",
    };
    const wrapper = shallow(<IllustrationCard color={"pink"} {...props} />);

    expect(wrapper.find("Clipboard").prop("text")).toEqual(
      JSON.stringify(props)
    );

    wrapper.find("Clipboard").invoke("onCopy")(JSON.stringify(props));

    expect(spyONSuccess).toHaveBeenCalledWith(
      '`{"name":"a","category":"default"}` copied 🎉'
    );
  });
});
