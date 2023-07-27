import i18next from "i18next";
import { launchpadService } from "./app-bar/LaunchpadService";
const spyOnAddResourceBundle = (i18next.addResourceBundle = jest.fn());

const spyOnDefine = jest.spyOn(window.customElements, "define");
jest.mock("./app-bar/LaunchpadService");
// Use `require` instead of `import` to avoid hoisting.
require("./index");

describe("index", () => {
  it("should add i18n resource bundle", () => {
    expect(spyOnAddResourceBundle).toBeCalled();
  });
  it("should define custom elements", () => {
    expect(spyOnDefine).toBeCalled();
  });
});
