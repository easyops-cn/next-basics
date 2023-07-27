import React from "react";
import { shallow } from "enzyme";
import { getHistory } from "@next-core/brick-kit";
import { BrickConf, Action, SnippetConf } from "@next-core/brick-types";
import { BrickDemo } from "./BrickDemo";
import { BrickActions } from "../../components/BrickActions/BrickActions";

jest.mock("@next-core/brick-kit");

(getHistory as jest.Mock).mockReturnValue({
  location: {
    search: "",
  },
});

interface FakeStory {
  defaultConf: BrickConf | SnippetConf;
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

  it("should work with new snippet demo", () => {
    const wrapper = shallow(
      <BrickDemo
        {...{
          defaultConf: {
            bricks: { brick: "fake-brick-of-correct" },
            title: {
              en: "fake-brick",
              zh: "fake-brick",
            },
            actions: [
              {
                method: "fakeMethod",
                text: "fake-action",
              },
            ],
          },
        }}
      />
    );
    expect(wrapper.find(BrickActions).props().actions).toMatchObject([
      {
        method: "fakeMethod",
        text: "fake-action",
      },
    ]);
  });

  it("should work with new snippet demo with multiple bricks", () => {
    const wrapper = shallow(
      <BrickDemo
        {...{
          defaultConf: {
            bricks: [
              { brick: "fake-brick-of-correct" },
              { brick: "fake-brick-of-correct-2" },
            ],
            title: {
              en: "fake-brick",
              zh: "fake-brick",
            },
          },
          actions: [
            {
              method: "fakeMethod",
              text: "fake-action",
            },
          ],
        }}
      />
    );
    expect(wrapper.find(BrickActions).props().actions).toMatchObject([
      {
        method: "fakeMethod",
        text: "fake-action",
      },
    ]);
  });
});
