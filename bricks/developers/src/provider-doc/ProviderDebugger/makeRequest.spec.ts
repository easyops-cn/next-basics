import { developHelper } from "@next-core/brick-kit";
import { makeRequest } from "./makeRequest";

jest.spyOn(developHelper, "loadDynamicBricksInBrickConf").mockResolvedValue();

const mockProviderResolve = jest.fn();

// Mock a custom element of `my.test-provider`.
customElements.define(
  "my.test-provider",
  class Tmp extends HTMLElement {
    resolve = mockProviderResolve;
  }
);

describe("makeRequest", () => {
  it("should return response ok", async () => {
    mockProviderResolve.mockResolvedValueOnce({
      quality: "good",
    });
    const state = await makeRequest("my.test-provider", ["HOST"]);
    expect(state).toEqual({
      status: "ok",
      response: {
        quality: "good",
      },
    });
  });

  it("should return response error", async () => {
    const error = new Error("oops");
    mockProviderResolve.mockRejectedValueOnce(error);
    const state = await makeRequest("my.test-provider", ["HOST"]);
    expect(state).toEqual({
      status: "failed",
      error,
    });
  });
});
