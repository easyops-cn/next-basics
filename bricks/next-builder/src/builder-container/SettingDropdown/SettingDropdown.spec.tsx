import React from "react";
import { mount } from "enzyme";
import { SettingDropdown } from "./SettingDropdown";
import { Switch } from "antd";
import { useBuilderDataManager } from "@next-core/editor-bricks-helper";
import { JsonStorage } from "@next-libs/storage";
import { localStorageKeyForShowRelatedNodesBasedOnEvents } from "../constants";

jest.mock("@next-libs/storage");
jest.mock("@next-core/editor-bricks-helper");

const mockSetShowRelatedNodesBasedOnEvents = jest.fn();
const mockManager = {
  setShowRelatedNodesBasedOnEvents: mockSetShowRelatedNodesBasedOnEvents,
};
(useBuilderDataManager as jest.Mock).mockReturnValue(mockManager);
const mockJsonStorage = JsonStorage as jest.MockedClass<typeof JsonStorage>;

describe("SettingDropdown", () => {
  it("should work for bricks", async () => {
    const wrapper = mount(<SettingDropdown />);

    expect(wrapper.find(".settingContainer").length).toBe(0);
    wrapper.find("a").filter("[data-testid='setting-btn']").simulate("click");
    expect(wrapper.find(".settingContainer").length).toBe(1);
    const mockJsonStorageSetItem = mockJsonStorage.mock.instances[0].setItem;
    wrapper.find(Switch).invoke("onChange")(true);
    expect(mockJsonStorageSetItem).toBeCalledWith(
      localStorageKeyForShowRelatedNodesBasedOnEvents,
      true
    );
    expect(mockSetShowRelatedNodesBasedOnEvents).toBeCalled();
  });
});
