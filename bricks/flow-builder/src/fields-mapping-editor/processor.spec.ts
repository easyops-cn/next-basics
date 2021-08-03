import {
  processFieldValue,
  getFieldChildrenMap,
  serializeFieldValue,
} from "./processor";

describe("processor", () => {
  describe("getFieldChildrenMap", () => {
    it("should work", () => {
      const fieldList = [
        { name: "objectId", type: "string", description: "objectId", key: "0" },
        { name: "query", type: "map", description: "query", key: "1" },
        {
          name: "only_my_instance",
          type: "bool",
          description: "我的实例",
          key: "2",
        },
        {
          name: "metrics_filter",
          type: "object",
          key: "3",
          fields: [
            {
              name: "time_range",
              type: "object",
              key: "3-0",
              fields: [
                {
                  name: "start_time",
                  type: "int",
                  description: "start_time",
                  key: "3-0-0",
                },
                {
                  name: "end_time",
                  type: "int",
                  description: "end_time",
                  key: "3-0-1",
                },
              ],
              description: "时间范围",
            },
            {
              name: "tags_filter",
              type: "map",
              description: "tags_filter",
              key: "3-1",
            },
            {
              name: "limitations",
              type: "object",
              key: "3-2",
              fields: [
                { name: "metric", type: "string", key: "3-2-0" },
                {
                  name: "sort",
                  type: "object",
                  key: "3-2-1",
                  fields: [
                    { name: "key", type: "string", key: "3-2-1-0" },
                    { name: "order", type: "int", key: "3-2-1-1" },
                  ],
                },
              ],
            },
          ],
          description: "指标过滤",
        },
      ];

      expect(getFieldChildrenMap(fieldList)).toEqual({
        "3": [
          {
            description: "时间范围",
            fields: [
              {
                description: "start_time",
                key: "3-0-0",
                name: "start_time",
                type: "int",
              },
              {
                description: "end_time",
                key: "3-0-1",
                name: "end_time",
                type: "int",
              },
            ],
            key: "3-0",
            name: "time_range",
            type: "object",
          },
          {
            description: "tags_filter",
            key: "3-1",
            name: "tags_filter",
            type: "map",
          },
          {
            fields: [
              { key: "3-2-0", name: "metric", type: "string" },
              {
                fields: [
                  { key: "3-2-1-0", name: "key", type: "string" },
                  { key: "3-2-1-1", name: "order", type: "int" },
                ],
                key: "3-2-1",
                name: "sort",
                type: "object",
              },
            ],
            key: "3-2",
            name: "limitations",
            type: "object",
          },
        ],
        "3-0": [
          {
            description: "start_time",
            key: "3-0-0",
            name: "start_time",
            type: "int",
          },
          {
            description: "end_time",
            key: "3-0-1",
            name: "end_time",
            type: "int",
          },
        ],
        "3-2": [
          { key: "3-2-0", name: "metric", type: "string" },
          {
            fields: [
              { key: "3-2-1-0", name: "key", type: "string" },
              { key: "3-2-1-1", name: "order", type: "int" },
            ],
            key: "3-2-1",
            name: "sort",
            type: "object",
          },
        ],
        "3-2-1": [
          { key: "3-2-1-0", name: "key", type: "string" },
          { key: "3-2-1-1", name: "order", type: "int" },
        ],
      });
    });
  });

  describe("processFieldValue", () => {
    it("should work", () => {
      const fieldList = [
        { name: "objectId", type: "string", description: "objectId", key: "0" },
        { name: "query", type: "map", description: "query", key: "1" },
        {
          name: "only_my_instance",
          type: "bool",
          description: "我的实例",
          key: "2",
        },
        {
          name: "metrics_filter",
          type: "object",
          key: "3",
          fields: [
            {
              name: "time_range",
              type: "object",
              key: "3-0",
              fields: [
                {
                  name: "start_time",
                  type: "int",
                  description: "start_time",
                  key: "3-0-0",
                },
                {
                  name: "end_time",
                  type: "int",
                  description: "end_time",
                  key: "3-0-1",
                },
              ],
              description: "时间范围",
            },
            {
              name: "tags_filter",
              type: "map",
              description: "tags_filter",
              key: "3-1",
            },
            {
              name: "limitations",
              type: "object",
              key: "3-2",
              fields: [
                { name: "metric", type: "string", key: "3-2-0" },
                {
                  name: "sort",
                  type: "object",
                  key: "3-2-1",
                  fields: [
                    { name: "key", type: "string", key: "3-2-1-0" },
                    { name: "order", type: "int", key: "3-2-1-1" },
                  ],
                },
              ],
            },
          ],
          description: "指标过滤",
        },
      ];

      const fieldChildrenMap = {
        "3": [
          {
            description: "时间范围",
            fields: [
              {
                description: "start_time",
                key: "3-0-0",
                name: "start_time",
                type: "int",
              },
              {
                description: "end_time",
                key: "3-0-1",
                name: "end_time",
                type: "int",
              },
            ],
            key: "3-0",
            name: "time_range",
            type: "object",
          },
          {
            description: "tags_filter",
            key: "3-1",
            name: "tags_filter",
            type: "map",
          },
          {
            fields: [
              {
                key: "3-2-0",
                name: "metric",
                type: "string",
              },
              {
                fields: [
                  {
                    key: "3-2-1-0",
                    name: "key",
                    type: "string",
                  },
                  {
                    key: "3-2-1-1",
                    name: "order",
                    type: "int",
                  },
                ],
                key: "3-2-1",
                name: "sort",
                type: "object",
              },
            ],
            key: "3-2",
            name: "limitations",
            type: "object",
          },
        ],
        "3-0": [
          {
            description: "start_time",
            key: "3-0-0",
            name: "start_time",
            type: "int",
          },
          {
            description: "end_time",
            key: "3-0-1",
            name: "end_time",
            type: "int",
          },
        ],
        "3-2": [
          {
            key: "3-2-0",
            name: "metric",
            type: "string",
          },
          {
            fields: [
              {
                key: "3-2-1-0",
                name: "key",
                type: "string",
              },
              {
                key: "3-2-1-1",
                name: "order",
                type: "int",
              },
            ],
            key: "3-2-1",
            name: "sort",
            type: "object",
          },
        ],
        "3-2-1": [
          {
            key: "3-2-1-0",
            name: "key",
            type: "string",
          },
          {
            key: "3-2-1-1",
            name: "order",
            type: "int",
          },
        ],
      };

      expect(
        processFieldValue(
          {
            name: "time_range",
            key: "3-0",
            type: "object",
          },
          "",
          fieldList,
          fieldChildrenMap
        )
      ).toEqual({
        description: "时间范围",
        fields: [
          {
            description: "start_time",
            key: "3-0-0",
            name: "start_time",
            type: "int",
          },
          {
            description: "end_time",
            key: "3-0-1",
            name: "end_time",
            type: "int",
          },
        ],
        key: "3-0",
        name: "time_range",
        type: "object",
        value: "",
      });

      expect(
        processFieldValue(
          {
            name: "time_range",
            key: "3-0",
            type: "object",
          },
          "<% timeRange %>",
          fieldList,
          fieldChildrenMap
        )
      ).toEqual({
        description: "时间范围",
        key: "3-0",
        name: "time_range",
        type: "object",
        value: "<% timeRange %>",
      });

      expect(
        processFieldValue(
          { name: "objectId", type: "string", key: "0" },
          "APP",
          fieldList,
          fieldChildrenMap
        )
      ).toEqual({
        description: "objectId",
        key: "0",
        name: "objectId",
        type: "string",
        value: "APP",
      });
    });
  });

  describe("serializeFieldValue", () => {
    it.each([
      ["a", "a"],
      [true, "true"],
      [123, "123"],
      [undefined, ""],
      [{ a: 123 }, "a: 123\n"],
      [null, ""],
    ])("should return %s", (value, result) => {
      expect(serializeFieldValue(value)).toEqual(result);
    });
  });
});
