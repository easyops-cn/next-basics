import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { shallow, mount } from "enzyme";

import "@testing-library/jest-dom";
import { Table, Transfer, Modal } from "antd";
import {
  TableTransfer,
  arrayMoveImmutable,
  filterDisabledDataSource,
  filterOptions,
  transferData,
} from "./TableTransfer";
import { cloneDeep } from "lodash";
import { Trans } from "react-i18next";
describe("TableTransfer", () => {
  const dataSource = [
    {
      key: "host.cpu_util.user",
      title: "cpu user",
      uselessKey1: "useless key 1",
      uselessKey2: "useless key 2",
    },
    {
      key: "host.cpu_util.system",
      title: "cpu system",
      uselessKey1: "useless key 1",
      uselessKey2: "useless key 2",
    },
    {
      key: "host.cpu_util.iowait",
      title: "io wait",
      uselessKey1: "useless key 1",
      uselessKey2: "useless key 2",
    },
    {
      key: "host.disk.total",
      title: "disk total",
      uselessKey1: "useless key 1",
      uselessKey2: "useless key 2",
    },
    {
      key: "host.network.bytes_in",
      title: "bytes in",
      uselessKey1: "useless key 1",
      uselessKey2: "useless key 2",
    },
    {
      key: "host.network.bytes_out",
      title: "bytes out",
      uselessKey1: "useless key 1",
      uselessKey2: "useless key 2",
    },
  ];

  const columns = [
    {
      title: "title-left",
      key: "title",
      dataIndex: "title",
    },
    {
      title: "uselessKey1",
      key: "uselessKey1",
      dataIndex: "uselessKey1",
    },
  ];

  const targetKeys = [
    "host.cpu_util.user",
    "host.cpu_util.system",
    "host.cpu_util.iowait",
  ];
  it("should work", () => {
    const changeFn = jest.fn();
    const spyOnModal = jest.spyOn(Modal, "warning");
    const wrapper = mount(
      <TableTransfer
        dataSource={cloneDeep(dataSource)}
        columns={columns}
        targetKeys={targetKeys}
        change={changeFn}
        maxSelected={3}
        dragSortable={true}
      />
    );
    const transfer = wrapper.find(Transfer);
    transfer.invoke("onChange")(
      ["host.disk.total", "host.network.bytes_out"],
      "right",
      ["host.cpu_util.iowait"]
    );
    expect(changeFn).toBeCalledWith([
      "host.disk.total",
      "host.network.bytes_out",
    ]);
    expect(changeFn).toBeCalledTimes(1);
    transfer.invoke("onChange")(
      [
        "host.disk.total",
        "host.network.bytes_out",
        "host.cpu_util.iowait",
        "host.cpu_util.system",
      ],
      "right",
      ["host.cpu_util.iowait", "host.cpu_util.system"]
    );
    expect(changeFn).toBeCalledTimes(1);
    expect(spyOnModal).toBeCalledWith({
      title: "提示",
      content: `所选数量超过最大限制（3），请重新选择`,
      okText: "知道了",
    });
  });
  it("should work", () => {
    const wrapper = mount(
      <TableTransfer
        dataSource={cloneDeep(dataSource)}
        columns={columns}
        maxSelected={3}
        dragSortable={true}
      />
    );
    const table = wrapper.find(Transfer).find(Table);
    expect(table).toHaveLength(2);
    expect(table.at(0).prop("scroll")).toEqual({ x: undefined });
    wrapper.setProps({ listStyle: { width: 300 } });
    expect(wrapper.find(Transfer).find(Table).at(0).prop("scroll")).toEqual({
      x: 300,
    });
  });
  it("should work width arrayMoveImmutable", () => {
    expect(arrayMoveImmutable([1, 2, 3, 4], 1, 3)).toEqual([1, 3, 4, 2]);
    expect(arrayMoveImmutable([1, 2, 3, 4], 4, 5)).toEqual([1, 2, 3, 4]);
  });
  it("should work with filterDisabledDataSource", () => {
    expect(filterDisabledDataSource(dataSource, targetKeys)).toEqual(
      dataSource
    );
    const filteredDataSource = filterDisabledDataSource(
      dataSource,
      targetKeys,
      3
    );
    expect(filteredDataSource).toEqual([
      {
        key: "host.cpu_util.user",
        title: "cpu user",
        uselessKey1: "useless key 1",
        uselessKey2: "useless key 2",
      },
      {
        key: "host.cpu_util.system",
        title: "cpu system",
        uselessKey1: "useless key 1",
        uselessKey2: "useless key 2",
      },
      {
        key: "host.cpu_util.iowait",
        title: "io wait",
        uselessKey1: "useless key 1",
        uselessKey2: "useless key 2",
      },
      {
        key: "host.disk.total",
        title: "disk total",
        uselessKey1: "useless key 1",
        uselessKey2: "useless key 2",
        disabled: true,
      },
      {
        key: "host.network.bytes_in",
        title: "bytes in",
        uselessKey1: "useless key 1",
        uselessKey2: "useless key 2",
        disabled: true,
      },
      {
        key: "host.network.bytes_out",
        title: "bytes out",
        uselessKey1: "useless key 1",
        uselessKey2: "useless key 2",
        disabled: true,
      },
    ]);
    expect(filterDisabledDataSource(filteredDataSource, [], 3)).toEqual(
      dataSource
    );
  });
  it("should work with filterOptions", () => {
    expect(
      filterOptions(
        "out",
        {
          key: "host.network.bytes_out",
          title: "bytes out",
          uselessKey1: "useless key 1",
          uselessKey2: "useless key 2",
          disabled: true,
        },
        columns
      )
    ).toEqual(true);
    expect(
      filterOptions(
        "OUT",
        {
          key: "host.network.bytes_out",
          title: "bytes out",
          uselessKey1: "useless key 1",
          uselessKey2: "useless key 2",
          disabled: true,
        },
        columns
      )
    ).toEqual(true);
  });
  it("should work with transferData", () => {
    const list = [
      { key: "key1", title: "key1" },
      { key: "key2", title: "key2" },
      { key: "key3", title: "key3" },
      { key: "key4", title: "key4" },
      { key: "key5", title: "key5" },
      { key: "key6", title: "key6" },
      { key: "key7", title: "key7" },
      { key: "key8", title: "key8" },
    ];
    expect(
      transferData({
        dataSource: list,
        selected: true,
        direction: "left",
        max: 3,
        targetKeys: ["key1", "key2"],
        selectedKeys: ["key3"],
        key: "key3",
      })
    ).toEqual([
      { key: "key1", title: "key1" },
      { key: "key2", title: "key2" },
      { key: "key3", title: "key3" },
      { key: "key4", title: "key4", disabled: true },
      { key: "key5", title: "key5", disabled: true },
      { key: "key6", title: "key6", disabled: true },
      { key: "key7", title: "key7", disabled: true },
      { key: "key8", title: "key8", disabled: true },
    ]);
    expect(
      transferData({
        dataSource: list,
        selected: false,
        direction: "left",
        max: 3,
        targetKeys: ["key1", "key2"],
        selectedKeys: ["key3"],
        key: "key3",
      })
    ).toEqual(list);
    expect(
      transferData({
        dataSource: list,
        selected: true,
        direction: "right",
        max: 3,
        targetKeys: ["key1", "key2"],
        selectedKeys: ["key1"],
        key: "key1",
      })
    ).toEqual(list);
    expect(
      transferData({
        dataSource: list,
        selected: false,
        direction: "right",
        max: 3,
        targetKeys: ["key1", "key2"],
        selectedKeys: ["key1"],
        key: "key1",
      })
    ).toEqual(list);
    expect(
      transferData({
        dataSource: list,
        selected: false,
        direction: "left",
        targetKeys: ["key1", "key2"],
        selectedKeys: ["key4"],
        key: "key4",
      })
    ).toEqual(list);
  });
});
