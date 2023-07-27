import DependCache from "./dependCache";

jest.mock("@next-sdk/next-builder-sdk", () => ({
  PackageAloneApi_listDependencies: jest.fn(() => ({
    list: [
      {
        name: "a-bricks-NB",
      },
      {
        name: "b-bricks-NB",
      },
    ],
  })),
}));

describe("dependCahce", () => {
  it("dependCahche should work", async () => {
    const cache = DependCache.getInstance("mockProject");

    await cache.update();

    expect(cache.getList()).toEqual(["a-bricks-NB", "b-bricks-NB"]);

    const cache2 = DependCache.getInstance("mockProject2");

    expect(cache2.getList()).toEqual([]);
  });
});
