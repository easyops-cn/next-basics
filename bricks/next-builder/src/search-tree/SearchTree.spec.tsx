import React, { ChangeEvent } from "react";
import { act } from "react-dom/test-utils";
import { mount } from "enzyme";
import { Tree, Input } from "antd";
import { NODE_INFO, symbolForHightlight, symbolForRealParentId } from "./utils";
import {
  SearchTree,
  titleRender,
  SearchTreeProps,
  operation,
  hightlightColor,
} from "./SearchTree";
import { InstanceList } from "@next-libs/cmdb-instances";
import {
  symbolForNodeId,
  symbolForNodeInstanceId,
} from "../shared/storyboard/buildStoryboard";
import * as kit from "@next-core/brick-kit";
import { StoryboardToBuild } from "../shared/storyboard/interfaces";

const getWrapper = (props: SearchTreeProps) => mount(<SearchTree {...props} />);
const baseProps: SearchTreeProps = {
  homepage: "/next-builder",
  appId: "next-builder",
  projectId: "abc",
  height: 500,
  treeData: {
    projectId: "abc",
    storyboard: {} as StoryboardToBuild,
  },
  searchContent: {
    useBrick: undefined,
  },
};

jest.mock("@next-libs/cmdb-instances", () => ({
  InstanceList: jest.fn(() => {
    return "<div>Fake InstanceList</div>";
  }),
}));

const mockInstanceList = InstanceList as any as jest.Mock;

jest.mock("@next-core/brick-kit", () => {
  return {
    __esModule: true,
    BrickAsComponent(): React.ReactElement {
      return <div>BrickAsComponent</div>;
    },
    getHistory: () => {
      return {
        location: {
          origin: "http://localhost",
          pathname: "/next/a",
          search: "?b",
          hash: "#c:d",
        },
        createHref: () => "http://localhost/test",
        listen: () => {
          // do somthing
        },
      };
    },
  };
});

window.innerWidth = 1000;
window.innerHeight = 500;

const originalOffsetWidth = Object.getOwnPropertyDescriptor(
  HTMLElement.prototype,
  "offsetWidth"
);
const originalOffsetHeight = Object.getOwnPropertyDescriptor(
  HTMLElement.prototype,
  "offsetHeight"
);
const getBoundingClientRectSpy = jest.fn(() => ({ width: 600, height: 400 }));

beforeEach(() => {
  Object.defineProperty(HTMLElement.prototype, "clientHeight", {
    configurable: true,
    value: 400,
  });
  Object.defineProperty(HTMLElement.prototype, "getBoundingClientRect", {
    configurable: true,
    value: getBoundingClientRectSpy,
  });
  jest.useFakeTimers();
});
afterEach(() => {
  jest.useRealTimers();
  Object.defineProperty(
    HTMLElement.prototype,
    "offsetHeight",
    originalOffsetHeight
  );
  Object.defineProperty(
    HTMLElement.prototype,
    "offsetWidth",
    originalOffsetWidth
  );
});

