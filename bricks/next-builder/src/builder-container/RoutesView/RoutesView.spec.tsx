import React from "react";
import { act } from "react-dom/test-utils";
import { mount } from "enzyme";
import { RoutesView } from "./RoutesView";
import { Tree } from "antd";

jest.mock("@next-core/editor-bricks-helper", () => ({
  useBuilderNode: jest.fn().mockReturnValue({
    id: "R-01",
  }),
  useRouteList: jest.fn().mockReturnValue([
    {
      id: "R-01",
      path: "/a",
      alias: "homepage",
      type: "bricks",
      parent: [],
    },
    {
      id: "R-02",
      path: "/b",
      alias: "detail-1",
      type: "routes",
    },
    {
      id: "R-03",
      path: "/b/c",
      type: "bricks",
      alias: "detail-2",
      parent: [{ id: "R-02" }],
    },
    {
      id: "R-04",
      path: "/a/d",
      type: "bricks",
      parent: [{ id: "B-01" }],
      mountPoint: "m2",
    },
    {
      id: "R-05",
      path: "/a/e",
      type: "bricks",
      parent: [{ id: "B-01" }],
      mountPoint: "m2",
    },
  ]),
}));

describe("RoutesView", () => {
  it("should work", async () => {
    const onRouteSelect = jest.fn();
    const wrapper = mount(<RoutesView handleRouteSelect={onRouteSelect} />);
    await act(async () => {
      await (global as any).flushPromises();
    });
    expect(wrapper.find(Tree).length).toBe(1);
    wrapper.find(Tree).invoke("onSelect")([], {
      node: {
        props: {
          id: "R-03",
        },
      },
    });
    expect(onRouteSelect).toBeCalled();
    wrapper.find("SearchComponent").invoke("onSearch")("detail");
    expect(wrapper.find(".matchedStr").length).toBe(2);
  });
});
