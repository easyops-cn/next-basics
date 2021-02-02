import { uniqueId, zipObject, map } from "lodash";

export interface Attribute {
  name: string;
  id: string;
  instanceId: string;
  required: boolean;
  value: {
    type: string;
    regex?: string[] | string;
    struct_define?: {
      id: string;
      name: string;
      type: string;
    }[];
  };
}

export const attrTypeDefinition: Record<string, any> = {
  str: {
    text: "字符型",
    type: "str",
  },
  int: {
    text: "整型",
    type: "int",
  },
  date: {
    text: "日期",
    type: "date",
  },
  datetime: {
    text: "时间",
    type: "datetime",
  },
  enum: {
    text: "枚举型",
    type: "enum",
  },
  arr: {
    text: "数组",
    type: "arr",
  },
  struct: {
    text: "结构体（只可添加一行信息）",
    type: "struct",
  },
  structs: {
    text: "结构体数组（可添加多行信息）",
    type: "structs",
  },
  ip: {
    text: "IP",
    type: "ip",
  },
  bool: {
    text: "布尔型",
    type: "bool",
  },
  float: {
    text: "浮点型",
    type: "float",
  },
  json: {
    text: "JSON",
    type: "json",
  },
};

export const attrTypeBrickConfOfForms = (
  attr: Attribute
): Record<string, any> => {
  const attrType = attr.value.type;
  switch (attrType) {
    case "str":
      return [
        {
          id: uniqueId(`${attr.instanceId}-str`),
          brickConf: [
            {
              brick: "forms.general-input",
              properties: {
                name: attr.id,
                label: attr.name,
                required: attr.required,
                ...(attr.value.regex ? { pattern: attr.value.regex } : {}),
              },
              mountPoint: "items",
            },
          ],
        },
      ];
    case "int":
      return [
        {
          id: uniqueId(`${attr.instanceId}-int`),
          brickConf: [
            {
              brick: "forms.general-input-number",
              properties: {
                name: attr.id,
                label: attr.name,
                required: attr.required,
              },
              mountPoint: "items",
            },
          ],
        },
      ];
    case "date":
      return [
        {
          id: uniqueId(`${attr.instanceId}-date`),
          brickConf: [
            {
              brick: "forms.general-date-picker",
              properties: {
                name: attr.id,
                label: attr.name,
                required: attr.required,
              },
              mountPoint: "items",
            },
          ],
        },
      ];
    case "datetime":
      return [
        {
          id: uniqueId(`${attr.instanceId}-datetime`),
          brickConf: [
            {
              brick: "forms.general-time-picker",
              properties: {
                name: attr.id,
                label: attr.name,
                required: attr.required,
              },
              mountPoint: "items",
            },
          ],
        },
      ];
    case "enum":
      return [
        {
          id: uniqueId(`${attr.instanceId}-enum`),
          brickConf: [
            {
              brick: "forms.general-radio",
              properties: {
                name: attr.id,
                label: attr.name,
                required: attr.required,
                options:
                  attr.value?.regex?.map((v) => ({ label: v, value: v })) ?? [],
              },
              mountPoint: "items",
            },
          ],
        },
        {
          id: uniqueId(`${attr.instanceId}-enum`),
          brickConf: [
            {
              brick: "forms.general-select",
              properties: {
                name: attr.id,
                label: attr.name,
                required: attr.required,
                options:
                  attr.value?.regex?.map((v) => ({ label: v, value: v })) ?? [],
                allowClear: !attr.required,
                inputBoxStyle: {
                  width: 200,
                },
              },
              mountPoint: "items",
            },
          ],
        },
      ];
    case "arr":
      return [
        {
          id: uniqueId(`${attr.instanceId}-arr`),
          brickConf: [
            {
              brick: "forms.general-select",
              properties: {
                name: attr.id,
                label: attr.name,
                required: attr.required,
                mode: "tags",
                tokenSeparators: [",", " "],
              },
              mountPoint: "items",
            },
          ],
        },
      ];
    case "struct":
      return [
        {
          id: uniqueId(`${attr.instanceId}-struct`),
          brickConf: [
            // Todo(Lynette): slots
            {
              brick: "forms.general-structs-form-item",
              properties: {
                name: attr.id,
                label: attr.name,
                required: attr.required,
                multiple: false,
                btnText: `添加 ${attr.name}`,
                fieldsMap: zipObject(
                  map(attr.value.struct_define, "id"),
                  map(attr.value.struct_define, "name")
                ),
              },
              mountPoint: "items",
            },
          ],
        },
      ];
    case "structs":
      return [
        {
          id: uniqueId(`${attr.instanceId}-structs`),
          brickConf: [
            // Todo(Lynette): slots
            {
              brick: "forms.general-structs-form-item",
              properties: {
                name: attr.id,
                label: attr.name,
                required: attr.required,
                multiple: true,
                btnText: `添加 ${attr.name}`,
                fieldsMap: zipObject(
                  map(attr.value.struct_define, "id"),
                  map(attr.value.struct_define, "name")
                ),
              },
              mountPoint: "items",
            },
          ],
        },
      ];
    case "ip":
      return [
        {
          id: uniqueId(`${attr.instanceId}-ip`),
          brickConf: [
            {
              brick: "forms.general-input",
              properties: {
                name: attr.id,
                label: attr.name,
                required: attr.required,
              },
              mountPoint: "items",
            },
          ],
        },
      ];
    case "bool":
      return [
        {
          id: uniqueId(`${attr.instanceId}-bool`),
          brickConf: [
            {
              brick: "forms.general-radio",
              properties: {
                name: attr.id,
                label: attr.name,
                required: attr.required,
                options: [
                  {
                    label: "True",
                    value: true,
                  },
                  {
                    label: "False",
                    value: false,
                  },
                ],
              },
              mountPoint: "items",
            },
          ],
        },
        {
          id: uniqueId(`${attr.instanceId}-bool`),
          brickConf: [
            {
              brick: "forms.general-switch",
              properties: {
                name: attr.id,
                label: attr.name,
                required: attr.required,
              },
              mountPoint: "items",
            },
          ],
        },
      ];
    case "float":
      return [
        {
          id: uniqueId(`${attr.instanceId}-float`),
          brickConf: [
            {
              brick: "forms.general-input",
              properties: {
                name: attr.id,
                label: attr.name,
                required: attr.required,
              },
              mountPoint: "items",
            },
          ],
        },
      ];
    case "json":
      return [
        {
          id: uniqueId(`${attr.instanceId}-json`),
          brickConf: [
            {
              brick: "code-bricks.code-editor",
              properties: {
                name: attr.id,
                label: attr.name,
                required: attr.required,
                mode: "json",
              },
              mountPoint: "items",
            },
          ],
        },
      ];
  }
};