describe("SearchTree", () => {
  it("empty treeData", () => {
    const wrapper = getWrapper(baseProps);
    expect(wrapper.find(Input).length).toBe(1);
    expect(wrapper.find(Tree).length).toBe(0);
  });

  describe("had data and should work", () => {
    const storyboard = {
      projectId: "abc",
      storyboard: {
        routes: [
          {
            bricks: [
              {
                brick: "general-button",
                properties: {
                  test: 1,
                },
                [symbolForNodeInstanceId]: "I-01",
                [symbolForNodeId]: "B-02",
                path: "${APP.homepage}/test-1",
              },
              {
                brick: "general-select",
                properties: {
                  test: 2,
                },
                [symbolForNodeInstanceId]: "I-02",
                [symbolForNodeId]: "B-03",
                path: "${APP.homepage}/test-2",
              },
            ],
            [symbolForNodeId]: "B-01",
            path: "${APP.homepage}",
            alias: "page1",
            type: "bricks",
          },
        ],
        meta: {
          customTemplates: [
            {
              name: "tpl-test-1",
              [symbolForNodeId]: "t-01",
            },
            {
              name: "tpl-test-2",
              [symbolForNodeId]: "t-02",
            },
          ],
        },
        dependsAll: false,
      },
    };

    it("tree had display", () => {
      const newProps = Object.assign({}, baseProps, {
        treeData: storyboard,
      });
      const wrapper = getWrapper(newProps);
      expect(wrapper.find(Tree).length).toBe(1);

      expect(wrapper.find(".ant-tree-title").at(0).html()).toBe(
        '<span class="ant-tree-title"><span>routes</span></span>'
      );

      wrapper.find(".ant-tree-switcher").at(0).simulate("click");

      expect(wrapper.find(".ant-tree-title").at(1).html()).toBe(
        '<span class="ant-tree-title"><span>page1</span></span>'
      );

      expect(wrapper.find(".ant-tree-title").at(2).html()).toBe(
        '<span class="ant-tree-title"><span>meta</span></span>'
      );

      mockInstanceList.mock.calls[0][0].autoSearch([
        {
          id: "a",
          values: [null],
          currentCondition: {
            operations: [
              {
                operator: operation.$eq,
              },
            ],
          },
        },
        {
          id: "brick",
          values: ["general-button"],
          currentCondition: {
            operations: [
              {
                operator: operation.$eq,
              },
            ],
          },
        },
      ]);
      jest.runAllTimers();
      wrapper.update();
      expect(wrapper.html().indexOf("general-button")).toBeTruthy();
      expect(wrapper.html().indexOf("general-select")).toBe(-1);

      mockInstanceList.mock.calls[0][0].autoSearch([
        {
          id: "a",
          values: [null],
          currentCondition: {
            operations: [
              {
                operator: operation.$eq,
              },
            ],
          },
        },
        {
          id: "b",
          values: [null],
          currentCondition: {
            operations: [
              {
                operator: operation.$exists,
              },
            ],
          },
        },
      ]);
      jest.runAllTimers();
      wrapper.update();
      expect(wrapper.html().indexOf("general-button")).toBe(-1);
      expect(wrapper.html().indexOf("general-select")).toBe(-1);

      expect(mockInstanceList).toBeCalled();
    });

    it("mock event should work", () => {
      let clickResult = null;
      let enterResult = null;
      let leaveResult = null;
      const mockClick = jest.fn((info) => {
        clickResult = info;
      });
      const mockMouseEnter = jest.fn((info) => {
        enterResult = info;
      });
      const mockMouseLeave = jest.fn((info) => {
        leaveResult = info;
      });

      const newProps: SearchTreeProps = Object.assign({}, baseProps, {
        treeData: storyboard,
        titleClick: mockClick,
        titleFocus: mockMouseEnter,
        titleBlur: mockMouseLeave,
        searchContent: {
          useBrick: {
            brick: "div",
          },
        },
      });

      const wrapper = getWrapper(newProps);
      expect(mockClick).toBeCalledTimes(0);
      expect(wrapper.find(kit.BrickAsComponent).length).toBe(0);

      wrapper.find(".ant-tree-title").at(0).simulate("click");
      wrapper.find(Tree).invoke("onMouseEnter")({
        event: null,
        node: {
          [NODE_INFO]: {
            [symbolForRealParentId]: "id-1",
          },
        } as any,
      });
      wrapper.find(Tree).invoke("onMouseLeave")({
        event: null,
        node: {
          [NODE_INFO]: {
            [symbolForRealParentId]: "id-1",
          },
        } as any,
      });
      expect(mockClick).toBeCalledTimes(1);
      expect(clickResult).toMatchObject({
        info: {
          [symbolForRealParentId]: "",
        },
      });

      expect(mockMouseEnter).toBeCalledTimes(1);
      expect(enterResult).toMatchObject({
        info: {
          [symbolForRealParentId]: "id-1",
        },
      });
      expect(mockMouseLeave).toBeCalledTimes(1);
      expect(leaveResult).toMatchObject({
        info: {
          [symbolForRealParentId]: "id-1",
        },
      });

      wrapper.find(".ant-tree-switcher").at(0).simulate("click");
      wrapper.find(".ant-tree-switcher").at(1).simulate("click");

      wrapper.find(".ant-tree-title").at(1).simulate("click");

      expect(mockClick).toBeCalledTimes(2);
      expect(wrapper.find(kit.BrickAsComponent).length).toBe(1);
      expect(clickResult).toMatchObject({
        info: {
          type: "bricks",
          [symbolForRealParentId]: "B-01",
        },
      });
    });

    it("filter should be work", () => {
      const newProps = Object.assign({}, baseProps, {
        treeData: storyboard,
      });
      const wrapper = getWrapper(newProps);

      act(() => {
        wrapper.find(Input).invoke("onChange")({
          target: {
            value: "general",
          },
        } as ChangeEvent<HTMLInputElement>);
        jest.runAllTimers();
      });
      wrapper.update();
      expect(wrapper.find(Input).prop("value")).toBe("general");
      expect(wrapper.html().indexOf("general-button")).toBeTruthy();
      // expect(wrapper.find('.ant-tree-title').at(0).props().children.props.style).toBe(undefined)
      expect(
        (
          wrapper.find(".ant-tree-title").at(3).props()
            .children as React.ReactElement
        ).props.style
      ).toEqual({
        color: hightlightColor,
      });
      expect(wrapper.html().indexOf("general-select")).toBeTruthy();

      act(() => {
        wrapper.find(Input).invoke("onChange")({
          target: {
            value: "general-button",
          },
        } as ChangeEvent<HTMLInputElement>);
        jest.runAllTimers();
      });
      wrapper.update();
      expect(wrapper.find(Input).prop("value")).toBe("general-button");
      expect(wrapper.html().indexOf("general-button")).toBeTruthy();
      expect(wrapper.html().indexOf("general-select")).toBe(-1);

      act(() => {
        wrapper.find(Input).invoke("onChange")({
          target: {
            value: "",
          },
        } as ChangeEvent<HTMLInputElement>);
        jest.runAllTimers();
      });
      wrapper.update();
      expect(wrapper.find(Input).prop("value")).toBe("");
      expect(wrapper.html().indexOf("general-button")).toBeTruthy();
      expect(wrapper.html().indexOf("general-select")).toBeTruthy();

      act(() => {
        wrapper.find(Input).invoke("onChange")({
          target: {
            value: "this is a null test",
          },
        } as ChangeEvent<HTMLInputElement>);
        jest.runAllTimers();
      });

      wrapper.update();
      expect(wrapper.find(Input).prop("value")).toBe("this is a null test");
      expect(wrapper.html().indexOf("general-button")).toBe(-1);
      expect(wrapper.html().indexOf("general-select")).toBe(-1);
    });

    it("filter icon click and filter will change", async () => {
      const newProps = Object.assign({}, baseProps, {
        treeData: storyboard,
      });
      const wrapper = getWrapper(newProps);

      // ingore case
      await act(async () => {
        wrapper.find(Input).invoke("onChange")({
          target: {
            value: "general",
          },
        } as ChangeEvent<HTMLInputElement>);
      });
      jest.runAllTimers();
      expect(wrapper.html().includes("general-button")).toBeTruthy();

      act(() => {
        wrapper
          .find("GeneralIcon")
          .at(0)
          .props()
          .onClick({} as React.MouseEvent);
        jest.runAllTimers();
      });
      expect(wrapper.html().includes("general-button")).toBeFalsy();

      // fuzzy
      act(() => {
        wrapper.find(Input).invoke("onChange")({
          target: {
            value: "general",
          },
        } as ChangeEvent<HTMLInputElement>);
      });
      jest.runAllTimers();
      expect(wrapper.html().includes("general-button")).toBeTruthy();

      act(() => {
        wrapper
          .find("GeneralIcon")
          .at(1)
          .props()
          .onClick({} as React.MouseEvent);
        jest.runAllTimers();
      });
      expect(wrapper.html().includes("general-button")).toBeFalsy();

      // key
      act(() => {
        wrapper.find(Input).invoke("onChange")({
          target: {
            value: "name",
          },
        } as ChangeEvent<HTMLInputElement>);
      });
      jest.runAllTimers();
      expect(wrapper.html().includes("tpl-test-1")).toBeTruthy();

      act(() => {
        wrapper
          .find("GeneralIcon")
          .at(2)
          .props()
          .onClick({} as React.MouseEvent);
        jest.runAllTimers();
      });
      expect(wrapper.html().includes("tpl-test-1")).toBeFalsy();
    });
  });
});

describe("titleRender", () => {
  it.each([
    [
      "template",
      {
        nodeData: {
          title: "tpl-test-1",
        },
      },
      /* eslint-disable react/jsx-key */
      <span
        style={{
          color: null,
        }}
      >
        tpl-test-1
      </span>,
    ],
    [
      "brick",
      {
        nodeData: {
          title: "general-button",
        },
      },
      /* eslint-disable react/jsx-key */
      <span
        style={{
          color: null,
        }}
      >
        general-button
      </span>,
    ],
    [
      "hight",
      Object.assign({}, baseProps, {
        nodeData: {
          title: "hightlighttest",
          [symbolForHightlight]: true,
          [NODE_INFO]: {},
        },
      }),
      /* eslint-disable react/jsx-key */
      <span style={{ color: hightlightColor }}>hightlighttest</span>,
    ],
  ])("%s", (_condition, params, result) => {
    expect(titleRender(params)).toEqual(result);
  });
});
