import * as kit from "@next-core/brick-kit";
import { loginByLegacy } from "./loginByLegacy";

const getFeatureFlags = jest.fn();
jest.spyOn(kit, "getRuntime").mockReturnValue({
  getFeatureFlags,
  getBasePath: () => "/next/",
} as any);
jest.spyOn(kit, "getHistory").mockReturnValue({
  location: {},
} as any);

delete window.location;
const spyOnLocationAssign: jest.Mock = jest.fn();
(window as any).location = {
  assign: spyOnLocationAssign,
};

describe("loginByLegacy", () => {
  afterEach(() => {
    spyOnLocationAssign.mockClear();
  });

  it.each<[string, boolean, number, string]>([
    ["fake", false, 0, null],
    ["login-by-legacy", true, 1, "/login"],
    ["login-by-legacy-sso", true, 1, "/login/sso-auto-signin?from=%2Fnext%2F"],
  ])(
    `loginByLegacy(%j) should return %j and href to be set %j time of %j`,
    (flag, result, calledTimes, href) => {
      getFeatureFlags.mockReturnValueOnce({ [flag]: true });
      expect(loginByLegacy()).toBe(result);
      expect(spyOnLocationAssign).toBeCalledTimes(calledTimes);
      if (calledTimes > 0) {
        expect(spyOnLocationAssign).toBeCalledWith(href);
      }
    }
  );
});
