import { cloneDeep } from "lodash";
import {
  traverseTreeData,
  flatTree,
  searchTree,
  searchAllParents,
  getRealCheckListKey,
  getTreeDataAllRootKeysSet,
  getRootKeys,
  arrayToTree,
  getTreeDataAllKey,
  createNewTreeData,
} from "./tool";
import { DataNode } from "rc-tree-select/lib/interface";
const treeData = [
  {
    key: "host.cpu_util.system",
    title: "cpu system",
    uselessKey1: "useless key 1",
    uselessKey2: "useless key 2",
  },
  {
    children: [
      {
        children: [
          {
            key: "host.cpu_util.iowait111",
            title: "io wait111",
          },
          {
            key: "host.cpu_util.iowait1111",
            title: "io wait1111",
          },
        ],
        key: "host.cpu_util.iowait1",
        title: "io wait1",
      },
      {
        children: [
          {
            key: "host.cpu_util.iowait1112",
            title: "io wait1112",
          },
          {
            key: "host.cpu_util.iowait11112",
            title: "io wait11112",
          },
        ],
        key: "host.cpu_util.iowait12",
        title: "io wait12",
      },
    ],
    key: "host.cpu_util.iowait",
    title: "io wait",
    uselessKey1: "useless key 1",
    uselessKey2: "useless key 2",
  },
];
const treeDataV2 = [
  {
    key: "host.cpu_util.system",
    parentId: null,
    title: "cpu system",
    uselessKey1: "useless key 1",
    uselessKey2: "useless key 2",
  },
  {
    children: [
      {
        children: [
          {
            key: "host.cpu_util.iowait111",
            title: "io wait111",
            parentId: "host.cpu_util.iowait1",
          },
          {
            key: "host.cpu_util.iowait1111",
            title: "io wait1111",
            parentId: "host.cpu_util.iowait1",
          },
        ],
        key: "host.cpu_util.iowait1",
        title: "io wait1",
        parentId: "host.cpu_util.iowait",
      },
      {
        children: [
          {
            key: "host.cpu_util.iowait1112",
            title: "io wait1112",
            parentId: "host.cpu_util.iowait12",
          },
          {
            key: "host.cpu_util.iowait11112",
            title: "io wait11112",
            parentId: "host.cpu_util.iowait12",
          },
        ],
        key: "host.cpu_util.iowait12",
        title: "io wait12",
        parentId: "host.cpu_util.iowait",
      },
    ],
    key: "host.cpu_util.iowait",
    title: "io wait",
    uselessKey1: "useless key 1",
    uselessKey2: "useless key 2",
    parentId: null,
  },
];

