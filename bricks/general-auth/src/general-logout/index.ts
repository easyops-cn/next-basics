import { logout, httpErrorToString, getRuntime } from "@next-core/brick-kit";
import { http } from "@next-core/brick-http";
import { logout as apiLogout } from "@next-sdk/auth-sdk";
import { resetLegacyIframe } from "../shared";
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

      const logoutFromUrl = sessionStorage.getItem(
        "easyops-auth-logoutFromUrl"
      );
      const logoutFromUrlFull = sessionStorage.getItem(
        "easyops-auth-logoutFromUrlFull"
      );

      this.dispatchEvent(
        new CustomEvent("logout.success", {
          detail: {
            logout_from: logoutFromUrl,
            logout_from_full: logoutFromUrlFull,
          },
        })
      );

      sessionStorage.removeItem("easyops-auth-logoutFromUrl");
      sessionStorage.removeItem("easyops-auth-logoutFromUrlFull");
    } catch (e) {
      this.textContent = httpErrorToString(e);
    }
  }
}

customElements.define("general-auth.general-logout", GeneralLogoutElement);
