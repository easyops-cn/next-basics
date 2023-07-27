import {
  FlattenConfig,
  flattenTreeDataListAndCalcRowSpan,
} from "./flattenTreeDataListAndCalcRowSpan";

jest.mock("@next-core/brick-kit", () => ({
  getRuntime: () => ({
    registerCustomProcessor: jest.fn(),
  }),
}));

const treeDataList = [
  {
    id: "1",
    value: "value 1",
    childrenKey1: [
      {
        id: "1-1",
        value: "value 1-1",
        childrenKey2: [
          {
            id: "1-1-1",
            value: "value 1-1-1",
          },
          {
            id: "1-1-2",
            value: "value 1-1-2",
          },
        ],
      },
      {
        id: "1-2",
        value: "value 1-2",
        childrenKey2: [
          {
            id: "1-2-1",
            value: "value 1-2-1",
          },
          {
            id: "1-2-2",
            value: "value 1-2-2",
          },
        ],
      },
    ],
  },
  {
    id: "2",
    value: "value 2",
    childrenKey1: [
      {
        id: "2-1",
        value: "value 2-1",
        childrenKey2: [
          {
            id: "2-1-1",
            value: "value 2-1-1",
          },
          {
            id: "2-1-2",
            value: "value 2-1-2",
          },
        ],
      },
      {
        id: "2-2",
        value: "value 2-2",
        childrenKey2: [
          {
            id: "2-2-1",
            value: "value 2-2-1",
          },
          {
            id: "2-2-2",
            value: "value 2-2-2",
          },
        ],
      },
    ],
  },
];

const flattenConfigs: FlattenConfig[] = [
  {
    childrenKey: "childrenKey1",
    parentInChildKey: "parentInChildKey1",
  },
  {
    childrenKey: "childrenKey2",
    parentInChildKey: "parentInChildKey2",
  },
  {
    childrenKey: "childrenKey3",
    parentInChildKey: "parentInChildKey3",
  },
];

