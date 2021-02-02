import {
  getCellStyle,
  getKeysOfData,
  getRowsOfData,
  stripEmptyExpandableChildrenByName,
} from "./brickTableHelper";
import { cloneDeep } from "lodash";

describe("getCellStyle processor", () => {
  it("should match correct color affect current columns", () => {
    const record = {
      status: "success",
    };
    const cellStatus = {
      mapping: [
        {
          value: "success",
          leftBorderColor: "green",
        },
        {
          value: "failed",
          leftBorderColor: "red",
        },
        {
          value: "warning",
          leftBorderColor: "yellow",
        },
      ],
    };

    const result = getCellStyle(cellStatus, record, "success");
    expect(result).toEqual({
      borderLeft: "4px solid var(--theme-green-color)",
    });
  });

  it("should match correct color affect current other columns", () => {
    const record = {
      status: "success",
      id: "23d5b",
      name: "test",
    };
    const cellStatus = {
      dataIndex: "status",
      mapping: [
        {
          value: "success",
          leftBorderColor: "green",
        },
        {
          value: "failed",
          leftBorderColor: "red",
        },
        {
          value: "warning",
          leftBorderColor: "yellow",
        },
      ],
    };

    const result = getCellStyle(cellStatus, record);
    expect(result).toEqual({
      borderLeft: "4px solid var(--theme-green-color)",
    });
  });

  it("support path dataIndex", () => {
    const record = {
      pipeline: {
        status: "success",
      },
      id: "23d5b",
      name: "test",
    };
    const cellStatus = {
      dataIndex: "pipeline.status",
      mapping: [
        {
          value: "success",
          leftBorderColor: "green",
        },
      ],
    };

    const result = getCellStyle(cellStatus, record);
    expect(result).toEqual({
      borderLeft: "4px solid var(--theme-green-color)",
    });
  });

  it("should not match the color", () => {
    const record = {
      status: "unknown",
      id: "23d5b",
      name: "test",
    };

    const cellStatus = {
      dataIndex: "status",
      mapping: [
        {
          value: "success",
          leftBorderColor: "green",
        },
        {
          value: "failed",
          leftBorderColor: "red",
        },
        {
          value: "warning",
          leftBorderColor: "yellow",
        },
      ],
    };

    const result = getCellStyle(cellStatus, record);
    expect(result).toEqual({});
  });
});

describe("getKeysOfData", () => {
  it("should work without children", () => {
    const keys = [];
    const data = [
      {
        id: "1",
      },
      {
        id: "2",
      },
    ];
    getKeysOfData(data, "id", "children", keys);
    expect(keys).toEqual(["1", "2"]);
  });
  it("should work with children", () => {
    const keys = [];
    const data = [
      {
        id: "1",
        children: [
          {
            id: "11",
            children: [
              {
                id: "111",
              },
            ],
          },
        ],
      },
      {
        id: "2",
      },
    ];
    getKeysOfData(data, "id", "children", keys);
    expect(keys).toEqual(["1", "11", "111", "2"]);
  });
});

describe("getRowsOfData", () => {
  it("should work without children", () => {
    const keys = [];
    const data = [
      {
        id: "1",
      },
      {
        id: "2",
      },
    ];
    getRowsOfData(data, "children", keys);
    expect(keys).toEqual([
      {
        id: "1",
      },
      {
        id: "2",
      },
    ]);
  });
  it("should work with children", () => {
    const keys = [];
    const data = [
      {
        id: "1",
        children: [
          {
            id: "11",
            children: [
              {
                id: "111",
              },
            ],
          },
        ],
      },
      {
        id: "2",
      },
    ];
    getRowsOfData(data, "children", keys);
    expect(keys).toEqual([
      {
        id: "1",
        children: [
          {
            id: "11",
            children: [
              {
                id: "111",
              },
            ],
          },
        ],
      },
      {
        id: "11",
        children: [
          {
            id: "111",
          },
        ],
      },
      {
        id: "111",
      },
      {
        id: "2",
      },
    ]);
  });
});

describe("stripEmptyExpandableChildrenByName", () => {
  let list: any[];
  beforeEach(() => {
    list = [
      {
        children: [
          {
            children: [
              {
                children: [],
                title: "a-1-1-0",
                key: "a-1-1-0",
              },
            ],
            title: "a-1-1",
            key: "a-1-1",
          },
          {
            children: [],
            title: "a-1-2",
            key: "a-1-2",
          },
        ],
        title: "a-1",
        key: "a-1",
      },
      {
        children: [],
        title: "a-2",
        key: "a-2",
      },
    ];
  });
  it("should strip empty expandable children", () => {
    const result = stripEmptyExpandableChildrenByName("children", list);
    expect(result).toEqual([
      {
        children: [
          {
            children: [
              {
                title: "a-1-1-0",
                key: "a-1-1-0",
              },
            ],
            title: "a-1-1",
            key: "a-1-1",
          },
          {
            title: "a-1-2",
            key: "a-1-2",
          },
        ],
        title: "a-1",
        key: "a-1",
      },
      {
        title: "a-2",
        key: "a-2",
      },
    ]);
  });

  it("should return row data when children column name mismatched", () => {
    const data = cloneDeep(list);
    const result = stripEmptyExpandableChildrenByName("wrongName", data);
    expect(result).toEqual(list);
  });

  it("should empty array when input data is undefined", () => {
    const result = stripEmptyExpandableChildrenByName("wrongName", undefined);
    expect(result).toEqual([]);
  });
});
