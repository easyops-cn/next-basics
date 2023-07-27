import { mergeVersion, compareVersion, DependencyItem } from "./mergeVersion";

describe("mergeVersion", () => {
  it.each<[DependencyItem[], DependencyItem[], DependencyItem[]]>([
    [
      [
        {
          name: "a",
          constraint: "^1.1.0",
          isLocalDeploy: true,
        },
      ],
      [],
      [
        {
          name: "a",
          constraint: "^1.1.0",
          isLocalDeploy: true,
        },
      ],
    ],
    [
      [
        {
          name: "a",
          constraint: "^1.1.0",
        },
      ],
      [
        {
          name: "b",
          constraint: "^1.1.0",
          isLocalDeploy: true,
        },
      ],
      [
        {
          name: "a",
          constraint: "^1.1.0",
        },
        {
          name: "b",
          constraint: "^1.1.0",
          isLocalDeploy: true,
        },
      ],
    ],
    [
      [
        {
          name: "a",
          constraint: "^1.2.0",
        },
      ],
      [
        {
          name: "a",
          constraint: "^1.3.0",
          isLocalDeploy: true,
        },
      ],
      [
        {
          name: "a",
          constraint: "^1.3.0",
          isLocalDeploy: true,
        },
      ],
    ],
    [
      [
        {
          name: "a",
          constraint: "^1.2.0",
        },
      ],
      [
        {
          name: "a",
          constraint: "^1.3.0",
        },
        {
          name: "b",
          constraint: "^1.3.0",
        },
      ],
      [
        {
          name: "a",
          constraint: "^1.3.0",
        },
        {
          name: "b",
          constraint: "^1.3.0",
        },
      ],
    ],
    [
      [],
      [
        {
          name: "a",
          constraint: "^1.3.0",
        },
      ],
      [
        {
          name: "a",
          constraint: "^1.3.0",
        },
      ],
    ],
    [
      [
        {
          name: "a",
          constraint: "1.3.0",
        },
      ],
      [
        {
          name: "a",
          constraint: "^1.3.0",
        },
      ],
      [
        {
          name: "a",
          constraint: "1.3.0",
        },
        {
          name: "a",
          constraint: "^1.3.0",
        },
      ],
    ],
    [undefined, null, []],
  ])("test", (dependItem1, dependItem2, result) => {
    expect(mergeVersion(dependItem1, dependItem2)).toEqual(result);
  });
});

describe("compareVersion", () => {
  it.each<[string, string, string | boolean]>([
    ["^1.2.3", "^1.2.3", "^1.2.3"],
    ["^0.99.0", "^1.0.0", "^1.0.0"],
    ["^1.21.1", "^1.20.99", "^1.21.1"],
    ["^1.21.99", "^1.21.100", "^1.21.100"],
    ["1.2.3", "^1.2.3", false],
    ["^1.2.3", "1.2.4", false],
    ["~1.2.3", "~1.2.4", false],
    ["^1.0", "^1.0.1", "^1.0.1"],
    ["^1", "^1.1", "^1.1"],
    ["^1.1", "^1", "^1.1"],
    ["1", "0", false],
    ["^a.b.c", "^e.f.g", false],
  ])("test", (version1, version2, result) => {
    expect(compareVersion(version1, version2)).toBe(result);
  });
});
