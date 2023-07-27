import React from "react";
import "@testing-library/jest-dom";
import { VisualFormRulesSetting } from "./VisualFormRulesSetting";
import { mount } from "enzyme";
import { ConditionalFormat } from "../../../form-builder/src/conditional-format/ConditionalFormat";
import { LegacyDynamicFormItemV2 } from "../../../forms/src/dynamic-form-item-v2/DynamicFormItemV2";
import { ListEditor } from "./components/ListEditor/ListEditor";

describe("VisualFormRulesSetting", () => {
  it("should work", () => {
    const wrapper = mount(
      <VisualFormRulesSetting
        formChildren={[
          {
            brick: "forms.general-textArea",
            properties:
              '{"label":"userName","value":"jerry","placeholder":"请输入名称","name":"name"}',
          },
          {
            brick: "forms.general-input-number",
            properties:
              '{"label":"age","value":20,"placeholder":"请输入年龄","name":"age"}',
          },
        ]}
        value={[
          {
            title: "rule1",
            conditions: {
              groups: [
                {
                  groupId: "group_1",
                  conditions: [
                    {
                      origin: "INPUT_1(INPUT_1)",
                      operation: "equal",
                      value: "some val",
                      op: "and",
                      conditionId: "condition_40",
                    },
                  ],
                },
              ],
              op: "and",
            },
            actions: [{ actionType: "show", target: "INPUT(INPUT_1)" }],
          },
        ]}
      />
    );

    expect(wrapper.find(ListEditor).length).toBe(1);
  });
});
