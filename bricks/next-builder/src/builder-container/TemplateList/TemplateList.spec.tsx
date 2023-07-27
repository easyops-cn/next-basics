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

describe("TemplateList", () => {
  it("should work", async () => {
    const templateList = [
      {
        type: "customTemplate",
        templateId: "tpl-table",
        title: "tpl-table",
        id: "T-01",
      },
      {
        type: "customTemplate",
        templateId: "tpl-detail-a",
        title: "tpl-detail-a",
        id: "T-02",
      },
      {
        type: "customTemplate",
        templateId: "tpl-detail-b",
        title: "tpl-detail-b",
        id: "T-03",
      },
      {
        type: "customTemplate",
        templateId: "tpl-form",
        title: "tpl-form",
        id: "T-04",
      },
    ];

    (useBuilderUIContext as jest.Mock).mockReturnValue({
      templateList,
    });
    const handleTemplateClick = jest.fn();
    const wrapper = mount(
      <TemplateList handleTemplateSelect={handleTemplateClick} />
    );
    expect(wrapper.find(SearchableTree).prop("list").length).toBe(4);
    wrapper.find(SearchableTree).invoke("onQChange")("detail");
    expect(wrapper.find(SearchableTree).prop("list").length).toBe(2);
    wrapper.find(SearchableTree).invoke("onSelect")(templateList[0]);
    expect(handleTemplateClick).toBeCalledWith(templateList[0]);
  });

  it("should work for empty template", async () => {
    (useBuilderUIContext as jest.Mock).mockReturnValue({
      someKey: "someValue",
    });
    const wrapper = mount(<TemplateList />);
    expect(wrapper.find(SearchableTree).prop("list").length).toBe(0);
  });
});
