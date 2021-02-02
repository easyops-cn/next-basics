import React from "react";
import { shallow } from "enzyme";
import { MultipleColumnsCard, transformCss } from "./MultipleColumnsCard";

describe("MultipleColumnsCard", () => {
  it("should work", () => {
    const wrapper = shallow(
      <MultipleColumnsCard gridColumns={["400px", "200px"]} cardBorder={true} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  describe("transformCss processor", () => {
    it("should transform gridColumns props to grid css", () => {
      const gridColumns = ["400px", 1, 4, "600px"];

      const result = transformCss(gridColumns);

      expect(result).toEqual("400px 1fr 4fr 600px ");
    });

    it("should return origin value if the gridColumns value is string", () => {
      const result = transformCss("40px");
      expect(result).toEqual("40px ");

      const result2 = transformCss("40px 1fr 500px 3fr");
      expect(result2).toEqual("40px 1fr 500px 3fr ");
    });

    it("should return default value if the gridColumns props is empty", () => {
      const result = transformCss(undefined);
      expect(result).toEqual("1fr");
    });
  });
});
