import {
  ScanFunctionsInStoryboard,
  ScanFunctionsInStoryboardParams,
} from "./ScanFunctionsInStoryboard";

const consoleError = jest
  .spyOn(console, "error")
  .mockImplementation(() => void 0);

const selfRef: Record<string, unknown> = {
  quality: "good",
};
selfRef.ref = selfRef;

describe("ScanFunctionsInStoryboard", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it.each<[ScanFunctionsInStoryboardParams, string[], number]>([
    [
      {
        storyboard: {
          routes: [
            {
              if: "<% FN.goodOne() %>",
              bricks: [
                {
                  brick: "b-a",
                  properties: {
                    any: "<% DATA |> FN.goodTwo %>",
                    recursive: "<% FN.goodThree(FN.goodFour) %>",
                    selfRef,
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
                      any: "<% FN.goodFive() %>",
                      anyDuplicate: "<% FN.goodFive() %>",
                      notRelevant: "<% some.any %>",
                      bad: "FN.badOne()",
                      bad2: "<% FN['badOne']() %>",
                      bad3: "<% FN[badOne]() %>",
                      bad4: "<% walk(FN, 'doBad') %>",
                      bad5: "<% FN.badOne( %>",
                    },
                  },
                ],
              },
            ],
            functions: [
              {
                name: "sayHello",
                source: `
                  function sayHello(name){
                    return FN.sayExclamation('Hello, ' + name);
                  }
                `,
                description: "<% FN.badOne() %>",
              },
              {
                name: "sayError",
                source: `
                  function sayError() {
                    return FN.badOne(
                  }
                `,
              },
            ],
          },
          app: {
            homepage: "<% FN.badOne() %>",
          },
        } as any,
      },
      [
        "goodOne",
        "goodTwo",
        "goodThree",
        "goodFour",
        "goodFive",
        "sayExclamation",
      ],
      2,
    ],
    [{ storyboard: {} as any }, [], 0],
  ])(
    "ScanFunctionsInStoryboard(%j) should work",
    (params, result, errorTimes) => {
      expect(ScanFunctionsInStoryboard(params)).toEqual(result);
      expect(consoleError).toBeCalledTimes(errorTimes);
    }
  );
});
