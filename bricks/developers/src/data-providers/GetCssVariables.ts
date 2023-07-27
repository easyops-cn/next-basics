import { createProviderClass } from "@next-core/brick-utils";

const themeColorMap: Record<string, string[]> = {
  green: [
    "--theme-green-color",
    "--theme-green-background",
    "--theme-green-border-color"
  ],
  red: [
    "--theme-red-color",
    "--theme-red-background",
    "--theme-red-border-color"
  ],
  blue: [
    "--theme-blue-color",
    "--theme-blue-background",
    "--theme-blue-border-color"
  ],
  orange: [
    "--theme-orange-color",
    "--theme-orange-background",
    "--theme-orange-border-color"
  ],
  cyan: [
    "--theme-cyan-color",
    "--theme-cyan-background",
    "--theme-cyan-border-color"
  ],
  purple: [
    "--theme-purple-color",
    "--theme-purple-background",
    "--theme-purple-border-color"
  ],
  geekblue: [
    "--theme-geekblue-color",
    "--theme-geekblue-background",
    "--theme-geekblue-border-color"
  ],
  gray: [
    "--theme-gray-color",
    "--theme-gray-background",
    "--theme-gray-border-color"
  ]
};

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface GetCssVariablesParams {}

export async function GetCssVariables(
  params: GetCssVariablesParams
): Promise<any> {
  const data = [];

  for (const [key, list] of Object.entries(themeColorMap)) {
    data.push({
      title: key,
      group: list
    });
  }

  return data;
}

customElements.define(
  "developers.provider-get-css-variables",
  createProviderClass(GetCssVariables)
);
