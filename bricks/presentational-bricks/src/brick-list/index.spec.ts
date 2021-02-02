import ReactDOM from "react-dom";
import "./";

const spyOnRender = jest.spyOn(ReactDOM, "render").mockImplementation(() => {});
const unmountComponentAtNode = jest
  .spyOn(ReactDOM, "unmountComponentAtNode")
  .mockImplementation((() => {}) as any);

describe("brick-list", () => {
  it("should create a custom element", async () => {
    const element = document.createElement("presentational-bricks.brick-list");
    // Always waiting for async `(dis)connectedCallback`
    await jest.runAllTimers();
    expect(spyOnRender).not.toBeCalled();
    document.body.appendChild(element);
    await jest.runAllTimers();
    expect(spyOnRender).toBeCalled();
    Object.assign(element, {
      isCardList: false,
      showCard: false,
      configProps: {
        header: "header title",
        bordered: true
      },
      itemStyle: {
        padding: 0
      },
      itemList: [
        {
          content: "Man charged over missing wedding girl.",
          meta: {
            src:
              "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
            title: "item title",
            description: "item description"
          }
        }
      ],
      fields: {
        list: "list",
        title: "name",
        content: "content",
        description: "description"
      },
      dataSource: {
        list: [
          {
            name: "1",
            content: "content1",
            description: "description1"
          },
          {
            name: "2",
            content: "content2",
            description: "description2"
          },
          {
            name: "3",
            content: "content3",
            description: "description3"
          }
        ]
      }
    });
    expect(element._itemList).toEqual([
      {
        content: "content1",
        meta: {
          title: "1",
          description: "description1"
        }
      },
      {
        content: "content2",
        meta: {
          title: "2",
          description: "description2"
        }
      },
      {
        content: "content3",
        meta: {
          title: "3",
          description: "description3"
        }
      }
    ]);
    Object.assign(element, {
      showCard: true,
      fields: undefined,
      dataSource: [
        {
          content: "content1",
          meta: {
            title: "1",
            description: "description1"
          }
        }
      ]
    });
    expect(element._itemList).toEqual([
      {
        content: "content1",
        meta: {
          title: "1",
          description: "description1"
        }
      }
    ]);
    Object.assign(element, {
      fields: {
        title: "name",
        content: "content",
        description: "description"
      },
      dataSource: [
        {
          name: "1",
          content: "content1",
          description: "description1"
        }
      ]
    });
    expect(element._itemList).toEqual([
      {
        content: "content1",
        meta: {
          title: "1",
          description: "description1"
        }
      }
    ]);
    Object.assign(element, {
      showCard: true,
      itemBrick: {
        brick: "div"
      },
      dataSource: [
        {
          name: "1"
        },
        {
          name: "2"
        }
      ]
    });
    expect(element._itemList).toEqual([
      {
        name: "1"
      },
      {
        name: "2"
      }
    ]);
    document.body.removeChild(element);
    await jest.runAllTimers();
    expect(unmountComponentAtNode).toBeCalled();
  });
});
