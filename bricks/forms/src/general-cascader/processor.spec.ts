import { getTargetOption } from "./processor";

describe("processor", () => {
  describe("getTargetOption", () => {
    it.each([
      [
        { label: "label", value: "value", children: "children" },
        [
          {
            name: "广西",
            value: "guangxi",
          },
          {
            name: "桂林",
            value: "guilin",
          },
          { name: "恭城", value: "gongcheng" },
        ],
        [
          {
            name: "广西",
            value: "guangxi",
            children: [
              {
                name: "桂林",
                value: "guilin",
                children: [{ name: "恭城", value: "gongcheng" }],
              },
            ],
          },
          {
            name: "广东",
            value: "guangdong",
            children: [
              {
                name: "深圳",
                value: "shenzhen",
                children: [
                  { name: "南山", value: "nanshan" },
                  { name: "福田", value: "futian" },
                ],
              },
              {
                name: "广州",
                value: "guangzhou",
                children: [
                  { name: "南沙", value: "nansha" },
                  { name: "天河", value: "tianhe" },
                ],
              },
            ],
          },
          {
            name: "湖南",
            value: "hunan",
            children: [
              {
                name: "长沙",
                value: "changsha",
                children: [{ name: "岳麓", value: "yuelu" }],
              },
            ],
          },
        ],
        {
          name: "恭城",
          value: "gongcheng",
        },
      ],
      [
        { label: "label", value: "value", children: "children" },
        [
          {
            name: "广东",
            value: "guangdong",
          },
          {
            name: "深圳",
            value: "shenzhen",
          },
        ],
        [
          {
            name: "广西",
            value: "guangxi",
            children: [
              {
                name: "桂林",
                value: "guilin",
                children: [{ name: "恭城", value: "gongcheng" }],
              },
            ],
          },
          {
            name: "广东",
            value: "guangdong",
            children: [
              {
                name: "深圳",
                value: "shenzhen",
                children: [
                  { name: "南山", value: "nanshan" },
                  { name: "福田", value: "futian" },
                ],
              },
              {
                name: "广州",
                value: "guangzhou",
                children: [
                  { name: "南沙", value: "nansha" },
                  { name: "天河", value: "tianhe" },
                ],
              },
            ],
          },
          {
            name: "湖南",
            value: "hunan",
            children: [
              {
                name: "长沙",
                value: "changsha",
                children: [{ name: "岳麓", value: "yuelu" }],
              },
            ],
          },
        ],
        {
          name: "深圳",
          value: "shenzhen",
          children: [
            { name: "南山", value: "nanshan" },
            { name: "福田", value: "futian" },
          ],
        },
      ],
      [
        { label: "label", value: "value", children: "children" },
        [
          {
            name: "江苏",
            value: "jiangsu",
          },
          {
            name: "南京",
            value: "nanjing",
          },
        ],
        [
          {
            name: "广西",
            value: "guangxi",
            children: [
              {
                name: "桂林",
                value: "guilin",
                children: [{ name: "恭城", value: "gongcheng" }],
              },
            ],
          },
          {
            name: "广东",
            value: "guangdong",
            children: [
              {
                name: "深圳",
                value: "shenzhen",
                children: [
                  { name: "南山", value: "nanshan" },
                  { name: "福田", value: "futian" },
                ],
              },
              {
                name: "广州",
                value: "guangzhou",
                children: [
                  { name: "南沙", value: "nansha" },
                  { name: "天河", value: "tianhe" },
                ],
              },
            ],
          },
          {
            name: "湖南",
            value: "hunan",
            children: [
              {
                name: "长沙",
                value: "changsha",
                children: [{ name: "岳麓", value: "yuelu" }],
              },
            ],
          },
        ],
        undefined,
      ],
    ])("%# should work", (fieldNames, selectedOptions, allOptions, result) => {
      expect(getTargetOption(fieldNames, selectedOptions, allOptions)).toEqual(
        result
      );
    });
  });
});
