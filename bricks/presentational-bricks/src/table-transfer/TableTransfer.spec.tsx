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
} from "./TableTransfer";
import { cloneDeep } from "lodash";
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
    // expect(wrapper.find(Table)).toHaveLength(2);
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
});
