import { getRuntime } from "@next-core/brick-kit";

export function encryptValue(value: string): string {
  if (getRuntime().getFeatureFlags().auth_pwd_encrypt_enable) {
    switch (getRuntime().getMiscSettings().auth_pwd_encrypt_type) {
      case "EASYBASE64":
        return btoa(value);
      default:
        return value;
    }
  } else {
    return value;
  }
}
