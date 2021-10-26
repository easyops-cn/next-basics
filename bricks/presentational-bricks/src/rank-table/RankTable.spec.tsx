import React from "react";
import { mount, shallow } from "enzyme";
import { RankTable } from "./RankTable";
import { CustomColumn } from ".";

describe("RankTable", () => {
  const props: any = {
    columns: [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        verticalAlign: "top",
      },
      {
        title: "Age",
        dataIndex: "age",
        key: "age",
        verticalAlign: "bottom",
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
    const dataSource = [
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
      {
        key: "4",
        name: "Joe Black",
        age: 32,
        address: "Sidney No. 1 Lake Park",
        tags: ["teacher", "lucky", "lay"],
      },
      {
        key: "5",
        name: "Joe Black",
        age: 32,
        address: "Sidney No. 1 Lake Park",
        tags: ["teacher", "lucky", "lay"],
      },
    ];
    const wrapper = mount(
      <RankTable
        header={{
          title: "Top10",
          extra: "foo",
        }}
        columns={props.columns}
        dataSource={dataSource}
      />
    );
    expect(wrapper.find("span.medalGold").length).toBe(1);
    expect(wrapper.find("span.medalSilver").length).toBe(1);
    expect(wrapper.find("span.medalBronze").length).toBe(1);
    expect(wrapper.find("span.normalAwards").length).toBe(2);
    expect(wrapper.find("BodyRow").length).toBe(5);

    expect(wrapper.find("div.header")).toHaveLength(1);
    expect(wrapper.find("span.leftCell").text()).toBe("Top10");
    expect(wrapper.find("span.rightCell").text()).toBe("foo");
  });
  it("should render header", () => {
    const wrapper = mount(
      <RankTable
        header={{
          title: "Top10",
          extra: "foo",
        }}
        {...props}
      />
    );

    expect(wrapper.find("div.header")).toHaveLength(1);
    expect(wrapper.find("span.leftCell").text()).toBe("Top10");
    expect(wrapper.find("span.rightCell").text()).toBe("foo");
  });

  it("should render brick header", () => {
    const wrapper = mount(
      <RankTable
        {...props}
        header={{
          title: {
            useBrick: {
              brick: "presentational-bricks.brick-link",
              properties: {
                label: "Top10",
              },
            },
          },
          extra: {
            useBrick: {
              brick: "presentational-bricks.brick-link",
              properties: {
                label: "foo",
              },
            },
          },
        }}
      />
    );

    expect(wrapper.find("div.header")).toHaveLength(1);
    expect(wrapper.find("span.leftCell BrickAsComponent")).toHaveLength(1);
    expect(wrapper.find("span.rightCell BrickAsComponent")).toHaveLength(1);
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
      <RankTable
        {...props}
        columns={columns}
        configProps={configProps}
        dataSource={dataSource}
        onChange={jest.fn}
      />
    );

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
      <RankTable
        {...props}
        columns={columns}
        deleteEnabled={true}
        showCard={false}
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
  it("should work size", () => {
    const wrapper = mount(
      <RankTable
        showHeader={false}
        header={{
          title: "Top10",
          extra: "foo",
        }}
        size={"small"}
        {...props}
      />
    );

    expect(
      wrapper.find("span.awards").at(0).prop("className").includes("small")
    ).toBe(true);
    expect(wrapper.find("div.header").at(0).prop("style")).toStrictEqual({
      padding: "0px 0 10px 10px",
    });
  });
});
