import React from "react";
import { shallow } from "enzyme";
import * as kit from "@next-core/brick-kit";
import { MicroApp } from "@next-core/brick-types";
import { Link } from "@next-libs/basic-components";
import { AppDocumentLink } from "./AppDocumentLink";
import { GeneralButton } from "../../general-button/GeneralButton";

jest.mock("@next-libs/basic-components");

const mockGetFeatureFlags = jest.fn().mockReturnValue({
  "show-app-document-link": true,
});

jest.spyOn(kit, "getRuntime").mockReturnValue({
  getFeatureFlags: mockGetFeatureFlags,
} as any);

const mockUseRecentApps = jest.spyOn(kit, "useRecentApps").mockReturnValue({
  currentApp: {
    id: "app-a",
  } as Partial<MicroApp> as MicroApp,
});

describe("AppDocumentLink", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render doc link", async () => {
    const wrapper = shallow(<AppDocumentLink />);
    expect(wrapper.find(Link).prop("to")).toBe(
      "/next-documents/apps/app-a/redirect?redirectToDocHomeIfNotFound=1"
    );
  });

  it("should render doc link with docId", async () => {
    const wrapper = shallow(<AppDocumentLink documentId="doc-a" />);
    expect(wrapper.find(Link).prop("to")).toBe(
      "/next-documents/apps/app-a?docId=doc-a"
    );
  });

  it("should render doc root if no currentApp", async () => {
    mockUseRecentApps.mockReturnValueOnce({});
    const wrapper = shallow(<AppDocumentLink />);
    expect(wrapper.find(Link).prop("to")).toBe("/next-documents");
  });

  it("should render nothing if flag is not enabled", async () => {
    mockGetFeatureFlags.mockReturnValueOnce({});
    const wrapper = shallow(<AppDocumentLink />);
    expect(wrapper.html()).toBe(null);
    expect(wrapper.find(GeneralButton)).toHaveLength(0);
  });
  it("should render button when isInNavbar is true", () => {
    const wrapper = shallow(<AppDocumentLink isInNavbar={true} />);
    expect(wrapper.find(GeneralButton)).toHaveLength(1);
  });
});
