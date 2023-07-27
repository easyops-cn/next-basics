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
    const snippetList = [
      {
        id: "S-01",
        snippetId: "snippet-table",
        title: "Snippet Table",
        isHostedSnippet: true,
        type: "snippet",
      },
      {
        id: "S-02",
        snippetId: "snippet-detail-a",
        title: "Snippet Detail A",
        isHostedSnippet: true,
        type: "snippet",
      },
      {
        id: "S-03",
        snippetId: "snippet-detail-b",
        title: "Snippet Detail B",
        isHostedSnippet: true,
        type: "snippet",
      },
      {
        id: "S-04",
        snippetId: "snippet-form",
        title: "Snippet Form",
        isHostedSnippet: true,
        type: "snippet",
      },
    ];
    (useBuilderUIContext as jest.Mock).mockReturnValue({
      snippetList,
    });
    const handleSnippetClick = jest.fn();
    const wrapper = mount(
      <SnippetList handleSnippetSelect={handleSnippetClick} />
    );
    expect(wrapper.find(SearchableTree).prop("list").length).toBe(4);
    wrapper.find(SearchableTree).invoke("onQChange")("detail");
    expect(wrapper.find(SearchableTree).prop("list").length).toBe(2);
    wrapper.find(SearchableTree).invoke("onSelect")(snippetList[0]);
    expect(handleSnippetClick).toBeCalledWith(snippetList[0]);
  });

  it("should work for empty snippet", async () => {
    (useBuilderUIContext as jest.Mock).mockReturnValue({
      someKey: "someValue",
    });
    const wrapper = mount(<SnippetList />);
    expect(wrapper.find(SearchableTree).prop("list").length).toBe(0);
  });
});
