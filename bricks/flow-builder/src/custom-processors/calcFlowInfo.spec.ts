import { calcFlowInfo } from "./calcFlowInfo";

jest.mock("@next-core/brick-kit", () => ({
  getRuntime: () => ({
    registerCustomProcessor: jest.fn(),
  }),
}));

describe("calcFlowInfo", () => {
  it("should work", () => {
    const fieldData = {
      name: "a",
      stepId: "1",
      value: "<% a %>",
      source: "cel",
    };

    expect(
      calcFlowInfo(
        [{ stepId: "1", action: { fieldsMappingFrontend: [] } }],
        fieldData
      )
    ).toEqual([
      {
        action: {
          fieldsMappingFrontend: [
            { name: "a", source: "cel", value: "<% a %>" },
          ],
        },
        stepId: "1",
      },
    ]);

    expect(calcFlowInfo([{ stepId: "1", action: {} }], fieldData)).toEqual([
      {
        action: {
          fieldsMappingFrontend: [
            { name: "a", source: "cel", value: "<% a %>" },
          ],
        },
        stepId: "1",
      },
    ]);

    expect(calcFlowInfo([{ stepId: "2", action: {} }], fieldData)).toEqual([
      { action: {}, stepId: "2" },
    ]);

    expect(
      calcFlowInfo(
        [
          {
            stepId: "1",
            action: { fieldsMappingFrontend: [{ name: "b", value: "vv" }] },
          },
        ],
        fieldData
      )
    ).toEqual([
      {
        action: {
          fieldsMappingFrontend: [
            { name: "b", value: "vv" },
            { name: "a", source: "cel", value: "<% a %>" },
          ],
        },
        stepId: "1",
      },
    ]);

    expect(
      calcFlowInfo(
        [
          {
            stepId: "1",
            action: { fieldsMappingFrontend: [{ name: "a", value: "vv" }] },
          },
        ],
        fieldData
      )
    ).toEqual([
      {
        action: {
          fieldsMappingFrontend: [
            { name: "a", source: "cel", value: "<% a %>" },
          ],
          fieldsMappingType: "form",
        },
        stepId: "1",
      },
    ]);
  });
});
