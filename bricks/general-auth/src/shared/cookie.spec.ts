import { getCookieByName } from "./cookie";

describe("getCookieByName", () => {
  beforeEach(() => {
    Object.defineProperty(document, "cookie", {
      writable: true,
      value: "sidebar_collapsed=false; diff_view=inline",
    });
  });
  it("should work", () => {
    expect(getCookieByName("sidebar_collapsed")).toEqual("false");
    expect(getCookieByName("diff_view")).toEqual("inline");
  });

  it("not exist", () => {
    expect(getCookieByName("some_key")).toEqual("");
  });
});
