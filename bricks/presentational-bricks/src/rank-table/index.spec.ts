import ReactDOM from "react-dom";
import "./";

const spyOnRender = jest
  .spyOn(ReactDOM, "render")
  .mockImplementation(() => null);
const unmountComponentAtNode = jest
  .spyOn(ReactDOM, "unmountComponentAtNode")
  .mockImplementation(() => null);

afterEach(() => {
  spyOnRender.mockClear();
});

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

describe("presentational-bricks.trend-table", () => {
  it("should create a custom element", () => {
    const element = document.createElement("presentational-bricks.rank-table");
    (element as any).columns = props.columns;
    (element as any).dataSource = props.dataSource;
    expect(spyOnRender).not.toBeCalled();
    document.body.appendChild(element);
    expect(spyOnRender).toBeCalled();
    document.body.removeChild(element);
    expect(unmountComponentAtNode).toBeCalled();
  });
});
