import { FieldItem } from "../fields-mapping-editor/interfaces";
import { formatFeildsMap, processValue } from "./formatFeildsMap";

jest.mock("@next-core/brick-kit", () => ({
  getRuntime: () => ({
    registerCustomProcessor: jest.fn(),
  }),
}));

describe("formatFeildsMap", () => {
  it("should work", () => {
    const fieldList = [
      { name: "objectId", type: "string", description: "objectId" },
      { name: "query", type: "map", description: "query" },
      { name: "only_my_instance", type: "bool", description: "我的实例" },
      {
        name: "metrics_filter",
        type: "object",
        fields: [
          {
            name: "time_range",
            type: "object",
            fields: [
              { name: "start_time", type: "int", description: "start_time" },
              { name: "end_time", type: "int", description: "end_time" },
            ],
            description: "时间范围",
          },
          { name: "tags_filter", type: "map", description: "tags_filter" },
          {
            name: "limitations",
            type: "object",
            fields: [
              { name: "metric", type: "string" },
              {
                name: "sort",
                type: "object",
                fields: [
                  { name: "key", type: "string" },
                  { name: "order", type: "int" },
                ],
              },
            ],
          },
        ],
        description: "指标过滤",
      },
    ] as FieldItem[];

    const fieldMapValueList = [
      { name: "objectId", value: "HOST" },
      { name: "query", value: { field: { "*": true } } },
      { name: "only_my_instance", value: false },
      {
        name: "metrics_filter",
        fields: [
          {
            name: "time_range",
            fields: [
              { name: "start_time", value: 3231243232 },
              { name: "end_time", value: 3231283232 },
            ],
          },
          {
            name: "limitations",
            fields: [
              { name: "metric", value: "cpu.usage" },
              {
                name: "sort",
                fields: [
                  { name: "key", value: "cpu" },
                  { name: "order", value: 0 },
                ],
              },
            ],
          },
        ],
      },
    ];
    expect(formatFeildsMap(fieldList, fieldMapValueList)).toEqual([
      {
        description: "objectId",
        key: "0",
        name: "objectId",
        type: "string",
        value: "HOST",
      },
      {
        description: "query",
        key: "1",
        name: "query",
        type: "map",
        value: { field: { "*": true } },
      },
      {
        description: "我的实例",
        key: "2",
        name: "only_my_instance",
        type: "bool",
        value: false,
      },
      {
        fields: [
          {
            fields: [
              {
                description: "start_time",
                key: "3-0-0",
                name: "start_time",
                type: "int",
                value: 3231243232,
              },
              {
                description: "end_time",
                key: "3-0-1",
                name: "end_time",
                type: "int",
                value: 3231283232,
              },
            ],
            description: "时间范围",
            key: "3-0",
            name: "time_range",
            type: "object",
            value: undefined,
          },
          {
            description: "tags_filter",
            key: "3-1",
            name: "tags_filter",
            type: "map",
            value: undefined,
          },
          {
            fields: [
              {
                description: undefined,
                key: "3-2-0",
                name: "metric",
                type: "string",
                value: "cpu.usage",
              },
              {
                fields: [
                  {
                    description: undefined,
                    key: "3-2-1-0",
                    name: "key",
                    type: "string",
                    value: "cpu",
                  },
                  {
                    description: undefined,
                    key: "3-2-1-1",
                    name: "order",
                    type: "int",
                    value: 0,
                  },
                ],
                description: undefined,
                key: "3-2-1",
                name: "sort",
                type: "object",
                value: undefined,
              },
            ],
            description: undefined,
            key: "3-2",
            name: "limitations",
            type: "object",
            value: undefined,
          },
        ],
        description: "指标过滤",
        key: "3",
        name: "metrics_filter",
        type: "object",
        value: undefined,
      },
    ]);
  });
});

describe("processValue", () => {
  it("should work", () => {
    const fieldValueList = [
      { name: "name", value: "test" },
      { name: "label" },
      { name: "id", value: "bbca" },
      { name: "icon", value: { lib: "antd", icon: "api", theme: "fill" } },
      {
        name: "data",
        fields: [
          { name: "loading", value: false },
          {
            name: "tooltipConfig",
            fields: [
              { name: "arrowPointAtCenter", value: false },
              { name: "placement", value: "top" },
            ],
          },
        ],
      },
    ];

    expect(processValue(fieldValueList)).toEqual(
      new Map([
        ["name", { name: "name", value: "test" }],
        ["label", { name: "label" }],
        ["id", { name: "id", value: "bbca" }],
        [
          "icon",
          { name: "icon", value: { lib: "antd", icon: "api", theme: "fill" } },
        ],
        [
          "data",
          {
            name: "data",
            fields: [
              { name: "loading", value: false },
              {
                name: "tooltipConfig",
                fields: [
                  { name: "arrowPointAtCenter", value: false },
                  { name: "placement", value: "top" },
                ],
              },
            ],
          },
        ],
        ["data.loading", { name: "loading", value: false }],
        [
          "data.tooltipConfig",
          {
            name: "tooltipConfig",
            fields: [
              { name: "arrowPointAtCenter", value: false },
              { name: "placement", value: "top" },
            ],
          },
        ],
        [
          "data.tooltipConfig.arrowPointAtCenter",
          { name: "arrowPointAtCenter", value: false },
        ],
        ["data.tooltipConfig.placement", { name: "placement", value: "top" }],
      ])
    );
  });
});
