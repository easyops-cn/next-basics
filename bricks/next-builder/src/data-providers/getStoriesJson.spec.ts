const mockGetInstance = jest.fn();
jest.mock("./utils/StoriesCache", () => {
  return {
    StoriesCache: {
      getInstance: mockGetInstance,
    },
  };
});
jest.spyOn(window.customElements, "define").mockImplementation(() => void 0);

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { getStoriesJSON } = require("./getStoriesJson");

describe("getStroriesJSON", () => {
  it("should work without args", async () => {
    mockGetInstance.mockReturnValue({
      storyList: [],
      install: async function () {
        this.storyList.push({ id: 1 });
      },
      getStoryList: function () {
        return this.storyList;
      },
    });
    expect(await getStoriesJSON()).toEqual([{ id: 1 }]);
  });

  it("should work without args and had cache", async () => {
    mockGetInstance.mockReturnValue({
      storyList: [{ init: true }],
      install: function () {
        this.storyList.push({ id: 1 });
      },
      getStoryList: function () {
        return this.storyList;
      },
    });
    expect(await getStoriesJSON()).toEqual([{ init: true }]);
  });

  it("should work with args", async () => {
    mockGetInstance.mockReturnValue({
      storyList: [],
      install: function () {
        this.storyList.push({ id: 1 });
      },
      getStoryList: function () {
        return this.storyList;
      },
    });
    expect(
      await getStoriesJSON({
        list: [],
        fields: ["install"],
      })
    ).toEqual([{ id: 1 }]);
  });

  it("getInstallList should work", async () => {
    mockGetInstance.mockReturnValue({
      storyList: [{ id: "init" }],
      install: function (args) {
        if (args.list) {
          args.list.forEach((item) => {
            this.storyList.push({ id: item });
          });
        }
      },
      getStoryList: function () {
        return this.storyList;
      },
    });
    expect(
      await getStoriesJSON({
        list: [],
        fields: ["install"],
        dataSource: [
          {
            brick: "a",
            children: [
              {
                brick: "b",
                children: [
                  {
                    brick: "c",
                  },
                ],
              },
              {
                brick: "d",
              },
            ],
          },
        ],
      })
    ).toEqual([
      { id: "init" },
      { id: "c" },
      { id: "b" },
      { id: "d" },
      { id: "a" },
    ]);
  });
});
