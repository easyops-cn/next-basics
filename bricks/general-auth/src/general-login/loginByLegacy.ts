import { getRuntime, getHistory } from "@next-core/brick-kit";

export function loginByLegacy(): boolean {
  const flags = getRuntime().getFeatureFlags();
  if (flags["login-by-legacy"]) {
    const from = getFromUrl();
    // Remember the from url for legacy console.
    sessionStorage.setItem("ngStorage-signInFromUrl", JSON.stringify(from));
    location.assign("/login");
    return true;
  } else if (flags["login-by-legacy-sso"]) {
    const from = getFromUrl();
    const params = new URLSearchParams({
      from,
    });
    location.assign(`/login/sso-auto-signin?${params.toString()}`);
    return true;
  }
  return false;
}

function getFromUrl(): string {
  const history = getHistory();
  const from = history.location.state?.from;
  return from ? history.createHref(from as any) : getRuntime().getBasePath();
}
