import {
  RunStoryboardFunctionTests,
  RunStoryboardFunctionTestsParams,
  RunStoryboardFunctionTestsResult,
} from "./RunStoryboardFunctionTests";

describe("RunStoryboardFunctionTests", () => {
  it.each<[RunStoryboardFunctionTestsParams, RunStoryboardFunctionTestsResult]>(
    [
      [
        {
          functions: [],
        },
        {
          coverage: {
            percentage: 100,
            stats: {
              statements: {
                percentage: 100,
                total: 0,
                covered: 0,
              },
              branches: {
                percentage: 100,
                total: 0,
                covered: 0,
              },
              functions: {
                percentage: 100,
                total: 0,
                covered: 0,
              },
              lines: {
                percentage: 100,
                total: 0,
                covered: 0,
              },
            },
            tests: {
              total: 0,
              passed: 0,
            },
          },
          coverageByFunction: {},
        },
      ],
      [
        {
          functions: [
            {
              name: "sayHello",
              source: `
              function sayHello(name) {
                return \`Hello, \${name}\`;
              }
            `,
              tests: [{ input: '["world"]', output: '"Hello, world"' }],
            },
            {
              name: "fb",
              source: `
              function fb(n: number): number {
                if (n > 1) return n * fb(n-1);
                return 1;
              }
            `,
              typescript: true,
              tests: [
                // This test case should pass.
                { input: "[1]", output: "1" },
                // This test case should fail.
                { input: "[3]", output: "3" },
              ],
            },
            {
              name: "invalidFn",
              source: `
              function invalidFn() {
                oops:
              }
            `,
              tests: [{ input: "[]", output: "null" }],
            },
            {
              name: "noTests",
              source: `
              function noTests(y) {
                return y ? "yep" : "nope";
              }
            `,
            },
          ],
        },
        {
          coverage: {
            percentage: 66.67,
            stats: {
              statements: {
                percentage: 80,
                total: 5,
                covered: 4,
              },
              branches: {
                percentage: 50,
                total: 4,
                covered: 2,
              },
              functions: {
                percentage: 66.67,
                total: 3,
                covered: 2,
              },
              lines: {
                percentage: 75,
                total: 4,
                covered: 3,
              },
            },
            tests: {
              total: 4,
              passed: 2,
            },
          },
          coverageByFunction: {
            sayHello: {
              percentage: 100,
              stats: {
                statements: {
                  percentage: 100,
                  total: 1,
                  covered: 1,
                },
                branches: {
                  percentage: 100,
                  total: 0,
                  covered: 0,
                },
                functions: {
                  percentage: 100,
                  total: 1,
                  covered: 1,
                },
                lines: {
                  percentage: 100,
                  total: 1,
                  covered: 1,
                },
              },
              tests: {
                total: 1,
                passed: 1,
                list: [true],
              },
            },
            fb: {
              percentage: 100,
              stats: {
                statements: {
                  percentage: 100,
                  total: 3,
                  covered: 3,
                },
                branches: {
                  percentage: 100,
                  total: 2,
                  covered: 2,
                },
                functions: {
                  percentage: 100,
                  total: 1,
                  covered: 1,
                },
                lines: {
                  percentage: 100,
                  total: 2,
                  covered: 2,
                },
              },
              tests: {
                total: 2,
                passed: 1,
                list: [true, false],
              },
            },
            invalidFn: null,
            noTests: {
              percentage: 0,
              stats: {
                statements: {
                  percentage: 0,
                  total: 1,
                  covered: 0,
                },
                branches: {
                  percentage: 0,
                  total: 2,
                  covered: 0,
                },
                functions: {
                  percentage: 0,
                  total: 1,
                  covered: 0,
                },
                lines: {
                  percentage: 0,
                  total: 1,
                  covered: 0,
                },
              },
              tests: {
                total: 0,
                passed: 0,
                list: [],
              },
            },
          },
        },
      ],
      [
        {
          functions: [
            {
              name: "fb",
              source: `
              function fb(n: number): number {
                if (n > 1) return n * fb(n-1);
                return 1;
              }
            `,
              typescript: true,
              tests: [
                // This test case should pass.
                { input: "[1]", output: "1" },
                // This test case should fail.
                { input: "[3]", output: "3" },
              ],
            },
          ],
          keepProcessedCoverage: true,
        },
        {
          coverage: expect.anything(),
          coverageByFunction: {
            fb: {
              percentage: 100,
              stats: {
                statements: {
                  percentage: 100,
                  total: 3,
                  covered: 3,
                },
                branches: {
                  percentage: 100,
                  total: 2,
                  covered: 2,
                },
                functions: {
                  percentage: 100,
                  total: 1,
                  covered: 1,
                },
                lines: {
                  percentage: 100,
                  total: 2,
                  covered: 2,
                },
              },
              tests: {
                total: 2,
                passed: 1,
                list: [true, false],
              },
              processedCoverage: {
                statements: {
                  total: 3,
                  covered: 3,
                  uncovered: [],
                },
                branches: {
                  total: 2,
                  covered: 2,
                  uncovered: [],
                },
                functions: {
                  total: 1,
                  covered: 1,
                  uncovered: [],
                },
                lines: {
                  total: 2,
                  covered: 2,
                  counts: new Map([
                    [
                      3,
                      {
                        count: 4,
                        startColumn: 17,
                        endColumn: 47,
                        isWholeLine: false,
                      },
                    ],
                    [
                      4,
                      {
                        count: 2,
                        startColumn: 17,
                        endColumn: 26,
                        isWholeLine: false,
                      },
                    ],
                  ]),
                },
              },
            },
          },
        },
      ],
    ]
  )("RunStoryboardFunctionTests(%j) should work", async (params, result) => {
    expect(await RunStoryboardFunctionTests(params)).toEqual(result);
  });
});
