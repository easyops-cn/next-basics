import React from "react";
import { shallow } from "enzyme";
import { getHistory } from "@next-core/brick-kit";
import { BrickConf, Action } from "@next-core/brick-types";
import { BrickDemo } from "./BrickDemo";
import { BrickActions } from "../../components/BrickActions/BrickActions";

jest.mock("@next-core/brick-kit");

(getHistory as jest.Mock).mockReturnValue({
  location: {
    search: "",
  },
});

interface FakeStory {
  defaultConf: BrickConf;
  actions?: Action[];
}

describe("BrickDemo", () => {
  const fakeStoryOfCorrect: FakeStory = {
    defaultConf: {
      brick: "fake-brick-of-correct",
    },
  };

  it("should work when shallow rendering", () => {
    const wrapper = shallow(<BrickDemo {...fakeStoryOfCorrect} />);

    expect(() => {
      wrapper.find(BrickActions).invoke("onActionClick")("notExistedMethod", [
        "title",
        "modified",
      ]);
    }).not.toThrow();
  });
});
