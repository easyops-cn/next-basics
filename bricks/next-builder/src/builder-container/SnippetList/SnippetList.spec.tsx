import React from "react";
import { mount } from "enzyme";
import { SnippetList } from "./SnippetList";
import { useBuilderUIContext } from "../BuilderUIContext";
import { SearchableTree } from "../components/SearchableTree/SearchableTree";

jest.mock("@next-core/editor-bricks-helper", () => ({
  useBuilderNode: jest.fn().mockReturnValue({
    id: "S-02",
    snippetId: "snippet-detail-a",
    type: "snippet",
  }),
}));

jest.mock("../components/SearchableTree/SearchableTree", () => ({
  SearchableTree() {
    return <div>SearchableTree</div>;
  },
}));

jest.mock("../BuilderUIContext");

describe("SnippetList", () => {
  it("should work", async () => {
    (useBuilderUIContext as jest.Mock).mockReturnValue({
      brickList: [
        {
          id: "basic-bricks.easy-view",
          title: "easy-view",
          type: "brick",
        },
        {
          nodeId: "S-01",
          id: "snippet-table",
          title: "Snippet Table",
          isHostedSnippet: true,
          type: "snippet",
        },
        {
          nodeId: "S-02",
          id: "snippet-detail-a",
          title: "Snippet Detail A",
          isHostedSnippet: true,
          type: "snippet",
        },
        {
          id: "S-03",
          title: "snippet-detail-b",
          type: "snippet",
        },
        {
          id: "S-04",
          title: "snippet-form",
          type: "snippet",
        },
      ],
    });
    const handleSnippetClick = jest.fn();
    const wrapper = mount(
      <SnippetList handleSnippetSelect={handleSnippetClick} />
    );
    expect(wrapper.find(SearchableTree).prop("list").length).toBe(2);
    wrapper.find(SearchableTree).invoke("onQChange")("detail");
    expect(wrapper.find(SearchableTree).prop("list").length).toBe(1);
    wrapper.find(SearchableTree).invoke("onSelect")({
      nodeId: "S-01",
      id: "snippet-table",
      title: "Snippet Table",
      isHostedSnippet: true,
      type: "snippet",
    });
    expect(handleSnippetClick).toBeCalledWith({
      type: "snippet",
      id: "S-01",
      snippetId: "snippet-table",
    });
  });

  describe("empty snippet", () => {
    it("should work", async () => {
      (useBuilderUIContext as jest.Mock).mockReturnValue({
        someKey: "someValue",
      });
      const handleSnippetClick = jest.fn();
      const wrapper = mount(
        <SnippetList handleSnippetSelect={handleSnippetClick} />
      );
      expect(wrapper.find(SearchableTree).prop("list").length).toBe(0);
    });
  });

  describe("empty rootNode", () => {
    it("should work", async () => {
      (useBuilderUIContext as jest.Mock).mockReturnValue({
        someKey: "someValue",
      });
      const handleSnippetClick = jest.fn();
      const wrapper = mount(
        <SnippetList handleSnippetSelect={handleSnippetClick} />
      );
      expect(wrapper.find(SearchableTree).prop("list").length).toBe(0);
    });
  });
});
