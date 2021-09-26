import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { shallow } from "enzyme";

import { BrickAsComponent, getHistory } from "@next-core/brick-kit";
import { UseBrickConf } from "@next-core/brick-types";
import { BrickQuickEntries } from "./BrickQuickEntries";
import { LinkProps } from "./index";

jest.mock("@next-core/brick-kit");
const mockGetHistory = getHistory as jest.Mock;
const historyPushFn = jest.fn();
mockGetHistory.mockReturnValue({ push: historyPushFn });

describe("BrickQuickEntries", () => {
  it("should work", () => {
    const links: LinkProps[] = [
      {
        icon: {
          lib: "antd",
          type: "info",
        },
        text: "单值构件",
        target: "/developers/brick-book/atom/single-value",
      },
      {
        icon: {
          lib: "antd",
          type: "line-chart",
        },
        text: "趋势图构件",
        target: "/developers/brick-book/atom/trend-chart",
      },
      {
        icon: {
          lib: "antd",
          type: "pie-chart",
        },
        text: "饼图构件",
        target: "/developers/brick-book/atom/pie-chart",
      },
    ];

    const result = render(
      <BrickQuickEntries row={2} column={2} links={links} mode="default" />
    );
    const asFragment = result.asFragment;
    expect(asFragment()).toBeTruthy();
    const content = result.container;
    const link = content.querySelector(".linkWrapper");
    fireEvent.click(link);
    expect(historyPushFn).toBeCalled();
  });

  it("useBricks should work", () => {
    const useBricks: UseBrickConf = [
      {
        brick: "div",
      },
      {
        brick: "div",
      },
    ];

    const wrapper = shallow(
      <BrickQuickEntries
        row={1}
        column={3}
        useBricks={useBricks}
        data={["a", "b"]}
        titleList={[
          {
            title: "666",
            icon: {
              lib: "easyops",
              category: "default",
              icon: "language",
            },
            value: "777",
          },
        ]}
        divider={true}
        mode={"multiCardNoLine"}
      />
    );
    expect(wrapper.find(BrickAsComponent).length).toBe(2);
  });
});
