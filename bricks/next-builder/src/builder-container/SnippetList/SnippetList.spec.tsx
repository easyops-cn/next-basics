import React from "react";
import { mount } from "enzyme";
import { SnippetList } from "./SnippetList";
import { useBuilderUIContext } from "../BuilderUIContext";
import { SearchableTree } from "../components/SearchableTree/SearchableTree";

jest.mock("@next-core/editor-bricks-helper", () => ({
  useBuilderNode: jest.fn().mockReturnValue({
    id: "S-02",
    name: "snippet-detail-a",
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
      snippetList: [
        {
          id: "S-01",
          name: "snippet-table",
          type: "snippet",
        },
        {
          id: "S-02",
          name: "snippet-detail-a",
          type: "snippet",
        },
        {
          id: "S-03",
          name: "snippet-detail-b",
          type: "snippet",
        },
        {
          id: "S-04",
          name: "snippet-form",
          type: "snippet",
        },
      ],
    });
    const handleSnippetClick = jest.fn();
    const wrapper = mount(
      <SnippetList handleSnippetSelect={handleSnippetClick} />
    );
    expect(wrapper.find(SearchableTree).prop("list").length).toBe(4);
    wrapper.find(SearchableTree).invoke("onQChange")("detail");
    expect(wrapper.find(SearchableTree).prop("list").length).toBe(2);
    wrapper.find(SearchableTree).invoke("onSelect")({
      id: "S-04",
      name: "snippet-form",
      type: "snippet",
    });
    expect(handleSnippetClick).toBeCalled();
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