export const attrTypeBrickConfOfDisplay = (
  attr: Attribute,
  type: "table" | "descriptions"
): Record<string, any> => {
  const attrType = attr.value.type;
  switch (attrType) {
    case "struct":
      return [
        {
          id: uniqueId(`${attr.instanceId}-structs`),
          brickConf: [
            {
              brick: "presentational-bricks.brick-display-structs",
              properties: {
                displayType: "stringify",
              },
              transform: {
                value:
                  type === "table"
                    ? "<% DATA.cellData %>"
                    : `<% DATA?.${attr.id} %>`,
              },
            },
          ],
        },
      ];
    case "structs":
      return [
        {
          id: uniqueId(`${attr.instanceId}-structs`),
          brickConf: [
            {
              brick: "presentational-bricks.brick-display-structs",
              properties: {
                displayType: "stringify",
              },
              transform: {
                value:
                  type === "table"
                    ? "<% DATA.cellData %>"
                    : `<% DATA?.${attr.id} %>`,
              },
            },
          ],
        },
      ];
    case "bool":
      return [
        {
          id: uniqueId(`${attr.instanceId}-bool`),
          brickConf: [
            {
              brick: "presentational-bricks.brick-value-mapping",
              properties: {
                mapping: {
                  true: {
                    text: "true",
                  },
                  false: {
                    text: "false",
                  },
                },
              },
              transform: {
                value:
                  type === "table"
                    ? "<% DATA.cellData %>"
                    : `<% DATA?.${attr.id} %>`,
              },
            },
          ],
        },
      ];
    case "json":
      return [
        {
          id: uniqueId(`${attr.instanceId}-json`),
          brickConf: [
            {
              brick: "presentational-bricks.brick-display-structs",
              properties: {
                displayType: "stringify",
              },
              transform: {
                value:
                  type === "table"
                    ? "<% DATA.cellData %>"
                    : `<% DATA?.${attr.id} %>`,
              },
            },
          ],
        },
      ];
    default:
      return [];
  }
};

export const generalOptionsOfDisplay = (
  attr: Attribute,
  type: "table" | "descriptions"
): Record<string, any>[] => [
  {
    id: uniqueId(`${attr.instanceId}-display`),
    brickConf: [
      {
        brick: "text",
      },
    ],
  },
  {
    id: uniqueId(`${attr.instanceId}-display`),
    brickConf: [
      {
        brick: "presentational-bricks.general-label",
        transform: {
          text:
            type === "table" ? "<% DATA.cellData %>" : `<% DATA?.${attr.id} %>`,
        },
      },
    ],
  },
  {
    id: uniqueId(`${attr.instanceId}-display`),
    brickConf: [
      {
        brick: "presentational-bricks.brick-link",
        transform: {
          label:
            type === "table" ? "<% DATA.cellData %>" : `<% DATA?.${attr.id} %>`,
        },
      },
    ],
  },
];
