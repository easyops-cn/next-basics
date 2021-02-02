import { GetCssVariables, GetCssVariablesParams } from "./GetCssVariables";

describe("GetCssVariables", () => {
  it.each<[GetCssVariablesParams, any]>([
    [
      {},
      [
        {
          group: [
            "--theme-green-color",
            "--theme-green-background",
            "--theme-green-border-color"
          ],
          title: "green"
        },
        {
          group: [
            "--theme-red-color",
            "--theme-red-background",
            "--theme-red-border-color"
          ],
          title: "red"
        },
        {
          group: [
            "--theme-blue-color",
            "--theme-blue-background",
            "--theme-blue-border-color"
          ],
          title: "blue"
        },
        {
          group: [
            "--theme-orange-color",
            "--theme-orange-background",
            "--theme-orange-border-color"
          ],
          title: "orange"
        },
        {
          group: [
            "--theme-cyan-color",
            "--theme-cyan-background",
            "--theme-cyan-border-color"
          ],
          title: "cyan"
        },
        {
          group: [
            "--theme-purple-color",
            "--theme-purple-background",
            "--theme-purple-border-color"
          ],
          title: "purple"
        },
        {
          group: [
            "--theme-geekblue-color",
            "--theme-geekblue-background",
            "--theme-geekblue-border-color"
          ],
          title: "geekblue"
        },
        {
          group: [
            "--theme-gray-color",
            "--theme-gray-background",
            "--theme-gray-border-color"
          ],
          title: "gray"
        }
      ]
    ]
  ])("GetCssVariables(%j) should work", async (params, result) => {
    expect(await GetCssVariables(params)).toEqual(result);
  });
});
