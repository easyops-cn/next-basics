import React from "react";
import { shallow } from "enzyme";
import { EasyView } from "./EasyView";

describe("EasyView", () => {
  it("should work with gridAreas", () => {
    const wrapper = shallow(
      <EasyView
        gridAreas={{
          a: [1, 1, 2, 13],
          c: [2, 1, 3, 5],
          d: [2, 5, 3, 13],
        }}
        gridTemplateColumns="repeat(12, 1fr)"
        gridTemplateRows="100px 200px"
        containerStyle={{ height: "100%" }}
      />
    );
    const container = wrapper.find("div").at(0);
    expect(container.prop("style")).toMatchObject({
      display: "grid",
      gridTemplateAreas: undefined,
      gridTemplateColumns: "repeat(12, 1fr)",
      gridTemplateRows: "100px 200px",
      height: "100%",
    });
    expect(container.children().length).toBe(3);
    expect(container.find('slot[name="a"]').parent().prop("style")).toEqual({
      gridArea: "1 / 1 / 2 / 13",
    });
    expect(container.find('slot[name="c"]').parent().prop("style")).toEqual({
      gridArea: "2 / 1 / 3 / 5",
    });
    expect(container.find('slot[name="d"]').parent().prop("style")).toEqual({
      gridArea: "2 / 5 / 3 / 13",
    });
  });

  it("should work with gridTemplateAreas", () => {
    const wrapper = shallow(
      <EasyView
        gridTemplateAreas={[
          ["a", "a", "a"],
          ["c", ".", "d"],
        ]}
        gridTemplateColumns={["4fr", "2fr", "6fr"]}
        gridTemplateRows={["100px", "200px"]}
        styleByAreas={{
          a: {
            justifySelf: "center",
          },
        }}
      />
    );
    const container = wrapper.find("div").at(0);
    expect(container.prop("style")).toMatchObject({
      display: "grid",
      gridTemplateAreas: '"a a a" "c . d"',
      gridTemplateColumns: "4fr 2fr 6fr",
      gridTemplateRows: "100px 200px",
    });
    expect(container.children().length).toBe(3);
    expect(container.find('slot[name="a"]').parent().prop("style")).toEqual({
      gridArea: "a",
      justifySelf: "center",
    });
    expect(container.find('slot[name="c"]').parent().prop("style")).toEqual({
      gridArea: "c",
    });
    expect(container.find('slot[name="d"]').parent().prop("style")).toEqual({
      gridArea: "d",
    });
  });

  it("should work with no areas", () => {
    const wrapper = shallow(<EasyView />);
    const container = wrapper.find("div").at(0);
    expect(container.prop("style")).toMatchObject({
      display: "grid",
      gridTemplateAreas: undefined,
      gridTemplateColumns: undefined,
      gridTemplateRows: undefined,
    });
    expect(container.children().length).toBe(0);
  });
});
