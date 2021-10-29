const mockGetStoriesJSONRequset = jest.fn((args = {}) => {
  if (Array.isArray(args.storyIds) && args.storyIds.length > 0) {
    const list = args.storyIds.map((item: string) => ({
      conf: [
        {
          properties: "test-props",
        },
      ],
      ...(item === "brick-a"
        ? {
            storyId: "brick-a",
          }
        : {
            storyId: "brick-b",
          }),
    }));
    return {
      list: list,
    };
  } else {
    return {
      list: [
        {
          storyId: "brick-a",
          conf: null,
          text: "a",
          type: "brick",
        },
        {
          storyId: "brick-b",
          conf: null,
          text: "b",
          useWidget: ["brick-b-1", "brick-b-2"],
          type: "atom-brick",
        },
      ],
    };
  }
});

jest.mock("@next-sdk/next-builder-sdk", () => ({
  BuildApi_getStoriesJsonV2: mockGetStoriesJSONRequset,
}));
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { StoriesCache, installInfo } = require("./StoriesCache");

const instance = StoriesCache.getInstance();

describe("StoriesCache", () => {
  it("getInstance result should be equal", () => {
    const instance1 = StoriesCache.getInstance();
    expect(instance).toBe(instance1);
  });

  it("install and getStoryList should work", async () => {
    expect(mockGetStoriesJSONRequset).toBeCalledTimes(0);
    await instance.install({
      fields: ["storyId", "text"],
    });
    expect(mockGetStoriesJSONRequset).toBeCalledTimes(1);
    expect(instance.getStoryList()).toEqual([
      {
        storyId: "brick-a",
        conf: null,
        text: "a",
        type: "brick",
      },
      {
        storyId: "brick-b",
        conf: null,
        text: "b",
        useWidget: ["brick-b-1", "brick-b-2"],
        type: "brick",
      },
    ]);
    expect([...instance.cache.installed]).toEqual([]);
    await instance.install(
      {
        list: ["brick-a"],
        fields: ["storyId", "conf"],
      },
      true
    );
    expect(mockGetStoriesJSONRequset).toBeCalledTimes(2);
    expect(instance.getStoryList()).toEqual([
      {
        storyId: "brick-a",
        conf: [
          {
            properties: "test-props",
          },
        ],
        text: "a",
        type: "brick",
      },
      {
        storyId: "brick-b",
        conf: null,
        text: "b",
        useWidget: ["brick-b-1", "brick-b-2"],
        type: "brick",
      },
    ]);
    expect([...instance.cache.installed]).toEqual(["brick-a"]);

    // install brick-a again without request again
    await instance.install(
      {
        list: ["brick-a"],
        fields: ["storyId", "conf"],
      },
      true
    );
    expect(mockGetStoriesJSONRequset).toBeCalledTimes(2);

    await instance.install(
      {
        list: ["brick-a", "brick-b"],
        fields: ["storyId", "conf"],
      },
      true
    );
    expect(mockGetStoriesJSONRequset).toBeCalledTimes(3);
    expect(mockGetStoriesJSONRequset.mock.calls).toEqual([
      [{ fields: ["storyId", "text"], storyIds: [] }],
      [{ fields: ["storyId", "conf"], storyIds: ["brick-a"] }],
      [
        {
          fields: ["storyId", "conf"],
          storyIds: ["brick-b", "brick-b-1", "brick-b-2"],
        },
      ],
    ]);
    expect(instance.getStoryList()).toEqual([
      {
        storyId: "brick-a",
        conf: [
          {
            properties: "test-props",
          },
        ],
        text: "a",
        type: "brick",
      },
      {
        storyId: "brick-b",
        conf: [
          {
            properties: "test-props",
          },
        ],
        text: "b",
        type: "brick",
        useWidget: ["brick-b-1", "brick-b-2"],
      },
    ]);
    expect([...instance.cache.installed]).toEqual(["brick-a", "brick-b"]);

    // use cache
    await instance.install(
      {
        list: ["brick-a", "brick-b"],
        fields: ["storyId", "conf"],
      },
      true
    );
    expect(mockGetStoriesJSONRequset).toBeCalledTimes(3);

    // install base info and we don't request again
    await instance.install({
      list: [],
      fields: ["*"],
    });
    expect(mockGetStoriesJSONRequset).toBeCalledTimes(3);
  });

  it("hasInstalled should work", () => {
    expect(instance.hasInstalled("brick-a")).toBeTruthy();
    expect(instance.hasInstalled("brick-b")).toBeTruthy();
    expect(instance.hasInstalled("brick-c")).toBeFalsy();
  });

  it("init should work", () => {
    const initData: any = [
      {
        storyId: "brick-c",
        conf: null,
        text: "a",
      },
      {
        storyId: "brick-d",
        conf: null,
        text: "a",
      },
    ];
    instance.init(initData);
    const result = [
      {
        storyId: "brick-a",
        conf: [
          {
            properties: "test-props",
          },
        ],
        text: "a",
        type: "brick",
      },
      {
        storyId: "brick-b",
        conf: [
          {
            properties: "test-props",
          },
        ],
        text: "b",
        type: "brick",
        useWidget: ["brick-b-1", "brick-b-2"],
      },
    ].concat(initData);
    expect(instance.getStoryList()).toEqual(result);
    expect([...instance.cache.installed]).toEqual(["brick-a", "brick-b"]);
  });
});
