import { createProviderClass } from "@next-core/brick-utils";
import crontab from "@next-libs/crontab";

type CrontabType = "minute" | "hour" | "date" | "month" | "dow";

/**
 * 将forms.crontab-input的value转换为可读字符串
 *
 * ```ts
    ctx:
        name: crontabFormat
        useProvider: forms.get-crontab-input-format-provider

    brick: a
    properties:
        b: <% CTX.crontabFormat(...) %>
 * ```
 *
 * @returns (crontabStr: string) => string
 */

export function CrontabFormat() {
  return (crontabStr: string) => {
    const crontabTimeObj = parseCrontab(crontabStr);
    return crontab.format(crontabTimeObj, true);
  };
}
function parseCrontab(str = "* * * * *"): Record<CrontabType, string> {
  const [minute, hour, date, month, dow] = str.split(" ");
  return {
    minute,
    hour,
    date,
    month,
    dow,
  };
}

customElements.define(
  "forms.get-crontab-input-format-provider",
  createProviderClass(CrontabFormat)
);
