import {
  I18NItem,
  ScanI18nInStoryboard,
  ScanI18nInStoryboardParams,
} from "./ScanI18nInStoryboard";

describe("ScanI18nInStoryboard", () => {
  it.each<[ScanI18nInStoryboardParams, I18NItem[]]>([
    [
      {
        storyboard: {
          routes: [
            {
              path: "/",
              bricks: [
                {
                  brick: "b-a",
                  properties: {
                    any: "<% I18N('MY_KEY_B', 'My key b') %>",
                    any2: "<% I18N('MY_KEY_C', 'My key c') %>",
                    any3: "<% I18N('MY_KEY_C', 'My key c v2') %>",
                    any4: "<% I18N('MY_KEY_D', {}) %>",
                  },
                },
              ],
            },
          ],
          meta: {
            customTemplates: [
              {
                name: "ct-a",
                bricks: [
                  {
                    brick: "b-x",
                    bg: true,
                    properties: {
                      any: "<% I18N('MY_KEY_A') %>",
                    },
                  },
                ],
              },
            ],
          },
          app: null,
        },
      },
      [
        ["MY_KEY_B", ["My key b"]],
        ["MY_KEY_C", ["My key c", "My key c v2"]],
        ["MY_KEY_D", []],
        ["MY_KEY_A", []],
      ],
    ],
  ])("ScanI18nInStoryboard() should work", async (params, result) => {
    expect(await ScanI18nInStoryboard(params)).toEqual(result);
  });
});
