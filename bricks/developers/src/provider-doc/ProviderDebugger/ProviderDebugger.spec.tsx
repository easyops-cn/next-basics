import React from "react";
import { shallow } from "enzyme";
import { Button, Modal } from "antd";
import AceEditor from "react-ace";
import { ProviderDebugger } from "./ProviderDebugger";
import { makeRequest } from "./makeRequest";
import { parseParameters } from "./parseParameters";

jest.mock("./makeRequest");
jest.mock("./parseParameters");

const mockModalError = jest.spyOn(Modal, "error");
const mockMakeRequest = makeRequest as jest.MockedFunction<typeof makeRequest>;
const mockParseParameters = parseParameters as jest.MockedFunction<
  typeof parseParameters
>;

describe("ProviderDebugger", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should work", () => {
    const wrapper = shallow(
      <ProviderDebugger providerName="my.test-provider" />
    );
    expect(wrapper.find(Button).prop("loading")).toBe(false);
    expect(wrapper.find(".responseContainer").hasClass("requestFailed")).toBe(
      false
    );
    expect(wrapper.find(".responseContainer").hasClass("requestOk")).toBe(
      false
    );
    expect(wrapper.find(".responseStatus").text()).toBe("LABEL_FOR_RESPONSE");
    expect(wrapper.find(".responseData").text()).toBe("");

    expect(wrapper.find(AceEditor).prop("value")).toBe("");
    wrapper.find(AceEditor).invoke("onChange")("- HOST");
    expect(wrapper.find(AceEditor).prop("value")).toBe("- HOST");
  });

  it("should make a successful request", async () => {
    const wrapper = shallow(
      <ProviderDebugger providerName="my.test-provider" />
    );
    expect(wrapper.find(Button).prop("loading")).toBe(false);
    expect(wrapper.find(".responseContainer").hasClass("requestFailed")).toBe(
      false
    );
    expect(wrapper.find(".responseContainer").hasClass("requestOk")).toBe(
      false
    );

    mockParseParameters.mockReturnValueOnce(["HOST"]);
    mockMakeRequest.mockReturnValueOnce(
      new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            status: "ok",
            response: {
              quality: "good",
            },
          });
        }, 1);
      })
    );

    wrapper.find(Button).invoke("onClick")(null);
    expect(wrapper.find(Button).prop("loading")).toBe(true);
    expect(makeRequest).toBeCalledWith("my.test-provider", ["HOST"]);
    expect(wrapper.find(".responseStatus").text()).toBe("LABEL_FOR_LOADING");

    jest.advanceTimersByTime(1);
    await (global as any).flushPromises();
    expect(wrapper.find(Button).prop("loading")).toBe(false);
    expect(wrapper.find(".responseContainer").hasClass("requestFailed")).toBe(
      false
    );
    expect(wrapper.find(".responseContainer").hasClass("requestOk")).toBe(true);
    expect(wrapper.find(".responseStatus").text()).toBe(
      "LABEL_FOR_RESPONSE_OK"
    );
    expect(wrapper.find(".responseData").text()).toBe(
      '{\n  "quality": "good"\n}'
    );
  });

  it("should make a failed request", async () => {
    const wrapper = shallow(
      <ProviderDebugger providerName="my.test-provider" />
    );
    expect(wrapper.find(Button).prop("loading")).toBe(false);
    expect(wrapper.find(".responseContainer").hasClass("requestFailed")).toBe(
      false
    );
    expect(wrapper.find(".responseContainer").hasClass("requestOk")).toBe(
      false
    );

    mockParseParameters.mockReturnValueOnce(["HOST"]);
    mockMakeRequest.mockReturnValueOnce(
      new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            status: "failed",
            error: "oops",
          });
        }, 1);
      })
    );

    wrapper.find(Button).invoke("onClick")(null);
    expect(wrapper.find(Button).prop("loading")).toBe(true);
    expect(makeRequest).toBeCalledWith("my.test-provider", ["HOST"]);
    expect(wrapper.find(".responseStatus").text()).toBe("LABEL_FOR_LOADING");

    jest.advanceTimersByTime(1);
    await (global as any).flushPromises();
    expect(wrapper.find(Button).prop("loading")).toBe(false);
    expect(wrapper.find(".responseContainer").hasClass("requestFailed")).toBe(
      true
    );
    expect(wrapper.find(".responseContainer").hasClass("requestOk")).toBe(
      false
    );
    expect(wrapper.find(".responseStatus").text()).toBe(
      "LABEL_FOR_RESPONSE_ERROR"
    );
    expect(wrapper.find(".responseData").text()).toBe('"oops"');
  });

  it("should not make a request if parameters is not an array", () => {
    const wrapper = shallow(
      <ProviderDebugger providerName="my.test-provider" />
    );
    expect(wrapper.find(Button).prop("loading")).toBe(false);

    mockParseParameters.mockReturnValueOnce({ data: "oops" });

    wrapper.find(Button).invoke("onClick")(null);
    expect(wrapper.find(Button).prop("loading")).toBe(false);
    expect(makeRequest).not.toBeCalled();
    expect(mockModalError).toBeCalledWith(
      expect.objectContaining({
        content: "ERROR_CONTENT_FOR_PARAMETERS",
      })
    );
  });

  it("should not make a request if failed to parse parameters", () => {
    const wrapper = shallow(
      <ProviderDebugger providerName="my.test-provider" />
    );
    expect(wrapper.find(Button).prop("loading")).toBe(false);

    mockParseParameters.mockReturnValueOnce(new Error("oops"));

    wrapper.find(Button).invoke("onClick")(null);
    expect(wrapper.find(Button).prop("loading")).toBe(false);
    expect(makeRequest).not.toBeCalled();
    expect(mockModalError).toBeCalledWith(
      expect.objectContaining({
        content: "Error: oops",
      })
    );
  });
});
