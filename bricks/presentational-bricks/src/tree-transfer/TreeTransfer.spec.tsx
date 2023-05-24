import React from "react";
import { mount } from "enzyme";
import { TreeTransfer } from "./TreeTransfer";
import { render, fireEvent } from "@testing-library/react";
import { Button, Checkbox, Input, Tree } from "antd";
const { Search } = Input;
describe("TreeTransfer", () => {
  it("test tree", async () => {
    const props = {
      dataSource: [
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
          children: [
            {
              key: "host.cpu_util.iowaita 1",
              title: "io wait 1",
              uselessKey1: "useless key 1",
              uselessKey2: "useless key 2",
            },
          ],
        },
      ],
      selectedKeys: ["host.cpu_util.user"],
      titles: ["titleLeft", "titleRight"],
      showSearch: true,
      defaultExpandAll: true,
      shownumItem: true,
      replaceFields: { key: "key", title: "title" },
    };

    const changeFn = jest.fn();

    const wrapper = mount(<TreeTransfer {...props} handleChange={changeFn} />);
    await (global as any).flushPromises();
    expect(wrapper).toBeTruthy();
    // 左侧树操作转移数据
    wrapper
      .find(Search)
      .find("[data-testid='leftSearch']")
      .at(0)
      .invoke("onChange")({
      target: {
        value: "1",
      },
    } as any);
    wrapper
      .find(Search)
      .find("[data-testid='leftSearch']")
      .at(0)
      .invoke("onSearch")("1");
    wrapper
      .find(Search)
      .find("[data-testid='leftSearch']")
      .at(0)
      .invoke("onChange")({
      target: {
        value: "",
      },
    } as any);
    wrapper
      .find(Search)
      .find("[data-testid='leftSearch']")
      .at(0)
      .invoke("onSearch")("");
    wrapper
      .find(Tree)
      .find("[data-testid='leftTree']")
      .at(0)
      .invoke("onExpand")(["host.cpu_util.iowait"] as any);
    wrapper.find(Tree).find("[data-testid='leftTree']").at(0).invoke("onCheck")(
      ["host.cpu_util.system"],
      {} as any
    );
    wrapper.find(Tree).find("[data-testid='leftTree']").at(0).invoke("onCheck")(
      [],
      {} as any
    );
    wrapper.find(Tree).find("[data-testid='leftTree']").at(0).invoke("onCheck")(
      [
        "host.cpu_util.user",
        "host.cpu_util.system",
        "host.cpu_util.iowait",
        "host.cpu_util.iowaita 1",
      ],
      {} as any
    );
    wrapper
      .find(Checkbox)
      .find("[data-testid='leftCheckbox']")
      .at(0)
      .invoke("onChange")({
      target: {
        checked: false,
      },
    } as any);
    wrapper
      .find(Checkbox)
      .find("[data-testid='leftCheckbox']")
      .at(0)
      .invoke("onChange")({
      target: {
        checked: true,
      },
    } as any);
    wrapper
      .find(Button)
      .find("[data-testid='rightButton']")
      .at(0)
      .invoke("onClick")({} as any);

    // 右侧树操作转移数据
    wrapper
      .find(Search)
      .find("[data-testid='rightSearch']")
      .at(0)
      .invoke("onChange")({
      target: {
        value: "1",
      },
    } as any);
    wrapper
      .find(Search)
      .find("[data-testid='rightSearch']")
      .at(0)
      .invoke("onSearch")("1");
    wrapper
      .find(Search)
      .find("[data-testid='rightSearch']")
      .at(0)
      .invoke("onChange")({
      target: {
        value: "",
      },
    } as any);

    wrapper
      .find(Search)
      .find("[data-testid='rightSearch']")
      .at(0)
      .invoke("onSearch")("");

    wrapper
      .find(Tree)
      .find("[data-testid='rightTree']")
      .at(0)
      .invoke("onCheck")(["host.cpu_util.system"], {} as any);
    wrapper
      .find(Tree)
      .find("[data-testid='rightTree']")
      .at(0)
      .invoke("onCheck")([], {} as any);
    wrapper
      .find(Tree)
      .find("[data-testid='rightTree']")
      .at(0)
      .invoke("onCheck")(
      [
        "host.cpu_util.user",
        "host.cpu_util.system",
        "host.cpu_util.iowait",
        "host.cpu_util.iowaita 1",
      ],
      {} as any
    );
    wrapper
      .find(Checkbox)
      .find("[data-testid='rightCheckbox']")
      .at(0)
      .invoke("onChange")({
      target: {
        checked: false,
      },
    } as any);
    wrapper
      .find(Checkbox)
      .find("[data-testid='rightCheckbox']")
      .at(0)
      .invoke("onChange")({
      target: {
        checked: true,
      },
    } as any);
    wrapper
      .find(Button)
      .find("[data-testid='leftButton']")
      .at(0)
      .invoke("onClick")({} as any);
    wrapper
      .find(Button)
      .find("[data-testid='leftButton']")
      .at(0)
      .invoke("onClick")({} as any);
    wrapper.unmount();
  });
  it("test tree", async () => {
    const props = {
      dataSource: [
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
          children: [
            {
              key: "host.cpu_util.iowaita 1",
              title: "io wait 1",
              uselessKey1: "useless key 1",
              uselessKey2: "useless key 2",
            },
          ],
        },
      ],
      selectedKeys: ["host.cpu_util.user"],
      titles: ["titleLeft", "titleRight"],
      showSearch: true,
      defaultExpandAll: false,
      shownumItem: true,
      replaceFields: { key: "key", title: "title" },
    };

    const changeFn = jest.fn();

    const wrapper = mount(<TreeTransfer {...props} handleChange={changeFn} />);
    await (global as any).flushPromises();
    wrapper.unmount();
  });
});
