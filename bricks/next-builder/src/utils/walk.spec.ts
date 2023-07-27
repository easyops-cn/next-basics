import walk from "./walk";

describe("walk", () => {
  const mockData = {
    a: "a",
    b: {
      c: "c",
      d: 1,
      e: [
        "e",
        {
          f: "f",
        },
      ],
      g: null,
      h: undefined,
    },
    i: [1, 2],
  };
  it("should work", () => {
    const list = [];

    walk(mockData, (k, v) => {
      list.push([k, v]);
    });

    expect(list).toEqual([
      ["a", "a"],
      ["b", { c: "c", d: 1, e: ["e", { f: "f" }], g: null, h: undefined }],
      ["c", "c"],
      ["d", 1],
      ["e", ["e", { f: "f" }]],
      ["f", "f"],
      ["g", null],
      ["h", undefined],
      ["i", [1, 2]],
    ]);
  });

  it("should update value", () => {
    const result = walk(mockData, (k, v) => {
      if (typeof v === "string") {
        return [k, `String Change`];
      }
      if (k === "d") {
        return [k, "Number Change"];
      }
      if (v === undefined) {
        return [k, "Undefined to value"];
      }
      if (Array.isArray(v) && v.every((item) => typeof item === "number")) {
        return [k, v.map((item) => `Array Change: ${item}`)];
      }
    });

    expect(mockData).toEqual({
      a: "a",
      b: {
        c: "c",
        d: 1,
        e: [
          "e",
          {
            f: "f",
          },
        ],
        g: null,
        h: undefined,
      },
      i: [1, 2],
    });
    expect(result).toEqual({
      a: "String Change",
      b: {
        c: "String Change",
        d: "Number Change",
        e: ["e", { f: "String Change" }],
        g: null,
        h: "Undefined to value",
      },
      i: [`Array Change: 1`, `Array Change: 2`],
    });
  });
});