describe("flattenTreeDataListAndCalcRowSpan", () => {
  it("should work", () => {
    expect(
      flattenTreeDataListAndCalcRowSpan(treeDataList, { flattenConfigs })
    ).toEqual([
      {
        id: "1-1-1",
        parentInChildKey1: {
          childrenKey1: [
            {
              childrenKey2: [
                { id: "1-1-1", value: "value 1-1-1" },
                { id: "1-1-2", value: "value 1-1-2" },
              ],
              id: "1-1",
              value: "value 1-1",
            },
            {
              childrenKey2: [
                { id: "1-2-1", value: "value 1-2-1" },
                { id: "1-2-2", value: "value 1-2-2" },
              ],
              id: "1-2",
              value: "value 1-2",
            },
          ],
          id: "1",
          value: "value 1",
        },
        parentInChildKey1RowSpan: 4,
        parentInChildKey2: {
          childrenKey2: [
            { id: "1-1-1", value: "value 1-1-1" },
            { id: "1-1-2", value: "value 1-1-2" },
          ],
          id: "1-1",
          value: "value 1-1",
        },
        parentInChildKey2RowSpan: 2,
        value: "value 1-1-1",
      },
      {
        id: "1-1-2",
        parentInChildKey1: {
          childrenKey1: [
            {
              childrenKey2: [
                { id: "1-1-1", value: "value 1-1-1" },
                { id: "1-1-2", value: "value 1-1-2" },
              ],
              id: "1-1",
              value: "value 1-1",
            },
            {
              childrenKey2: [
                { id: "1-2-1", value: "value 1-2-1" },
                { id: "1-2-2", value: "value 1-2-2" },
              ],
              id: "1-2",
              value: "value 1-2",
            },
          ],
          id: "1",
          value: "value 1",
        },
        parentInChildKey1RowSpan: 0,
        parentInChildKey2: {
          childrenKey2: [
            { id: "1-1-1", value: "value 1-1-1" },
            { id: "1-1-2", value: "value 1-1-2" },
          ],
          id: "1-1",
          value: "value 1-1",
        },
        parentInChildKey2RowSpan: 0,
        value: "value 1-1-2",
      },
      {
        id: "1-2-1",
        parentInChildKey1: {
          childrenKey1: [
            {
              childrenKey2: [
                { id: "1-1-1", value: "value 1-1-1" },
                { id: "1-1-2", value: "value 1-1-2" },
              ],
              id: "1-1",
              value: "value 1-1",
            },
            {
              childrenKey2: [
                { id: "1-2-1", value: "value 1-2-1" },
                { id: "1-2-2", value: "value 1-2-2" },
              ],
              id: "1-2",
              value: "value 1-2",
            },
          ],
          id: "1",
          value: "value 1",
        },
        parentInChildKey1RowSpan: 0,
        parentInChildKey2: {
          childrenKey2: [
            { id: "1-2-1", value: "value 1-2-1" },
            { id: "1-2-2", value: "value 1-2-2" },
          ],
          id: "1-2",
          value: "value 1-2",
        },
        parentInChildKey2RowSpan: 2,
        value: "value 1-2-1",
      },
      {
        id: "1-2-2",
        parentInChildKey1: {
          childrenKey1: [
            {
              childrenKey2: [
                { id: "1-1-1", value: "value 1-1-1" },
                { id: "1-1-2", value: "value 1-1-2" },
              ],
              id: "1-1",
              value: "value 1-1",
            },
            {
              childrenKey2: [
                { id: "1-2-1", value: "value 1-2-1" },
                { id: "1-2-2", value: "value 1-2-2" },
              ],
              id: "1-2",
              value: "value 1-2",
            },
          ],
          id: "1",
          value: "value 1",
        },
        parentInChildKey1RowSpan: 0,
        parentInChildKey2: {
          childrenKey2: [
            { id: "1-2-1", value: "value 1-2-1" },
            { id: "1-2-2", value: "value 1-2-2" },
          ],
          id: "1-2",
          value: "value 1-2",
        },
        parentInChildKey2RowSpan: 0,
        value: "value 1-2-2",
      },
      {
        id: "2-1-1",
        parentInChildKey1: {
          childrenKey1: [
            {
              childrenKey2: [
                { id: "2-1-1", value: "value 2-1-1" },
                { id: "2-1-2", value: "value 2-1-2" },
              ],
              id: "2-1",
              value: "value 2-1",
            },
            {
              childrenKey2: [
                { id: "2-2-1", value: "value 2-2-1" },
                { id: "2-2-2", value: "value 2-2-2" },
              ],
              id: "2-2",
              value: "value 2-2",
            },
          ],
          id: "2",
          value: "value 2",
        },
        parentInChildKey1RowSpan: 4,
        parentInChildKey2: {
          childrenKey2: [
            { id: "2-1-1", value: "value 2-1-1" },
            { id: "2-1-2", value: "value 2-1-2" },
          ],
          id: "2-1",
          value: "value 2-1",
        },
        parentInChildKey2RowSpan: 2,
        value: "value 2-1-1",
      },
      {
        id: "2-1-2",
        parentInChildKey1: {
          childrenKey1: [
            {
              childrenKey2: [
                { id: "2-1-1", value: "value 2-1-1" },
                { id: "2-1-2", value: "value 2-1-2" },
              ],
              id: "2-1",
              value: "value 2-1",
            },
            {
              childrenKey2: [
                { id: "2-2-1", value: "value 2-2-1" },
                { id: "2-2-2", value: "value 2-2-2" },
              ],
              id: "2-2",
              value: "value 2-2",
            },
          ],
          id: "2",
          value: "value 2",
        },
        parentInChildKey1RowSpan: 0,
        parentInChildKey2: {
          childrenKey2: [
            { id: "2-1-1", value: "value 2-1-1" },
            { id: "2-1-2", value: "value 2-1-2" },
          ],
          id: "2-1",
          value: "value 2-1",
        },
        parentInChildKey2RowSpan: 0,
        value: "value 2-1-2",
      },
      {
        id: "2-2-1",
        parentInChildKey1: {
          childrenKey1: [
            {
              childrenKey2: [
                { id: "2-1-1", value: "value 2-1-1" },
                { id: "2-1-2", value: "value 2-1-2" },
              ],
              id: "2-1",
              value: "value 2-1",
            },
            {
              childrenKey2: [
                { id: "2-2-1", value: "value 2-2-1" },
                { id: "2-2-2", value: "value 2-2-2" },
              ],
              id: "2-2",
              value: "value 2-2",
            },
          ],
          id: "2",
          value: "value 2",
        },
        parentInChildKey1RowSpan: 0,
        parentInChildKey2: {
          childrenKey2: [
            { id: "2-2-1", value: "value 2-2-1" },
            { id: "2-2-2", value: "value 2-2-2" },
          ],
          id: "2-2",
          value: "value 2-2",
        },
        parentInChildKey2RowSpan: 2,
        value: "value 2-2-1",
      },
      {
        id: "2-2-2",
        parentInChildKey1: {
          childrenKey1: [
            {
              childrenKey2: [
                { id: "2-1-1", value: "value 2-1-1" },
                { id: "2-1-2", value: "value 2-1-2" },
              ],
              id: "2-1",
              value: "value 2-1",
            },
            {
              childrenKey2: [
                { id: "2-2-1", value: "value 2-2-1" },
                { id: "2-2-2", value: "value 2-2-2" },
              ],
              id: "2-2",
              value: "value 2-2",
            },
          ],
          id: "2",
          value: "value 2",
        },
        parentInChildKey1RowSpan: 0,
        parentInChildKey2: {
          childrenKey2: [
            { id: "2-2-1", value: "value 2-2-1" },
            { id: "2-2-2", value: "value 2-2-2" },
          ],
          id: "2-2",
          value: "value 2-2",
        },
        parentInChildKey2RowSpan: 0,
        value: "value 2-2-2",
      },
    ]);
    expect(
      flattenTreeDataListAndCalcRowSpan(treeDataList, {
        flattenConfigs,
        omitChildrenInParent: true,
      })
    ).toEqual([
      {
        id: "1-1-1",
        parentInChildKey1: { id: "1", value: "value 1" },
        parentInChildKey1RowSpan: 4,
        parentInChildKey2: { id: "1-1", value: "value 1-1" },
        parentInChildKey2RowSpan: 2,
        value: "value 1-1-1",
      },
      {
        id: "1-1-2",
        parentInChildKey1: { id: "1", value: "value 1" },
        parentInChildKey1RowSpan: 0,
        parentInChildKey2: { id: "1-1", value: "value 1-1" },
        parentInChildKey2RowSpan: 0,
        value: "value 1-1-2",
      },
      {
        id: "1-2-1",
        parentInChildKey1: { id: "1", value: "value 1" },
        parentInChildKey1RowSpan: 0,
        parentInChildKey2: { id: "1-2", value: "value 1-2" },
        parentInChildKey2RowSpan: 2,
        value: "value 1-2-1",
      },
      {
        id: "1-2-2",
        parentInChildKey1: { id: "1", value: "value 1" },
        parentInChildKey1RowSpan: 0,
        parentInChildKey2: { id: "1-2", value: "value 1-2" },
        parentInChildKey2RowSpan: 0,
        value: "value 1-2-2",
      },
      {
        id: "2-1-1",
        parentInChildKey1: { id: "2", value: "value 2" },
        parentInChildKey1RowSpan: 4,
        parentInChildKey2: { id: "2-1", value: "value 2-1" },
        parentInChildKey2RowSpan: 2,
        value: "value 2-1-1",
      },
      {
        id: "2-1-2",
        parentInChildKey1: { id: "2", value: "value 2" },
        parentInChildKey1RowSpan: 0,
        parentInChildKey2: { id: "2-1", value: "value 2-1" },
        parentInChildKey2RowSpan: 0,
        value: "value 2-1-2",
      },
      {
        id: "2-2-1",
        parentInChildKey1: { id: "2", value: "value 2" },
        parentInChildKey1RowSpan: 0,
        parentInChildKey2: { id: "2-2", value: "value 2-2" },
        parentInChildKey2RowSpan: 2,
        value: "value 2-2-1",
      },
      {
        id: "2-2-2",
        parentInChildKey1: { id: "2", value: "value 2" },
        parentInChildKey1RowSpan: 0,
        parentInChildKey2: { id: "2-2", value: "value 2-2" },
        parentInChildKey2RowSpan: 0,
        value: "value 2-2-2",
      },
    ]);
  });
});
