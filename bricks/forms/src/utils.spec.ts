import {
  encrypt,
  decrypt,
  FileUtils,
  FileSizeUnit,
  treeEnumFormat,
} from "./utils";

describe("encrypt and decrypt in base64", () => {
  const cases: [string, string][] = [
    [null, ""],
    ["", ""],
    ["A", "A"],
    ["http://x.y.z", "http://x.y.z"],
    ["A中国人", "A中国人"],
  ];

  it.each(cases)("decrypt(encrypt(%j)) should be %j", (txt, expected) => {
    const en = encrypt(txt);
    expect(decrypt(en)).toBe(expected);
  });
});

describe("FileUtils", () => {
  describe("sizeCompare test", () => {
    describe("single file", () => {
      it("size larger than limit", () => {
        const isLarge = FileUtils.sizeCompare(
          {
            size: 1024 * 1024,
          },
          0.1
        );
        expect(isLarge).toBeTruthy();
      });
      it("size smaller than limit", () => {
        const isSmall = FileUtils.sizeCompare(
          {
            size: 1024 * 1024,
          },
          1
        );
        expect(isSmall).toBeTruthy();
      });
      it("with unit argument", () => {
        const isLarge = FileUtils.sizeCompare(
          {
            size: 1024 * 1024 * 10,
          },
          1,
          FileSizeUnit.KB
        );
        expect(isLarge).toBeTruthy();
      });
    });
    describe("array file", () => {
      it("size larger than limit", () => {
        const isLarge = FileUtils.sizeCompare(
          [
            {
              size: 1024 * 1024,
            },
            {
              size: 1024 * 1024,
            },
          ],
          0.1
        );
        expect(isLarge).toBeTruthy();
      });
      it("size smaller than limit", () => {
        const isSmall = FileUtils.sizeCompare(
          [
            {
              size: 1024 * 1024,
            },
            {
              size: 1024 * 1024,
            },
          ],
          0.3
        );
        expect(isSmall).toBeTruthy();
      });
      it("with unit argument", () => {
        const isLarge = FileUtils.sizeCompare(
          [
            {
              size: 1024 * 1024 * 1024,
            },
            {
              size: 1024 * 1024 * 1024,
            },
          ],
          1024,
          FileSizeUnit.MB
        );
        expect(isLarge).toBeTruthy();
      });
    });
  });
});

describe("treeEnumFormat", () => {
  const value = ["A1/B1/C1", "A1/B1", "A1/B1/C2", "A1"];
  it("size larger than limit", () => {
    const result = treeEnumFormat(value);
    expect(result).toEqual([
      {
        children: [
          {
            children: [
              {
                children: null,
                id: "A1/B1/C1",
                isLeaf: true,
                parentId: "A1/B1",
                title: "C1",
                value: "A1/B1/C1",
              },
              {
                children: null,
                id: "A1/B1/C2",
                isLeaf: true,
                parentId: "A1/B1",
                title: "C2",
                value: "A1/B1/C2",
              },
            ],
            id: "A1/B1",
            isLeaf: false,
            parentId: "A1",
            title: "B1",
            value: "A1/B1",
          },
        ],
        id: "A1",
        isLeaf: false,
        parentId: "",
        title: "A1",
        value: "A1",
      },
    ]);
  });
});
