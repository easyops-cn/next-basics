import React from "react";
import { shallow } from "enzyme";
import { BrickResult } from "./BrickResult";
import { BrickResultStatus } from "../interfaces/brick-result";
import { EmptyResultStatus } from "@next-libs/basic-components/EmptyResultStatus";
import {
  useFeatureFlags,
  getRuntime,
  useCurrentApp,
} from "@next-core/brick-kit";

jest.mock("@next-core/brick-kit");
(useFeatureFlags as jest.Mock).mockReturnValue([false]);
(useCurrentApp as jest.Mock).mockReturnValue({ id: "events" });

(getRuntime as jest.Mock).mockReturnValue({
  getMiscSettings: jest.fn().mockReturnValue({
    supportedNewIllustrationApps: [],
  }),
});

describe("BrickResult", () => {
  it("should work", () => {
    const wrapper = shallow(
      <BrickResult
        status={BrickResultStatus.Success}
        title="Success"
        illustrationsConfig={{}}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("should work, with custom icon", () => {
    const wrapper = shallow(
      <BrickResult
        status={BrickResultStatus.Success}
        title="Success"
        icon="question"
        illustrationsConfig={{}}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("empty should work", () => {
    const wrapper = shallow(
      <BrickResult status={EmptyResultStatus.Empty} illustrationsConfig={{}} />
    );
    expect(wrapper.find("Result").prop("subTitle")).toBeUndefined();
  });
  it("should work with customize", () => {
    const wrapper = shallow(
      <BrickResult status={"illustrations"} illustrationsConfig={{}} />
    );
    expect(wrapper.find("Result").prop("status")).toBe("illustrations");
  });

  it("should work with featureFlags is true and contain events app", () => {
    (useFeatureFlags as jest.Mock).mockReturnValue([true]);
    (getRuntime as jest.Mock).mockReturnValue({
      getMiscSettings: jest.fn().mockReturnValue({
        supportedNewIllustrationApps: ["events"],
      }),
    });

    const wrapper = shallow(
      <BrickResult status={"illustrations"} illustrationsConfig={{}} />
    );
    expect(wrapper.find("Result").prop("status")).toBe("illustrations");
  });
});
