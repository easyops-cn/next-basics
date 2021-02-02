import { logout, httpErrorToString, getRuntime } from "@next-core/brick-kit";
import { http } from "@next-core/brick-http";
import { logout as apiLogout } from "@sdk/auth-sdk";
import resetLegacyIframe from "../shared/resetLegacyIframe";
import { submitAsForm } from "./submitAsForm";

class GeneralLogoutElement extends HTMLElement {
  async connectedCallback(): Promise<void> {
    const flags = getRuntime().getFeatureFlags();
    try {
      await apiLogout();
      logout();
      resetLegacyIframe();

      if (flags["login-by-legacy-sso"]) {
        const { method, url, data } = await http.post("/sso/signout");
        if (method) {
          submitAsForm({
            method,
            url,
            data,
            target: "_self",
          });
          return;
        }
      }

      this.dispatchEvent(new CustomEvent("logout.success"));
    } catch (e) {
      this.textContent = httpErrorToString(e);
    }
  }
}

customElements.define("general-auth.general-logout", GeneralLogoutElement);
