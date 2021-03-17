import React from "react";
import { act } from "react-dom/test-utils";
import { mount } from "enzyme";
import { SearchableTree } from "./SearchableTree";
import { Tree } from "antd";
import { BranchesOutlined } from "@ant-design/icons";

const list = [
  {
    id: "R-01",
    path: "/a",
    alias: "homepage",
    type: "bricks",
    key: "R-01",
  },
  {
    id: "R-02",
    path: "/b",
    alias: "detail-1",
    key: "R-02",
    type: "routes",
    children: [
      {
        id: "R-03",
        key: "R-03",
        path: "/b/c",
        type: "bricks",
        alias: "detail-2",
        parent: [{ id: "R-02" }],
      }
    ]
  }
];

describe("SearchableTree", () => {
  it("should work", async () => {
    const handleSelect = jest.fn();
    const handleQChange = jest.fn();
    const wrapper = mount(
      <SearchableTree
        list={list}
        defaultSelectedKeys={["R-01"]}
        icon={<BranchesOutlined />}
        field="alias"
        onSelect={handleSelect}
        onQChange={handleQChange}
      />
    );
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
    } as any);
    expect(handleSelect).toBeCalled();
    await act(async ()=>{
      wrapper.find("SearchComponent").invoke("onSearch")("detail");
      await (global as any).flushPromises();
    })
    wrapper.update();
    expect(wrapper.find(".matchedStr").length).toBe(2);
    await act(async ()=>{
      wrapper.find("SearchComponent").invoke("onSearch")(" ");
      await (global as any).flushPromises();
    })
    wrapper.update();
    expect(wrapper.find(".matchedStr").length).toBe(0);
  });
});
