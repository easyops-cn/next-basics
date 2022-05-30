import ReactDOM from "react-dom";
import "./";
import { createHistory, getHistory } from "@next-core/brick-kit";
import { BrickTableElement } from "./";

createHistory();

const spyOnRender = jest.spyOn(ReactDOM, "render").mockImplementation(() => {
  // empty
});
const unmountComponentAtNode = jest
  .spyOn(ReactDOM, "unmountComponentAtNode")
  .mockImplementation((() => {
    // empty
  }) as any);

const mockEventListener = jest.fn((e) => {
  // empty
});
afterEach(() => {
  spyOnRender.mockClear();
});

const props = {
  fields: {
    page: "page",
    pageSize: "pageSize",
    dataSource: "list",
    total: "total",
    rowKey: "key",
    ascend: 1,
    descend: 0,
  },
  columns: [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: true,
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
  ],
  configProps: {
    size: "middle",
    pagination: true,
    rowSelection: true,
  },
  size: "small" as any,
  type: "radio" as any,
  pagination: false,
  dataSource: {
    list: [
      {
        key: "1",
        name: "lynette",
        age: 18,
        address: "New York No. 1 Lake Park",
        tags: ["nice", "good"],
      },
      {
        key: "2",
        name: "John Brown",
        age: 32,
        address: "New York No. 1 Lake Park",
        tags: ["nice", "good"],
      },
      {
        key: "3",
        name: "Bruce Wayne",
        age: null,
        address: "New York No. 1 Lake Park",
        tags: ["nice", "good"],
      },
    ],
    total: 3,
  },
  page: 1,
  pageSize: 1,
  sort: "name",
  order: 1,
};