const set = new Set([
  "host.cpu_util.system",
  "host.cpu_util.iowait111",
  "host.cpu_util.iowait1111",
  "host.cpu_util.iowait1112",
  "host.cpu_util.iowait11112",
]);
const sonParMap: Map<DataNode["key"], DataNode["key"] | null> = new Map();
let flatArr: DataNode[] = [];
describe("tool", () => {
  it("test traverseTreeData", async () => {
    const _treeData = cloneDeep(treeData);
    traverseTreeData({
      treeData: _treeData,
      callback: (item, parentId) => {
        item.parentId = parentId;
        sonParMap.set(item.key, item.parentId);
      },
    });
    expect(_treeData).toEqual([
      {
        key: "host.cpu_util.system",
        parentId: null,
        title: "cpu system",
        uselessKey1: "useless key 1",
        uselessKey2: "useless key 2",
      },
      {
        children: [
          {
            children: [
              {
                key: "host.cpu_util.iowait111",
                title: "io wait111",
                parentId: "host.cpu_util.iowait1",
              },
              {
                key: "host.cpu_util.iowait1111",
                title: "io wait1111",
                parentId: "host.cpu_util.iowait1",
              },
            ],
            key: "host.cpu_util.iowait1",
            title: "io wait1",
            parentId: "host.cpu_util.iowait",
          },
          {
            children: [
              {
                key: "host.cpu_util.iowait1112",
                title: "io wait1112",
                parentId: "host.cpu_util.iowait12",
              },
              {
                key: "host.cpu_util.iowait11112",
                title: "io wait11112",
                parentId: "host.cpu_util.iowait12",
              },
            ],
            key: "host.cpu_util.iowait12",
            title: "io wait12",
            parentId: "host.cpu_util.iowait",
          },
        ],
        key: "host.cpu_util.iowait",
        title: "io wait",
        uselessKey1: "useless key 1",
        uselessKey2: "useless key 2",
        parentId: null,
      },
    ]);
  });
  it("test flatTree", async () => {
    const _treeData = cloneDeep(treeDataV2);
    flatArr = flatTree({ treeData: _treeData });
    expect(flatArr).toEqual([
      {
        key: "host.cpu_util.system",
        parentId: null,
        title: "cpu system",
        uselessKey1: "useless key 1",
        uselessKey2: "useless key 2",
      },
      {
        key: "host.cpu_util.iowait",
        parentId: null,
        title: "io wait",
        uselessKey1: "useless key 1",
        uselessKey2: "useless key 2",
      },
      {
        key: "host.cpu_util.iowait1",
        parentId: "host.cpu_util.iowait",
        title: "io wait1",
      },
      {
        key: "host.cpu_util.iowait111",
        parentId: "host.cpu_util.iowait1",
        title: "io wait111",
      },
      {
        key: "host.cpu_util.iowait1111",
        parentId: "host.cpu_util.iowait1",
        title: "io wait1111",
      },
      {
        key: "host.cpu_util.iowait12",
        parentId: "host.cpu_util.iowait",
        title: "io wait12",
      },
      {
        key: "host.cpu_util.iowait1112",
        parentId: "host.cpu_util.iowait12",
        title: "io wait1112",
      },
      {
        key: "host.cpu_util.iowait11112",
        parentId: "host.cpu_util.iowait12",
        title: "io wait11112",
      },
    ]);
  });
  it("test searchTree", async () => {
    const _treeData = cloneDeep(treeData);
    expect(searchTree("11112", _treeData)).toEqual([
      {
        children: [
          {
            children: [
              {
                key: "host.cpu_util.iowait11112",
                title: "io wait11112",
              },
            ],
            key: "host.cpu_util.iowait12",
            title: "io wait12",
          },
        ],
        key: "host.cpu_util.iowait",
        title: "io wait",
        uselessKey1: "useless key 1",
        uselessKey2: "useless key 2",
      },
    ]);
  });
  it("test searchAllParents", async () => {
    expect(
      searchAllParents(
        ["host.cpu_util.iowait11112", "host.cpu_util.system"],
        sonParMap
      )
    ).toEqual([
      "host.cpu_util.iowait11112",
      "host.cpu_util.iowait12",
      "host.cpu_util.iowait",
      "host.cpu_util.system",
    ]);
  });
  it("test getRealCheckListKey", async () => {
    const _treeData = cloneDeep(treeData);
    expect(
      getRealCheckListKey(_treeData, ["host.cpu_util.iowait11112"])
    ).toEqual(["host.cpu_util.iowait11112"]);
    expect(
      getRealCheckListKey(_treeData, [
        "host.cpu_util.iowait11112",
        "host.cpu_util.iowait1112",
      ])
    ).toEqual([
      "host.cpu_util.iowait11112",
      "host.cpu_util.iowait1112",
      "host.cpu_util.iowait12",
    ]);
  });
  it("test getRealCheckListKey", async () => {
    const _treeData = cloneDeep(treeData);
    expect(getTreeDataAllRootKeysSet(_treeData)).toEqual(set);
  });
  it("test getRootKeys", async () => {
    expect(
      getRootKeys(
        [
          "host.cpu_util.iowait11112",
          "host.cpu_util.iowait1112",
          "host.cpu_util.iowait12",
        ],
        set
      )
    ).toEqual(["host.cpu_util.iowait11112", "host.cpu_util.iowait1112"]);
  });
  it("test arrayToTree", async () => {
    expect(arrayToTree(cloneDeep(flatArr))).toEqual(treeDataV2);
  });
  it("test getTreeDataAllKey", async () => {
    expect(getTreeDataAllKey(treeData)).toEqual([
      "host.cpu_util.system",
      "host.cpu_util.iowait111",
      "host.cpu_util.iowait1111",
      "host.cpu_util.iowait1",
      "host.cpu_util.iowait1112",
      "host.cpu_util.iowait11112",
      "host.cpu_util.iowait12",
      "host.cpu_util.iowait",
    ]);
  });
  it("test getTreeDataAllKey", async () => {
    expect(
      createNewTreeData(["host.cpu_util.iowait11112"], sonParMap, flatArr)
    ).toEqual([
      {
        children: [
          {
            children: [
              {
                key: "host.cpu_util.iowait11112",
                parentId: "host.cpu_util.iowait12",
                title: "io wait11112",
              },
            ],
            key: "host.cpu_util.iowait12",
            parentId: "host.cpu_util.iowait",
            title: "io wait12",
          },
        ],
        key: "host.cpu_util.iowait",
        parentId: null,
        title: "io wait",
        uselessKey1: "useless key 1",
        uselessKey2: "useless key 2",
      },
    ]);
  });
});
