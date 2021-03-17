import React from "react";
import { mount } from "enzyme";
import { TemplateList } from "./TemplateList";
import { useBuilderUIContext } from "../BuilderUIContext";
import { SearchableTree } from "../components/SearchableTree/SearchableTree";

jest.mock("@next-core/editor-bricks-helper", () => ({
  useBuilderNode: jest.fn().mockReturnValue({
    id: "T-02",
    name: "tpl-detail-a",
    type: "customTemplate",
  }),
}));

jest.mock("../components/SearchableTree/SearchableTree", () => ({
  SearchableTree() {
    return <div>SearchableTree</div>;
  },
}));

jest.mock("../BuilderUIContext");

(useBuilderUIContext as jest.Mock).mockReturnValue({
  brickList: [
    {
      id: "B-01",
      name: "pkg.brick-01",
      type: "brick",
    },
    {
      id: "T-01",
      name: "tpl-table",
      type: "customTemplate",
    },
    {
      id: "T-02",
      name: "tpl-detail-a",
      type: "customTemplate",
    },
    {
      id: "T-03",
      name: "tpl-detail-b",
      type: "customTemplate",
    },
    {
      id: "T-04",
      name: "tpl-form",
      type: "customTemplate",
    },
  ],
});

describe("TemplateList", () => {
  it("should work", async () => {
    const handleTemplateClick = jest.fn();
    const wrapper = mount(
      <TemplateList handleTemplateSelect={handleTemplateClick} />
    );
    expect(wrapper.find(SearchableTree).prop("list").length).toBe(4);
    wrapper.find(SearchableTree).invoke("onQChange")("detail");
    expect(wrapper.find(SearchableTree).prop("list").length).toBe(2);
    wrapper.find(SearchableTree).invoke("onSelect")({
      id: "T-04",
      name: "tpl-form",
      type: "customTemplate",
    });
    expect(handleTemplateClick).toBeCalled();
  });
});
