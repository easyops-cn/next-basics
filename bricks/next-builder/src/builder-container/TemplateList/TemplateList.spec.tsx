import React from "react";
import { mount } from "enzyme";
import { TemplateList } from "./TemplateList";
import { useBuilderUIContext } from "../BuilderUIContext";
import { SearchableTree } from "../components/SearchableTree/SearchableTree";

jest.mock("@next-core/editor-bricks-helper", () => ({
  useBuilderNode: jest.fn().mockReturnValue({
    id: "T-02",
    title: "tpl-detail-a",
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
      type: "brick",
      id: "pkg.brick-01",
      title: "brick-01",
    },
    {
      type: "customTemplate",
      id: "tpl-table",
      title: "tpl-table",
      nodeId: "T-01",
    },
    {
      type: "customTemplate",
      id: "tpl-detail-a",
      title: "tpl-detail-a",
      nodeId: "T-02",
    },
    {
      type: "customTemplate",
      id: "tpl-detail-b",
      title: "tpl-detail-b",
      nodeId: "T-03",
    },
    {
      type: "customTemplate",
      id: "tpl-form",
      title: "tpl-form",
      nodeId: "T-04",
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
      type: "customTemplate",
      id: "tpl-form",
      title: "tpl-form",
      nodeId: "T-04",
    });
    expect(handleTemplateClick).toBeCalledWith({
      type: "custom-template",
      id: "T-04",
      templateId: "tpl-form",
    });
  });
});
