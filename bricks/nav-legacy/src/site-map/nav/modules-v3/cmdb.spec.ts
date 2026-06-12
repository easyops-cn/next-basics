import { template } from "lodash";
import { getCategoryMap, getGroupsByCategoryMap } from "./cmdb";
describe("functions should work", () => {
  const categoryList = [
    {
      name: "平台资源",
      child: ["RS", "数据库变更"],
      hasRoot: true,
    },
    {
      name: "应用资源",
      child: ["门户", "服务监测"],
      hasRoot: true,
    },
  ];
  const modelList = [
    {
      name: "modelA",
      objectId: "modelA",
      category: "平台资源",
    },
    {
      name: "modelB",
      objectId: "modelB",
      category: "平台资源.RS",
    },
    {
      objectId: "modelC",
      name: "modelC",
      category: "应用资源",
    },
    {
      objectId: "modelD",
      name: "modelD",
      category: "应用资源.门户",
    },
  ];
  const urlTemplates = {
    modelUrlTemplate: "next-cmdb-instance-management/next/#{objectId}/list",
    groupUrlTemplate:
      "next-cmdb-instance-management/next/brick-group/#{category}",
  };
  const categoryMap = getCategoryMap(categoryList);
  it("should work with getCategoryMap", () => {
    expect(categoryMap).toEqual({
      平台资源: {
        name: "平台资源",
        title: "平台资源",
        child: ["RS", "数据库变更"],
        hasRoot: true,
        objectList: [],
        subCategoryMap: {
          RS: {
            name: "RS",
            title: "RS",
            objectList: [],
            subCategoryMap: {},
          },
          数据库变更: {
            name: "数据库变更",
            title: "数据库变更",
            objectList: [],
            subCategoryMap: {},
          },
        },
      },
      应用资源: {
        name: "应用资源",
        title: "应用资源",
        child: ["门户", "服务监测"],
        hasRoot: true,
        objectList: [],
        subCategoryMap: {
          门户: {
            name: "门户",
            title: "门户",
            objectList: [],
            subCategoryMap: {},
          },
          服务监测: {
            name: "服务监测",
            title: "服务监测",
            objectList: [],
            subCategoryMap: {},
          },
        },
      },
    });
  });
  it("should work with getGroupsByCategoryMap", () => {
    expect(
      getGroupsByCategoryMap(modelList, categoryMap, urlTemplates)
    ).toEqual([
      {
        name: "平台资源",
        title: "平台资源",
        objectList: [
          {
            name: "modelA",
            objectId: "modelA",
            category: "平台资源",
            to: "next-cmdb-instance-management/next/modelA/list",
            isFavourite: undefined,
          },
        ],
        subCategory: [
          {
            name: "RS",
            title: "RS",
            isOpen: false,
            objectList: [
              {
                name: "modelB",
                objectId: "modelB",
                category: "平台资源.RS",
                to: "next-cmdb-instance-management/next/modelB/list",
                isFavourite: undefined,
              },
            ],
            subCategoryMap: {},
            subCategory: [],
          },
          {
            name: "数据库变更",
            title: "数据库变更",
            objectList: [],
            subCategoryMap: {},
            subCategory: [],
          },
        ],
      },
      {
        name: "应用资源",
        title: "应用资源",
        objectList: [
          {
            name: "modelC",
            objectId: "modelC",
            to: "next-cmdb-instance-management/next/modelC/list",
            category: "应用资源",
            isFavourite: undefined,
          },
        ],
        subCategory: [
          {
            isOpen: false,
            name: "门户",
            title: "门户",
            objectList: [
              {
                name: "modelD",
                objectId: "modelD",
                category: "应用资源.门户",
                to: "next-cmdb-instance-management/next/modelD/list",
                isFavourite: undefined,
              },
            ],
            subCategoryMap: {},
            subCategory: [],
          },
          {
            name: "服务监测",
            title: "服务监测",
            objectList: [],
            subCategoryMap: {},
            subCategory: [],
          },
        ],
      },
    ]);
  });

  it("should work with 3-level category (sub-sub-category)", () => {
    const modelListWith3Levels = [
      ...modelList,
      {
        name: "modelE",
        objectId: "modelE",
        category: "平台资源.RS.消息队列",
      },
      {
        name: "modelF",
        objectId: "modelF",
        category: "平台资源.RS.消息队列",
      },
      {
        name: "modelG",
        objectId: "modelG",
        category: "平台资源.RS.缓存",
      },
    ];
    const result = getGroupsByCategoryMap(
      modelListWith3Levels,
      categoryMap,
      urlTemplates,
      ["modelE"]
    );
    const rsSubCategory = result[0].subCategory[0];
    expect(rsSubCategory.name).toBe("RS");
    expect(rsSubCategory.subCategory).toEqual([
      {
        name: "消息队列",
        title: "消息队列",
        isOpen: false,
        objectList: [
          {
            name: "modelE",
            objectId: "modelE",
            category: "平台资源.RS.消息队列",
            to: "next-cmdb-instance-management/next/modelE/list",
            isFavourite: true,
          },
          {
            name: "modelF",
            objectId: "modelF",
            category: "平台资源.RS.消息队列",
            to: "next-cmdb-instance-management/next/modelF/list",
            isFavourite: false,
          },
        ],
      },
      {
        name: "缓存",
        title: "缓存",
        isOpen: false,
        objectList: [
          {
            name: "modelG",
            objectId: "modelG",
            category: "平台资源.RS.缓存",
            to: "next-cmdb-instance-management/next/modelG/list",
            isFavourite: false,
          },
        ],
      },
    ]);
  });
});
