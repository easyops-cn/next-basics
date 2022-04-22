import { encryptValue } from "./encryptValue";
import * as kit from "@next-core/brick-kit";

const flags: Record<string, boolean> = {};
const misc: Record<string, unknown> = {};

jest.spyOn(kit, "getRuntime").mockReturnValue({
  getFeatureFlags: () => flags,
  getMiscSettings: () => misc,
} as any);

describe("encryptValue", () => {
  it("should work", () => {
    expect(encryptValue("a")).toEqual("a");

    flags.auth_pwd_encrypt_enable = true;
    expect(encryptValue("a")).toEqual("a");

    misc.auth_pwd_encrypt_type = "EASYBASE64";
    expect(encryptValue("a")).toEqual("YQ==");

    flags.auth_pwd_encrypt_enable = false;
    expect(encryptValue("a")).toEqual("a");
  });
});
