import React from "react";
import { shallow, mount } from "enzyme";
import { BrickTable } from "./BrickTable";
import { CustomColumn } from "./index";
import { Table } from "antd";

jest.mock("@next-core/brick-kit", () => {
  return {
    __esModule: true,
    BrickAsComponent(): React.ReactElement {
      return <div>BrickAsComponent</div>;
    },
  };
});

describe("BrickTable", () => {
  const props: any = {
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
        title: "Operate",
        dataIndex: "operate",
        key: "operate",
        component: {
          brick: "basic-bricks.general-button",
          fields: {
            item: "dataSource",
          },
          properties: {
            buttonName: "操作",
          },
          events: {
            "general.button.click": {
              action: "console.log",
            },
          },
        },
      },
    ],
    dataSource: [
      {
        key: "1",
        name: "John Brown",
        age: 32,
        address: "New York No. 1 Lake Park",
        tags: ["nice", "good"],
      },
      {
        key: "2",
        name: "Jim Green",
        age: 42,
        address: "London No. 1 Lake Park",
        tags: ["loser", "bad"],
      },
      {
        key: "3",
        name: "Joe Black",
        age: 32,
        address: "Sidney No. 1 Lake Park",
        tags: ["teacher", "lucky", "lay"],
      },
    ],
    showCard: true,
  };
  it("should work", () => {
    const wrapper = mount(
      <BrickTable
        {...props}
        columns={[
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
        ]}
        onChange={jest.fn}
        zebraPattern={true}
      />
    );
    expect(wrapper.find("BodyRow").length).toBe(3);
  });

  it("should throw error when error", () => {
    expect(() => {
      shallow(
        <BrickTable {...props} error={new Error("123")} onChange={jest.fn} />
      );
    }).toThrowError();
  });

  it("should render custom component", () => {
    const columns = [
      {
        title: "状态",
        dataIndex: "status",
        cellStatus: {
          mapping: [
            {
              value: "success",
              color: "var(--theme-green-color)",
            },
            {
              value: "failed",
              color: "var(--theme-red-color)",
            },
            {
              value: "warning",
              color: "var(--theme-orange-color)",
            },
          ],
        },
        titleUseBrick: {
          brick: "presentational-bricks.brick-link",
          transform: {
            label: "<% DATA.title %>",
          },
        },
        useBrick: {
          brick: "presentational-bricks.brick-value-mapping",
          transform: {
            value: "@{cellData}",
          },
          properties: {
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
      },
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
        useBrick: {
          brick: "brick-tag",
          properties: {
            configProps: {
              color: "#108ee9",
            },
          },
        },
      },
    ];

    const configProps = {
      sortBy: true,
      pagination: {},
    };

    const dataSource = [
      {
        key: "1",
        name: "John Brown",
        age: 32,
        address: "New York No. 1 Lake Park",
        tags: ["nice", "good"],
        status: "success",
      },
      {
        key: "2",
        name: "Jim Green",
        age: 42,
        address: "London No. 1 Lake Park",
        tags: ["loser", "bad"],
        status: "failed",
      },
      {
        key: "3",
        name: "Joe Black",
        age: 32,
        address: "Sidney No. 1 Lake Park",
        tags: ["teacher", "lucky", "lay"],
        status: "warning",
      },
    ];

    const spyOnConsoleWarn = jest
      .spyOn(console, "warn")
      .mockImplementation(() => null);

    const wrapper = mount(
      <BrickTable
        {...props}
        columns={columns}
        configProps={configProps}
        dataSource={dataSource}
        onChange={jest.fn}
      />
    );

    expect(spyOnConsoleWarn).toHaveBeenCalled();

    expect(wrapper.find("BrickAsComponent").length).toBeGreaterThan(0);
  });

  it("useBrick should work", () => {
    const columns: CustomColumn[] = [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        valueSuffix: " sir/miss",
        headerBrick: {
          useBrick: {
            brick: "presentational-bricks.general-tooltip",
            properties: {
              content: "tooltip",
            },
          },
        },
      },
      {
        title: "Address",
        dataIndex: "address",
        key: "address",
        useBrick: {
          brick: "brick-tag",
          transformFrom: "cellData",
          transform: "title",
          properties: {
            color: "#108ee9",
          },
        },
      },
    ];

    const wrapper = mount(
      <BrickTable
        {...props}
        columns={columns}
        deleteEnabled={true}
        showCard={false}
        onChange={jest.fn}
      />
    );
    expect(wrapper.find("BrickAsComponent").at(0).prop("data")).toEqual({
      title: "Name",
    });
    expect(wrapper.find("BrickAsComponent").at(1).prop("data")).toEqual({
      cellData: props.dataSource[0].address,
      columnIndex: 0,
      rowData: props.dataSource[0],
    });
  });

  it("expandedRowBrick should work", () => {
    const columns: CustomColumn[] = [
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
    ];

    const expandedRowBrick = {
      useBrick: [
        {
          brick: "presentational-bricks.brick-table",
          transformFrom: "rowData",
          transform: {
            dataSource: {
              list: "@{rules}",
            },
          },
          properties: {
            style: {
              background: "#ffffff",
            },
            showCard: false,
            configProps: {
              pagination: false,
              bordered: true,
            },
            columns: [
              {
                title: "路径",
                dataIndex: "path",
                width: "40%",
              },
              {
                title: "服务",
                dataIndex: "service",
                width: "40%",
              },
              {
                title: "端口",
                dataIndex: "port",
                width: "20%",
              },
            ],
          },
        },
      ],
    };

    const onExpand = jest.fn();
    const onExpandedRowsChange = jest.fn();
    const dataSource = [
      {
        key: "1",
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
        key: "2",
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
    ];

    const wrapper = mount(
      <BrickTable
        columns={columns}
        expandedRowBrick={expandedRowBrick}
        showCard={false}
        onChange={jest.fn}
        onExpand={onExpand}
        onExpandedRowsChange={onExpandedRowsChange}
        dataSource={dataSource}
      />
    );
    expect(wrapper.find("BrickAsComponent").length).toBe(0);
    wrapper.setProps({
      expandedRowKeys: ["1"],
    });
    wrapper.update();
    expect(wrapper.find("BrickAsComponent").length).toBe(1);
    wrapper.find(Table).invoke("onExpand")(true, dataSource[1]);
    expect(onExpand).toHaveBeenCalled();
    wrapper.find(Table).invoke("onExpandedRowsChange")(["2"]);
    expect(onExpandedRowsChange).toHaveBeenCalled();
  });

  it("tableDraggable should work", () => {
    const columns: CustomColumn[] = [
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
    ];
    const onDrag = jest.fn();
    const dataSource = [
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
    ];
    const wrapper = mount(
      <BrickTable
        rowKey="id"
        columns={columns}
        showCard={false}
        onChange={jest.fn}
        tableDraggable={true}
        onDrag={onDrag}
        dataSource={dataSource}
        ellipsisInfo={true}
      />
    );
    expect(wrapper.find("DndProvider").length).toBe(1);
    expect(wrapper.find(".draggableRow").length).toBe(3);
    expect(wrapper.find(Table).prop("columns")[0].className).toBe(
      "ellipsisInfoCell"
    );
  });
});
