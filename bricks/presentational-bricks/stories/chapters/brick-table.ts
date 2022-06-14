import { Story } from "@next-core/brick-types";

export const BrickTableStory: Story = {
  storyId: "presentational-bricks.brick-table",
  category: "general-tables",
  type: "brick",
  author: "lynette",
  text: {
    en: "table",
    zh: "表格",
  },
  description: {
    en: "",
    zh: "当需要对数据进行排序、搜索、分页、自定义操作等复杂行为时",
  },
  icon: {
    lib: "fa",
    icon: "table",
  },
  conf: [
    {
      description: {
        title: "基础用法",
        message: "注意对表格数据进行筛选时，需将页码恢复为第一页",
      },
      brick: "presentational-bricks.brick-table",
      properties: {
        dataset: { testid: "basic-demo" },
        rowKey: "id",
        shouldUpdateUrlParams: false,
        rowDisabledConfig: {
          field: "name",
          value: "John Brown",
          operator: "$eq",
        },
        configProps: {
          rowSelection: true,
        },
        hiddenColumns: ["name"],
        columns: [
          {
            title: "Name",
            dataIndex: "name",
            key: "name",
          },
          {
            title: "Age",
            dataIndex: "age",
            key: "age",
          },
          {
            dataIndex: "address",
            key: "address",
            headerBrick: {
              useBrick: {
                brick: "presentational-bricks.general-tooltip",
                properties: {
                  icon: {
                    lib: "fa",
                    icon: "info-circle",
                  },
                  content: "这是一个 tooltips",
                  text: "Address",
                },
              },
            },
          },
          {
            title: "Tags",
            key: "tags",
            dataIndex: "tags",
            useBrick: {
              brick: "presentational-bricks.brick-tag",
              properties: {
                showCard: false,
                tagList: "<% DATA.cellData %>",
                configProps: {
                  color: "var(--color-brand)",
                },
              },
            },
          },
          {
            title: "操作",
            key: "operate",
            dataIndex: "operate",
            useBrick: {
              brick: "presentational-bricks.brick-link",
              properties: {
                dataSource: "<% DATA.rowData %>",
                notToJumpWhenEmpty: true,
                icon: {
                  lib: "fa",
                  icon: "tools",
                  prefix: "fas",
                },
              },
              events: {
                "link.click": {
                  action: "console.log",
                },
              },
            },
          },
        ],
        dataSource: {
          list: [
            {
              id: "1",
              name: "John Brown",
              age: 32,
              address: "New York No. 1 Lake Park",
              tags: ["nice", "good"],
            },
            {
              id: "2",
              name: "Jim Green",
              age: 42,
              address: "London No. 1 Lake Park",
              tags: ["loser", "bad"],
            },
            {
              id: "3",
              name: "Joe Black",
              age: 32,
              address: "Sidney No. 1 Lake Park",
              tags: ["teacher", "lucky", "lay"],
            },
            {
              id: "4",
              name: "Joe Black",
              age: 34,
              address: "Sidney No. 1 Lake Park",
              tags: ["teacher", "lucky", "lay"],
            },
            {
              id: "5",
              name: "Joe Black",
              age: 35,
              address: "Sidney No. 1 Lake Park",
              tags: ["teacher", "lucky", "lay"],
            },
            {
              id: "6",
              name: "Joe Black",
              age: 36,
              address: "Sidney No. 1 Lake Park",
              tags: ["teacher", "lucky", "lay"],
            },
            {
              id: "7",
              name: "Joe Black",
              age: 37,
              address: "Sidney No. 1 Lake Park",
              tags: ["teacher", "lucky", "lay"],
            },
            {
              id: "8",
              name: "Joe Black",
              age: 38,
              address: "Sidney No. 1 Lake Park",
              tags: ["teacher", "lucky", "lay"],
            },
            {
              id: "9",
              name: "Joe Black",
              age: 39,
              address: "Sidney No. 1 Lake Park",
              tags: ["teacher", "lucky", "lay"],
            },
            {
              id: "10",
              name: "Joe Black",
              age: 40,
              address: "Sidney No. 1 Lake Park",
              tags: ["teacher", "lucky", "lay"],
            },
            {
              id: "11",
              name: "Joe Black",
              age: 41,
              address: "Sidney No. 1 Lake Park",
              tags: ["teacher", "lucky", "lay"],
            },
            {
              id: "12",
              name: "Joe Black",
              age: 42,
              address: "Sidney No. 1 Lake Park",
              tags: ["teacher", "lucky", "lay"],
            },
          ],
          page: 1,
          pageSize: 10,
          total: 12,
        },
      },
      events: {
        "select.update": {
          action: "console.log",
        },
        "select.update.args": {
          action: "console.log",
        },
        "filter.update": {
          action: "console.log",
        },
        "page.update": {
          action: "console.log",
        },
      },
    },
    {
      description: {
        title: "展开和排序",
      },
      brick: "presentational-bricks.brick-table",
      properties: {
        dataset: { testid: "expandable-and-sortable-demo" },
        shouldUpdateUrlParams: false,
        frontSearch: true,
        rowKey: "id",
        expandedRowBrick: {
          useBrick: {
            brick: "presentational-bricks.brick-table",
            properties: {
              dataSource: {
                list: "<% DATA.rowData.containerList %>",
              },
              style: {
                background: "#f5f5f5",
              },
              showCard: false,
              configProps: {
                pagination: false,
                bordered: false,
              },
              columns: [
                {
                  title: "容器名称",
                  dataIndex: "name",
                },
                {
                  title: "重启次数",
                  dataIndex: "number",
                },
                {
                  title: "操作",
                  key: "operate",
                  dataIndex: "operate",
                  useBrick: {
                    brick: "presentational-bricks.brick-link",
                    properties: {
                      dataSource: "<% DATA.rowData %>",
                      notToJumpWhenEmpty: true,
                      icon: {
                        lib: "fa",
                        icon: "tools",
                        prefix: "fas",
                      },
                    },
                    events: {
                      "link.click": {
                        action: "console.log",
                      },
                    },
                  },
                },
              ],
            },
          },
        },
        columns: [
          {
            title: "Pod 名称",
            dataIndex: "name",
            sorter: true,
          },
          {
            title: "状态",
            dataIndex: "status",
          },
          {
            title: "实例 IP",
            dataIndex: "ip",
          },
        ],
        dataSource: {
          list: [
            {
              id: "1",
              name: "RG-deployment-1",
              ip: "192.168.100.1",
              status: "运行中",
              containerList: [
                {
                  name: "container-1",
                  number: 1,
                },
                {
                  name: "container-2",
                  number: 2,
                },
              ],
            },
            {
              id: "3",
              name: "RG-deployment-3",
              ip: "192.168.100.3",
              status: "推出成功",
              containerList: [
                {
                  name: "container-5",
                  number: 5,
                },
              ],
            },
            {
              id: "2",
              name: "RG-deployment-2",
              ip: "192.168.100.2",
              status: "准备中",
              containerList: [
                {
                  name: "container-3",
                  number: 3,
                },
                {
                  name: "container-4",
                  number: 4,
                },
              ],
            },
          ],
          page: 1,
          pageSize: 10,
          total: 3,
        },
      },
      events: {
        "sort.update": [
          {
            target: "#expandable-and-sortable-demo",
            properties: {
              expandedRowKeys: [],
            },
          },
        ],
        "row.expand": {
          action: "console.log",
        },
        "expand.rows.change": {
          action: "console.log",
        },
      },
    },
    {
      description: {
        title: "自定义展开图标",
      },
      brick: "presentational-bricks.brick-table",
      properties: {
        dataset: { testid: "customized-expand-icon-demo" },
        rowKey: "id",
        expandIcon: {
          collapsedIcon: {
            lib: "fa",
            icon: "angle-double-up",
            prefix: "fas",
          },
          expandedIcon: {
            lib: "fa",
            icon: "angle-double-down",
            prefix: "fas",
          },
        },
        expandedRowBrick: {
          useBrick: [
            {
              brick: "presentational-bricks.card-item",
              properties: {
                style: {
                  width: "100%",
                },
                bordered: false,
                hoverable: false,
                configProps: {
                  style: {
                    background: "#fafafa",
                  },
                },
                descMaxLine: 2,
                cardTitle: "next.easyops.cn",
                descriptionList: ["协议：HTTP", "监听端口：80"],
                cardLayoutType: "icon-align-left",
                iconColor: "cyan",
                hideDescCircle: true,
                icon: {
                  lib: "fa",
                  icon: "check-circle",
                },
              },
            },
          ],
        },
        expandIconAsCell: false,
        expandIconColumnIndex: 3,
        columns: [
          {
            title: "名称",
            dataIndex: "name",
          },
          {
            title: "所属资源池",
            dataIndex: "resourcePool",
          },
          {
            title: "路由地址",
            dataIndex: "ip",
          },
          {
            title: "转发规则",
            dataIndex: "rulesDesc",
          },
        ],
        dataSource: {
          list: [
            {
              id: "1",
              name: "构建任务1",
              resourcePool: "pool1",
              ip: "105.33.44.123",
              rulesDesc: "点击查看两条转发规则",
              rules: [
                {
                  path: "/cmdb",
                  service: "cmdb-service",
                  port: 80,
                },
                {
                  path: "/tool",
                  service: "tool",
                  port: 80,
                },
              ],
            },
            {
              id: "2",
              name: "构建任务2",
              resourcePool: "pool2",
              ip: "105.33.44.122",
              rulesDesc: "点击查看一条转发规则",
              rules: [
                {
                  path: "/topboard",
                  service: "topboard",
                  port: 80,
                },
              ],
            },
          ],
          page: 1,
          pageSize: 10,
          total: 2,
        },
      },
      events: {
        "row.expand": {
          action: "console.log",
        },
        "expand.rows.change": {
          action: "console.log",
        },
      },
    },
    {
      description: {
        title: "单元格状态和筛选展示",
      },
      brick: "presentational-bricks.brick-table",
      properties: {
        dataset: { testid: "cell-status-and-filter-demo" },
        rowKey: "id",
        shouldUpdateUrlParams: false,
        frontSearch: true,
        filters: {
          status: ["failed", "warning"],
        },
        columns: [
          {
            title: "分支",
            dataIndex: "branch",
            useBrick: {
              brick: "presentational-bricks.brick-link",
              properties: {
                label: "<% DATA.cellData %>",
              },
            },
            cellStatus: {
              dataIndex: "status",
              mapping: [
                {
                  value: "success",
                  leftBorderColor: "green",
                },
                {
                  value: "failed",
                  leftBorderColor: "red",
                },
                {
                  value: "warning",
                  leftBorderColor: "orange",
                },
              ],
            },
          },
          {
            title: "编号",
            dataIndex: "id",
          },
          {
            title: "流水线",
            dataIndex: "pipeline",
          },
          {
            title: "状态",
            dataIndex: "status",
            useBrick: {
              brick: "presentational-bricks.brick-value-mapping",
              properties: {
                value: "<% DATA.cellData %>",
                mapping: {
                  success: {
                    color: "green",
                  },
                  failed: {
                    color: "red",
                  },
                  warning: {
                    color: "orange",
                  },
                },
              },
            },
            filters: [
              {
                text: "成功",
                value: "success",
              },
              {
                text: "失败",
                value: "failed",
              },
              {
                text: "警告",
                value: "warning",
              },
            ],
          },
        ],
        dataSource: {
          list: [
            {
              id: "#7220",
              pipeline: "contract-center / build_giraffe_sdk",
              branch: "develop",
              status: "success",
            },
            {
              id: "#7221",
              pipeline: "container / demo",
              branch: "master",
              status: "failed",
            },
            {
              id: "#7222",
              pipeline: "container / table",
              branch: "feature",
              status: "warning",
            },
          ],
          page: 1,
          pageSize: 10,
          total: 3,
        },
      },
      events: {
        "select.update": {
          action: "console.log",
        },
        "select.update.args": {
          action: "console.log",
        },
        "filter.update": {
          action: "console.log",
        },
        "page.update": {
          action: "console.log",
        },
      },
    },
    {
      description: {
        title: "树形数据展示",
      },
      brick: "presentational-bricks.brick-table",
      properties: {
        dataset: { testid: "tree-data-demo" },
        rowKey: "id",
        configProps: {
          rowSelection: true,
        },
        columns: [
          {
            title: "Name",
            dataIndex: "name",
            key: "name",
          },
          {
            title: "Age",
            dataIndex: "age",
            key: "age",
          },
          {
            title: "Address",
            dataIndex: "address",
            key: "address",
          },
          {
            title: "Tags",
            key: "tags",
            dataIndex: "tags",
            useBrick: {
              brick: "presentational-bricks.brick-tag",
              properties: {
                tagList: "<% DATA.cellData %>",
                showCard: false,
                configProps: {
                  color: "var(--color-brand)",
                },
              },
            },
          },
          {
            title: "操作",
            key: "operate",
            dataIndex: "operate",
            useBrick: {
              brick: "presentational-bricks.brick-link",
              properties: {
                dataSource: "<% DATA.rowData %>",
                notToJumpWhenEmpty: true,
                icon: {
                  lib: "fa",
                  icon: "tools",
                  prefix: "fas",
                },
              },
              events: {
                "link.click": {
                  action: "console.log",
                },
              },
            },
          },
        ],
        defaultExpandAllRows: true,
        dataSource: {
          list: [
            {
              id: "1",
              name: "John Brown sr.",
              age: 60,
              address: "New York No. 1 Lake Park",
              tags: ["nice", "good"],
              children: [
                {
                  id: "11",
                  name: "John Brown",
                  age: 50,
                  address: "New York No. 2 Lake Park",
                  tags: ["nice", "good"],
                  children: [
                    {
                      id: "111",
                      name: "John Brown jr.",
                      age: 25,
                      address: "New York No. 3 Lake Park",
                      tags: ["nice", "good"],
                    },
                  ],
                },
                {
                  id: "22",
                  name: "Jimmy Brown",
                  age: 45,
                  address: "New York No. 3 Lake Park",
                  tags: ["nice", "good"],
                },
              ],
            },
            {
              id: "2",
              name: "Jim Green sr.",
              age: 72,
              address: "London No. 1 Lake Park",
              tags: ["loser", "bad"],
              children: [
                {
                  id: "dd",
                  name: "Jim Green",
                  age: 42,
                  address: "London No. 1 Lake Park",
                  tags: ["nice", "good"],
                },
              ],
            },
            {
              id: "3",
              name: "Joe Black",
              age: 32,
              address: "Sidney No. 1 Lake Park",
              tags: ["teacher", "lucky", "lay"],
            },
          ],
          page: 1,
          pageSize: 10,
          total: 7,
        },
      },
      events: {
        "select.update": {
          action: "console.log",
        },
      },
    },
    {
      description: {
        title: "拖动排序",
      },
      brick: "presentational-bricks.brick-table",
      properties: {
        dataset: { testid: "draggable-sort-demo" },
        rowKey: "id",
        tableDraggable: true,
        showCard: false,
        configProps: {
          rowSelection: true,
          pagination: false,
        },
        columns: [
          {
            title: "包名称",
            dataIndex: "packageName",
          },
          {
            title: "部署路径",
            dataIndex: "installPath",
          },
          {
            title: "版本",
            dataIndex: "version",
          },
        ],
        dataSource: {
          list: [
            {
              id: "1",
              packageName: "container",
              installPath: "/usr/local/easyops/container",
              version: "1.10.0",
            },
            {
              id: "2",
              packageName: "webshell",
              installPath: "/usr/local/easyops/webshell",
              version: "1.0.0",
            },
            {
              id: "3",
              packageName: "nginx",
              installPath: "/usr/local/easyops/nginx",
              version: "3.6.0",
            },
          ],
        },
      },
      events: {
        "select.update": {
          action: "console.log",
        },
        "row.drag": {
          action: "console.log",
        },
      },
    },
    {
      description: {
        title: "前端搜索",
        message: "前端搜索需要搭配构件的 `filterSourceData` 方法使用",
      },
      brick: "basic-bricks.general-card",
      properties: {
        dataset: { testid: "front-end-search-demo" },
      },
      slots: {
        content: {
          type: "bricks",
          bricks: [
            {
              brick: "container-brick.search-bar",
              slots: {
                start: {
                  type: "bricks",
                  bricks: [
                    {
                      brick: "presentational-bricks.brick-general-search",
                      events: {
                        "query.change.v2": [
                          {
                            action: "console.log",
                          },
                          {
                            target: "#front-search-table",
                            method: "filterSourceData",
                          },
                        ],
                      },
                      properties: {
                        debounceTime: 200,
                        placeholder: "输入关键字搜索",
                        shouldTrimQuery: true,
                        shouldUpdateUrlParams: false,
                      },
                    },
                  ],
                },
              },
            },
            {
              brick: "presentational-bricks.brick-table",
              properties: {
                id: "front-search-table",
                dataset: { testid: "front-search-table" },
                rowKey: "id",
                frontSearch: true,
                shouldUpdateUrlParams: false,
                showCard: false,
                configProps: {
                  rowSelection: true,
                  pagination: false,
                },
                frontSearchFilterKeys: ["packageName"],
                columns: [
                  {
                    title: "包名称",
                    dataIndex: "packageName",
                  },
                  {
                    title: "部署路径",
                    dataIndex: "installPath",
                  },
                  {
                    title: "版本",
                    dataIndex: "version",
                  },
                ],
                dataSource: {
                  list: [
                    {
                      id: "1",
                      packageName: "container",
                      installPath: "/usr/local/easyops/container",
                      version: "1.10.0",
                    },
                    {
                      id: "2",
                      packageName: "webshell",
                      installPath: "/usr/local/easyops/webshell",
                      version: "1.0.0",
                    },
                    {
                      id: "3",
                      packageName: "nginx",
                      installPath: "/usr/local/easyops/nginx",
                      version: "3.6.0",
                    },
                  ],
                },
              },
              events: {
                "select.update": {
                  action: "console.log",
                },
              },
            },
          ],
        },
      },
    },
    {
      description: {
        title: "内容滚动",
        message: "当宽度过小时，内容滑动显示",
      },
      brick: "presentational-bricks.brick-table",
      properties: {
        dataset: { testid: "scroll-demo" },
        rowKey: "id",
        columns: [
          {
            title: "包名称",
            dataIndex: "packageName",
          },
          {
            title: "部署路径",
            dataIndex: "installPath",
          },
          {
            title: "版本",
            dataIndex: "version",
          },
          {
            title: "描述",
            dataIndex: "description",
          },
        ],
        scrollConfigs: {
          x: true,
        },
        dataSource: {
          list: [
            {
              id: "1",
              packageName: "container",
              installPath: "/usr/local/easyops/container",
              version: "1.10.0",
              description:
                "some lonnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnng content",
            },
            {
              id: "2",
              packageName: "webshell",
              installPath: "/usr/local/easyops/webshell",
              version: "1.0.0",
              description: "some content",
            },
            {
              id: "3",
              packageName: "nginx",
              installPath: "/usr/local/easyops/nginx",
              version: "3.6.0",
              description: "some content",
            },
          ],
        },
      },
      events: {
        "select.update": {
          action: "console.log",
        },
      },
    },
    {
      description: {
        title: "设置单元格内容垂直对齐方式",
      },
      brick: "presentational-bricks.brick-table",
      properties: {
        columns: [
          {
            dataIndex: "time",
            title: "事件发生时间",
          },
          {
            dataIndex: "resource",
            title: "告警资源",
          },
          {
            dataIndex: "information",
            title: "事件信息",
          },
          {
            dataIndex: "count",
            title: "告警次数",
          },
        ],
        dataSource: {
          list: [
            {
              containerList: [
                {
                  content:
                    "18:32发生通知告警\n告警资源：manny的测试应用\n告警信息：detect_code: 0等于0\n告警首次发生时间：2021-01-04 14:26\n事件详情：http://YOUR-EASYOPS-HOST/next/resource-events/6006b522d221f4dec3525fa2/detail\n策略详情：http://YOUR-EASYOPS-HOST/next/resource-events/alert-config/alert-rule/5b3f99ecbac4c?objectId=APP\n18:32发生通知告警\n告警资源：manny的测试应用\n告警信息：detect_code: 0等于0\n告警首次发生时间：2021-01-04 14:26\n事件详情：http://YOUR-EASYOPS-HOST/next/resource-events/6006b522d221f4dec3525fa2/detail\n策略详情：http://YOUR-EASYOPS-HOST/next/resource-events/alert-config/alert-rule/5b3f99ecbac4c?objectId=APP\n18:32发生通知告警\n告警资源：manny的测试应用\n告警信息：detect_code: 0等于0\n告警首次发生时间：2021-01-04 14:26\n事件详情：http://YOUR-EASYOPS-HOST/next/resource-events/6006b522d221f4dec3525fa2/detail\n策略详情：http://YOUR-EASYOPS-HOST/next/resource-events/alert-config/alert-rule/5b3f99ecbac4c?objectId=APP\n18:32发生通知告警\n告警资源：manny的测试应用\n告警信息：detect_code: 0等于0\n告警首次发生时间：2021-01-04 14:26\n事件详情：http://YOUR-EASYOPS-HOST/next/resource-events/6006b522d221f4dec3525fa2/detail\n策略详情：http://YOUR-EASYOPS-HOST/next/resource-events/alert-config/alert-rule/5b3f99ecbac4c?objectId=APP",
                  alertDims:
                    "_job: 5b430a4f7af06\ndetectAgentId: 5b342abdf0801\ndetectAgentName: manny专用拨测机\ninstanceId: 59c3de7e651b9\nobjectId: APP\norg: 8888\nstepName: login",
                  alertReceivers: "easyops\nmannyzheng\nmannytest",
                },
              ],
              id: "1",
              time: "2020/12/01",
              resource: "应用 -wimihe_test1959118717",
              information: "detect_code: 0等于0",
              count: 14497,
            },
            {
              containerList: [
                {
                  content:
                    "18:32发生通知告警\n告警资源：manny的测试应用\n告警信息：detect_code: 0等于0\n告警首次发生时间：2021-01-04 14:26\n事件详情：http://YOUR-EASYOPS-HOST/next/resource-events/6006b522d221f4dec3525fa2/detail\n策略详情：http://YOUR-EASYOPS-HOST/next/resource-events/alert-config/alert-rule/5b3f99ecbac4c?objectId=APP\n18:32发生通知告警\n告警资源：manny的测试应用\n告警信息：detect_code: 0等于0\n告警首次发生时间：2021-01-04 14:26\n事件详情：http://YOUR-EASYOPS-HOST/next/resource-events/6006b522d221f4dec3525fa2/detail\n策略详情：http://YOUR-EASYOPS-HOST/next/resource-events/alert-config/alert-rule/5b3f99ecbac4c?objectId=APP\n18:32发生通知告警\n告警资源：manny的测试应用\n告警信息：detect_code: 0等于0\n告警首次发生时间：2021-01-04 14:26\n事件详情：http://YOUR-EASYOPS-HOST/next/resource-events/6006b522d221f4dec3525fa2/detail\n策略详情：http://YOUR-EASYOPS-HOST/next/resource-events/alert-config/alert-rule/5b3f99ecbac4c?objectId=APP",
                  alertDims:
                    "_job: 5b430a4f7af06\ndetectAgentId: 5b342abdf0801\ndetectAgentName: manny专用拨测机\ninstanceId: 59c3de7e651b9\nobjectId: APP\norg: 8888\nstepName: login",
                  alertReceivers: "easyops\nmannyzheng\nmannytest",
                },
              ],
              id: "3",
              time: "2020/12/01",
              resource: "应用 -manny的测试应用",
              information: "detect_code: 0等于0",
              count: 14497,
            },
            {
              containerList: [
                {
                  content:
                    "18:32发生通知告警\n告警资源：manny的测试应用\n告警信息：detect_code: 0等于0\n告警首次发生时间：2021-01-04 14:26\n事件详情：http://YOUR-EASYOPS-HOST/next/resource-events/6006b522d221f4dec3525fa2/detail\n策略详情：http://YOUR-EASYOPS-HOST/next/resource-events/alert-config/alert-rule/5b3f99ecbac4c?objectId=APP\n18:32发生通知告警\n告警资源：manny的测试应用\n告警信息：detect_code: 0等于0\n告警首次发生时间：2021-01-04 14:26\n事件详情：http://YOUR-EASYOPS-HOST/next/resource-events/6006b522d221f4dec3525fa2/detail\n策略详情：http://YOUR-EASYOPS-HOST/next/resource-events/alert-config/alert-rule/5b3f99ecbac4c?objectId=APP\n18:32发生通知告警\n告警资源：manny的测试应用\n告警信息：detect_code: 0等于0\n告警首次发生时间：2021-01-04 14:26\n事件详情：http://YOUR-EASYOPS-HOST/next/resource-events/6006b522d221f4dec3525fa2/detail\n策略详情：http://YOUR-EASYOPS-HOST/next/resource-events/alert-config/alert-rule/5b3f99ecbac4c?objectId=APP",
                  alertDims:
                    "_job: 5b430a4f7af06\ndetectAgentId: 5b342abdf0801\ndetectAgentName: manny专用拨测机\ninstanceId: 59c3de7e651b9\nobjectId: APP\norg: 8888\nstepName: login",
                  alertReceivers: "easyops\nmannyzheng\nmannytest",
                },
              ],
              id: "2",
              time: "2020/12/01",
              resource: "应用 -app1780131078",
              information: "detect_code: 0等于0",
              count: 14497,
            },
          ],
          page: 1,
          pageSize: 10,
          total: 3,
        },
        expandedRowBrick: {
          useBrick: {
            brick: "presentational-bricks.brick-table",
            properties: {
              columns: [
                {
                  dataIndex: "content",
                  title: "通知内容",
                  useBrick: {
                    brick: "presentational-bricks.markdown-display",
                    properties: {
                      value: '<% DATA.cellData || "暂无数据"  %>',
                    },
                  },
                },
                {
                  dataIndex: "alertDims",
                  width: 400,
                  verticalAlign: "top",
                  title: "告警维度",
                  useBrick: {
                    brick: "presentational-bricks.markdown-display",
                    properties: {
                      value: '<% DATA.cellData || "暂无数据"  %>',
                    },
                  },
                },
                {
                  dataIndex: "alertReceivers",
                  width: 150,
                  verticalAlign: "top",
                  title: "通知人",
                  useBrick: {
                    brick: "presentational-bricks.markdown-display",
                    properties: {
                      value: '<% DATA.cellData || "暂无数据"  %>',
                    },
                  },
                },
              ],
              configProps: {
                bordered: false,
                pagination: false,
              },
              showCard: false,
              style: {
                background: "#f5f5f5",
              },
            },
            transform: {
              dataSource: {
                list: "<% DATA.rowData.containerList %>",
              },
            },
          },
        },
        expandIconAsCell: false,
        expandIconColumnIndex: 2,
        rowKey: "id",
      },
    },
    {
      description: {
        title: "跨页勾选",
        message:
          "实现跨页勾选需要在url更新时不触发页面重新渲染，并在页码和页数变化的事件中手动触发数据源更新。",
      },
      brick: "div",
      slots: {
        "": {
          bricks: [
            {
              brick: "presentational-bricks.brick-table",
              properties: {
                id: "t1",
                dataset: { testid: "basic-page-demo" },
                showSelectInfo: true,
                page: "${query.page=1|number}",
                pageSize: "${query.page_size=10|number}",
                shouldUpdateUrlParams: true,
                shouldRenderWhenUrlParamsUpdate: false,
                configProps: {
                  rowSelection: true,
                },
                rowKey: "name",
                columns: [
                  {
                    title: "规则名称",
                    dataIndex: "name",
                    key: "name",
                  },
                ],
              },
              events: {
                "select.update": [
                  {
                    action: "console.log",
                    args: ["${EVENT.detail}"],
                  },
                ],
                "filter.update": [
                  {
                    target: "#p1",
                    method: "setArgsAndExecute",
                    args: [
                      {
                        "0.page_size": "<% EVENT.detail.pageSize %>",
                        "0.page": 1,
                      },
                    ],
                  },
                ],
                "page.update": [
                  {
                    target: "#p1",
                    method: "setArgsAndExecute",
                    args: [
                      {
                        "0.page": "<% EVENT.detail.page %>",
                      },
                    ],
                  },
                ],
              },
              lifeCycle: {
                onPageLoad: [
                  {
                    target: "#p1",
                    method: "execute",
                  },
                ],
              },
            },
            {
              brick: "providers-of-permission.inheritance-api-search-rule",
              properties: {
                id: "p1",
                args: [
                  {
                    page: "${QUERY.page=1|number}",
                    page_size: "${QUERY.page_size=10|number}",
                    sort: [
                      {
                        key: "ctime",
                        order: -1,
                      },
                    ],
                    fields: ["*"],
                    query: {
                      name: {
                        $like: "%${query.q}%",
                      },
                    },
                  },
                ],
              },
              events: {
                "response.success": [
                  {
                    target: "#t1",
                    properties: {
                      dataSource: "<% EVENT.detail %>",
                    },
                  },
                ],
              },
            },
          ],
          type: "bricks",
        },
      },
    },
    {
      description: {
        title: "行列合并",
      },
      brick: "presentational-bricks.brick-table",
      properties: {
        dataset: { testid: "row-col-span-demo" },
        rowKey: "id",
        childrenColumnName: "packages",
        defaultExpandAllRows: true,
        columns: [
          {
            dataIndex: "ip",
            title: "IP",
            useBrick: {
              brick: "span",
              properties: {
                textContent: "<% DATA.cellData || DATA.rowData.clusterName %>",
              },
            },
            colSpanKey: "ipColSpan",
            rowSpanKey: "ipRowSpan",
          },
          {
            dataIndex: "packageName",
            title: "包名称",
            colSpanKey: "nameColSpan",
          },
          {
            dataIndex: "installPath",
            title: "部署路径",
            colSpanKey: "pathColSpan",
          },
          {
            dataIndex: "version",
            title: "版本",
            colSpanKey: "versionColSpan",
          },
        ],
        dataSource: {
          list: [
            {
              clusterName: "Lonnnnnnnnnnnnnnnnnnnnnnnnnng Cluster Name",
              id: "1",
              ipColSpan: 4,
              nameColSpan: 0,
              pathColSpan: 0,
              versionColSpan: 0,
              packages: [
                {
                  ip: "192.168.100.162",
                  id: "1-1",
                  installPath: "/usr/local/easyops/container",
                  packageName: "container",
                  version: "1.10.0",
                },
                {
                  ip: "192.168.100.163",
                  id: "1-2",
                  installPath: "/usr/local/easyops/webshell",
                  packageName: "webshell",
                  version: "1.0.0",
                  ipRowSpan: 2,
                },
                {
                  ip: "192.168.100.163",
                  id: "1-3",
                  installPath: "/usr/local/easyops/nginx",
                  packageName: "nginx",
                  version: "3.6.0",
                  ipRowSpan: 0,
                },
              ],
            },
          ],
        },
      },
    },
    {
      description: {
        title:
          "使用 flattenTreeDataListAndCalcRowSpan custom processor 平铺树形结构列表，并计算行合并",
        message:
          "以上示例使用了 `PROCESSORS` 加工函数，具体可查看 [Custom Processors](/next-docs/docs/brick-next/custom-processors)",
      },
      brick: "presentational-bricks.brick-table",
      properties: {
        dataset: { testid: "processor-row-span-demo" },
        rowKey: "id",
        columns: [
          {
            dataIndex: "parentInChildKey1.value",
            title: "depth 0 value",
            rowSpanKey: "parentInChildKey1RowSpan",
          },
          {
            dataIndex: "parentInChildKey2.value",
            title: "depth 1 value",
            rowSpanKey: "parentInChildKey2RowSpan",
          },
          {
            dataIndex: "value",
            title: "value",
          },
        ],
        dataSource: {
          list: `<% PROCESSORS.presentationalBricks.flattenTreeDataListAndCalcRowSpan(
            [
              {
                id: "1",
                value: "value 1",
                childrenKey1: [
                  {
                    id: "1-1",
                    value: "value 1-1",
                    childrenKey2: [
                      { id: "1-1-1", value: "value 1-1-1" },
                      { id: "1-1-2", value: "value 1-1-2" },
                    ],
                  },
                  {
                    id: "1-2",
                    value: "value 1-2",
                    childrenKey2: [
                      { id: "1-2-1", value: "value 1-2-1" },
                      { id: "1-2-2", value: "value 1-2-2" },
                    ],
                  },
                ],
              },
              {
                id: "2",
                value: "value 2",
                childrenKey1: [
                  {
                    id: "2-1",
                    value: "value 2-1",
                    childrenKey2: [
                      { id: "2-1-1", value: "value 2-1-1" },
                      { id: "2-1-2", value: "value 2-1-2" },
                    ],
                  },
                  {
                    id: "2-2",
                    value: "value 2-2",
                    childrenKey2: [
                      { id: "2-2-1", value: "value 2-2-1" },
                      { id: "2-2-2", value: "value 2-2-2" },
                    ],
                  },
                ],
              },
            ],
            {
              flattenConfigs: [
                { childrenKey: "childrenKey1", parentInChildKey: "parentInChildKey1" },
                { childrenKey: "childrenKey2", parentInChildKey: "parentInChildKey2" },
                { childrenKey: "childrenKey3", parentInChildKey: "parentInChildKey3" },
              ],
              omitChildrenInParent: true,
            }
          ) %>`,
        },
      },
    },
  ],
};