describe("brick-table", () => {
  it("should create a custom element", async () => {
    const element = document.createElement("presentational-bricks.brick-table");
    // Always waiting for async `(dis)connectedCallback`
    await jest.runAllTimers();
    expect(spyOnRender).not.toBeCalled();
    document.body.appendChild(element);
    await jest.runAllTimers();
    expect(spyOnRender).toBeCalled();
    Object.assign(element, props);
    document.body.removeChild(element);
    await jest.runAllTimers();
    expect(unmountComponentAtNode).toBeCalled();
  });

  it(`should dispatch "page.update" when page is changed"`, async () => {
    const element = document.createElement(
      "presentational-bricks.brick-table"
    ) as BrickTableElement;
    Object.assign(element, props);
    element.addEventListener("page.update", mockEventListener);
    document.body.appendChild(element);
    await jest.runAllTimers();
    spyOnRender.mock.calls[spyOnRender.mock.calls.length - 1][0][
      "props"
    ].children.props.onChange({ current: 2, pageSize: 1 }, {}, {});
    const history = getHistory();
    const urlSearchParams = new URLSearchParams(history.location.search);
    expect(urlSearchParams.get("page")).toBe("2");
    document.body.removeChild(element);
  });

  it(`should dispatch "filter.update" when pageSize is changed"`, async () => {
    const element = document.createElement(
      "presentational-bricks.brick-table"
    ) as BrickTableElement;
    Object.assign(element, props);
    element.addEventListener("filter.update", mockEventListener);
    document.body.appendChild(element);
    await jest.runAllTimers();
    spyOnRender.mock.calls[spyOnRender.mock.calls.length - 1][0][
      "props"
    ].children.props.onChange({ current: 1, pageSize: 2 }, {}, {});
    const history = getHistory();
    const urlSearchParams = new URLSearchParams(history.location.search);
    expect(urlSearchParams.get("page")).toBe("1");
    expect(urlSearchParams.get("pageSize")).toBe("2");
    document.body.removeChild(element);
  });

  it(`should update url params when sorting"`, async () => {
    const element = document.createElement(
      "presentational-bricks.brick-table"
    ) as BrickTableElement;
    Object.assign(element, props);
    document.body.appendChild(element);
    await jest.runAllTimers();
    spyOnRender.mock.calls[spyOnRender.mock.calls.length - 1][0][
      "props"
    ].children.props.onChange(
      { current: 1, pageSize: 1 },
      {},
      { columnKey: "name", order: "descend" }
    );
    const history = getHistory();
    const urlSearchParams = new URLSearchParams(history.location.search);
    expect(urlSearchParams.get("sort")).toBe("name");
    expect(urlSearchParams.get("order")).toBe("0");
    document.body.removeChild(element);
  });

  it(`should dispatch "select.update" when _handleRowSelectChange has been called"`, async () => {
    const element = document.createElement(
      "presentational-bricks.brick-table"
    ) as BrickTableElement;
    Object.assign(element, props);
    element.addEventListener("select.update", mockEventListener);
    document.body.appendChild(element);
    await jest.runAllTimers();
    spyOnRender.mock.calls[spyOnRender.mock.calls.length - 1][0][
      "props"
    ].children.props.configProps.rowSelection.onSelect(
      {
        key: "1",
        name: "John Brown",
        age: 32,
        address: "New York No. 1 Lake Park",
        tags: ["nice", "good"],
      },
      true,
      [
        {
          key: "1",
          name: "John Brown",
          age: 32,
          address: "New York No. 1 Lake Park",
          tags: ["nice", "good"],
        },
      ]
    );
    document.body.removeChild(element);
  });
  it(`front search`, async () => {
    const element = document.createElement(
      "presentational-bricks.brick-table"
    ) as BrickTableElement;
    Object.assign(element, props);
    element._frontSearch = true;
    element.frontSearchFilterKeys = ["name"];
    document.body.appendChild(element);
    await jest.runAllTimers();
    spyOnRender.mock.calls[spyOnRender.mock.calls.length - 1][0][
      "props"
    ].children.props.onChange({ current: 2, pageSize: 1 }, {}, {});
    const history = getHistory();
    const urlSearchParams = new URLSearchParams(history.location.search);
    expect(urlSearchParams.get("page")).toBe("2");
    document.body.removeChild(element);
  });

  it(`datasource variable`, async () => {
    const element = document.createElement(
      "presentational-bricks.brick-table"
    ) as BrickTableElement;
    props.fields = {
      page: "page",
      pageSize: "pageSize",
      dataSource: "",
      total: "total",
      rowKey: "",
      ascend: 1,
      descend: 0,
    };
    Object.assign(element, props);
    document.body.appendChild(element);
    // await jest.runAllTimers();
    // spyOnRender.mock.calls[spyOnRender.mock.calls.length - 1][0][
    //   "props"
    // ].children.props.onChange({ current: 2, pageSize: 1 }, {}, {});
    // const history = getHistory();
    // const urlSearchParams = new URLSearchParams(history.location.search);
    // expect(urlSearchParams.get("page")).toBe("2");
    document.body.removeChild(element);
  });

  it("filterSourceData should work", async () => {
    const element = document.createElement(
      "presentational-bricks.brick-table"
    ) as BrickTableElement;

    element.frontSearch = true;
    element.dataSource = props.dataSource as any;
    element.columns = props.columns as any;
    document.body.appendChild(element);
    await jest.runAllTimers();
    element.filterSourceData(new CustomEvent("", { detail: { q: "lynette" } }));
    await jest.runAllTimers();
    expect(element.processedDataSource.length).toBe(1);
    element.filterSourceData(new CustomEvent("", { detail: { q: "" } }));
    document.body.removeChild(element);
  });
  it(`set property should work`, () => {
    const element = document.createElement(
      "presentational-bricks.brick-table"
    ) as BrickTableElement;

    element.selectUpdateEventDetailExtra = {};
    element.selectUpdateEventDetailField = "instanceId";
    element.selectUpdateEventDetailKeys = ["x"];
    element.selectUpdateEventName = "custom.event.name";
    element.frontSearch = true;
    element.showCard = false;
    element.updateData(new CustomEvent("update-data", { detail: {} }));
    element.updateError(new CustomEvent("update-error", { detail: {} }));

    document.body.appendChild(element);
    document.body.removeChild(element);
  });

  it("handleFrontendSorter should work", async () => {
    const element = document.createElement(
      "presentational-bricks.brick-table"
    ) as BrickTableElement;

    element.frontSearch = true;
    element.dataSource = props.dataSource as any;
    element.columns = props.columns as any;
    element.sort = "age";
    element.order = "ascend";
    document.body.appendChild(element);
    await jest.runAllTimers();
    expect(element.processedDataSource.map((item) => item.age)).toEqual([
      18,
      32,
      null,
    ]);
    element.order = "descend";
    await jest.runAllTimers();
    expect(element.processedDataSource.map((item) => item.age)).toEqual([
      32,
      18,
      null,
    ]);
    document.body.removeChild(element);
  });

  it("should work with autoSelectParentWhenAllChildrenSelected property", async () => {
    const item0_0 = {
      id: "0_0",
    };
    const item0_1 = {
      id: "0_1",
    };
    const item0 = {
      id: "0",
      children: [item0_0, item0_1],
    };
    const list = [item0];
    const element = document.createElement(
      "presentational-bricks.brick-table"
    ) as BrickTableElement;
    element.dataSource = { list };
    element.rowKey = "id";
    element.configProps = { rowSelection: true };
    document.body.appendChild(element);
    element.addEventListener("select.update", mockEventListener);
    await jest.runAllTimers();

    const { onSelect, onSelectAll, onChange } =
      spyOnRender.mock.calls[spyOnRender.mock.calls.length - 1][0]["props"]
        .children.props.configProps.rowSelection;
    const childIds = item0.children.map((child) => child.id);
    onSelect(item0_1, true, item0.children);
    onChange(childIds, item0.children);
    expect(mockEventListener).toBeCalledWith(
      expect.objectContaining({
        type: "select.update",
        detail: expect.arrayContaining(item0.children),
      })
    );

    element.autoSelectParentWhenAllChildrenSelected = true;
    await jest.runAllTimers();
    onSelect(item0_1, true, item0.children);
    onChange(childIds, item0.children);
    expect(mockEventListener).toBeCalledWith(
      expect.objectContaining({
        type: "select.update",
        detail: expect.arrayContaining([...item0.children, item0]),
      })
    );

    // onSelectAll
    onSelectAll(true, [item0]);
    onChange([item0.id], [item0]);
    expect(mockEventListener).toBeCalledWith(
      expect.objectContaining({
        type: "select.update",
        detail: expect.arrayContaining([item0]),
      })
    );
  });

  it("exactSearch should work", async () => {
    const dataSource = {
      list: [
        ...props.dataSource.list,
        {
          key: "3",
          name: "Bruce Wayne4",
          age: null,
          address: "New York No. 1 Lake Park",
          tags: ["nice", "good"],
        },
      ],
      total: 4,
    };
    const element = document.createElement(
      "presentational-bricks.brick-table"
    ) as BrickTableElement;

    element.frontSearch = true;
    element.dataSource = dataSource as any;
    element.columns = props.columns as any;
    document.body.appendChild(element);
    await jest.runAllTimers();
    element.filterSourceData(
      new CustomEvent("", { detail: { q: "Bruce Wayne" } })
    );
    await jest.runAllTimers();
    expect(element.processedDataSource.length).toBe(2);
    element.exactSearch = true;
    element.filterSourceData(
      new CustomEvent("", { detail: { q: "Bruce Wayne" } })
    );
    await jest.runAllTimers();
    expect(element.processedDataSource.length).toBe(1);
    document.body.removeChild(element);
  });

  it("should get correct _finalConfigProps", async () => {
    const element = document.createElement(
      "presentational-bricks.brick-table"
    ) as BrickTableElement;

    element.configProps = props.configProps;
    element.dataSource = props.dataSource as any;
    element.columns = props.columns as any;
    element.size = props.size as any;
    element.pagination = props.pagination as any;
    element.type = props.type as any;

    document.body.appendChild(element);
    await jest.runAllTimers();
    expect(element.processConfigProps.rowSelection.type).toBe("radio");
    expect(element.processConfigProps.size).toBe("middle");
    expect(element.processConfigProps.pagination).not.toEqual(undefined);
    document.body.removeChild(element);
  });

  it("property pagination should work", async () => {
    const element = document.createElement(
      "presentational-bricks.brick-table"
    ) as BrickTableElement;

    element.configProps = { ...props.configProps, pagination: null };
    element.dataSource = props.dataSource as any;
    element.columns = props.columns as any;
    element.pagination = false;

    document.body.appendChild(element);
    await jest.runAllTimers();
    expect(element.processConfigProps.pagination).toEqual(false);
    document.body.removeChild(element);
  });

  it("property type should work when rowSelection is null", async () => {
    const element = document.createElement(
      "presentational-bricks.brick-table"
    ) as BrickTableElement;

    element.configProps = { ...props.configProps, rowSelection: null };
    element.dataSource = props.dataSource as any;
    element.columns = props.columns as any;
    element.type = "checkbox" as any;

    document.body.appendChild(element);
    await jest.runAllTimers();
    expect(element.processConfigProps.rowSelection.type).toBe("checkbox");
    expect(element.processConfigProps.rowSelection.onChange).not.toBe(
      undefined
    );
    document.body.removeChild(element);
  });

  it("property type should work when configProps is null", async () => {
    const element = document.createElement(
      "presentational-bricks.brick-table"
    ) as BrickTableElement;

    element.configProps = null;
    element.dataSource = props.dataSource as any;
    element.columns = props.columns as any;
    element.type = "checkbox" as any;

    document.body.appendChild(element);
    await jest.runAllTimers();
    expect(element.processConfigProps.rowSelection.type).toBe("checkbox");
    expect(element.processConfigProps.rowSelection.onChange).not.toBe(
      undefined
    );
    document.body.removeChild(element);
  });
});
