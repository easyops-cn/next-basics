import React from "react";
import { act } from "react-dom/test-utils";
import { mount } from "enzyme";
import { Tree, Input } from "antd";
import { NODE_INFO, HIGHTLIGHT } from "./utils";
import { SearchTree, titleRender, SearchTreeProps } from "./SearchTree";
import {
  symbolForNodeId,
  symbolForNodeInstanceId,
} from "../shared/storyboard/buildStoryboard";

const getWrapper = (props: SearchTreeProps) => mount(<SearchTree {...props} />);
const baseProps: SearchTreeProps = {
  homepage: "/next-builder",
  appId: "next-builder",
  projectId: "abc",
  height: 500,
  treeData: {
    projectId: "abc",
    storyboard: {},
  },
};

beforeEach(() => {
  jest.useFakeTimers();
});
afterEach(() => {
  jest.useRealTimers();
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

      expect(wrapper.find(".ant-tree-title").at(0).props().children.type).toBe(
        "span"
      );
      expect(
        wrapper.find(".ant-tree-title").at(0).props().children.props.children
      ).toBe("routes");

      expect(wrapper.find(".ant-tree-title").at(1).props().children.type).toBe(
        "a"
      );
      expect(
        wrapper.find(".ant-tree-title").at(1).props().children.props.children
      ).toBe("bricks");
      expect(
        wrapper.find(".ant-tree-title").at(1).props().children.props.href
      ).toBe(
        "/next-builder/project/abc/app/next-builder/visualize-builder?root=B-01&fullscreen=1&canvasIndex=0"
      );

      expect(wrapper.find(".ant-tree-title").at(2).props().children.type).toBe(
        "a"
      );
      expect(
        wrapper.find(".ant-tree-title").at(2).props().children.props.children
      ).toBe("general-button");
      expect(
        wrapper.find(".ant-tree-title").at(2).props().children.props.href
      ).toBe(
        "/next-builder/project/abc/app/next-builder/visualize-builder?root=B-01&fullscreen=1&canvasIndex=0#brick,I-01"
      );

      expect(wrapper.find(".ant-tree-title").last().props().children.type).toBe(
        "a"
      );
      expect(
        wrapper.find(".ant-tree-title").last().props().children.props.children
      ).toBe("tpl-test-2");
      expect(
        wrapper.find(".ant-tree-title").last().props().children.props.href
      ).toBe(
        "/next-builder/project/abc/app/next-builder/template/t-02/visualize-builder?fullscreen=1"
      );
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
      });

      const wrapper = getWrapper(newProps);
      expect(mockClick).toBeCalledTimes(0);

      wrapper.find(".ant-tree-title").at(0).simulate("click");
      wrapper.find(Tree).invoke("onMouseEnter")({
        event: null,
        node: {
          [NODE_INFO]: {
            relParentId: "id-1",
          },
        },
      });
      wrapper.find(Tree).invoke("onMouseLeave")({
        event: null,
        node: {
          [NODE_INFO]: {
            relParentId: "id-1",
          },
        },
      });
      expect(mockClick).toBeCalledTimes(1);
      expect(clickResult).toMatchObject({
        realParentId: "",
      });

      expect(mockMouseEnter).toBeCalledTimes(1);
      expect(enterResult).toMatchObject({
        relParentId: "id-1",
      });
      expect(mockMouseLeave).toBeCalledTimes(1);
      expect(leaveResult).toMatchObject({
        relParentId: "id-1",
      });

      wrapper.find(".ant-tree-title").at(1).simulate("click");
      expect(mockClick).toBeCalledTimes(2);
      expect(clickResult).toMatchObject({
        type: "bricks",
        realParentId: "B-01",
        url: "/next-builder/project/abc/app/next-builder/visualize-builder?root=B-01&fullscreen=1&canvasIndex=0",
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
        });
        jest.runAllTimers();
      });
      wrapper.update();
      expect(wrapper.find(Input).prop("value")).toBe("general");
      expect(wrapper.html().indexOf("general-button")).toBeTruthy();
      // expect(wrapper.find('.ant-tree-title').at(0).props().children.props.style).toBe(undefined)
      expect(
        wrapper.find(".ant-tree-title").at(3).props().children.props.style
      ).toEqual({
        background: "yellow",
      });
      expect(wrapper.html().indexOf("general-select")).toBeTruthy();

      act(() => {
        wrapper.find(Input).invoke("onChange")({
          target: {
            value: "general-button",
          },
        });
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
        });
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
        });
        jest.runAllTimers();
      });

      wrapper.update();
      expect(wrapper.find(Input).prop("value")).toBe("this is a null test");
      expect(wrapper.html().indexOf("general-button")).toBe(-1);
      expect(wrapper.html().indexOf("general-select")).toBe(-1);
    });
  });
});

describe("titleRender", () => {
  it.each([
    [
      "template",
      Object.assign({}, baseProps, {
        nodeData: {
          [NODE_INFO]: {
            name: "tpl-test-1",
            realParentId: "B-01",
          },
        },
      }),
      /* eslint-disable react/jsx-key */
      <a
        style={{ background: null }}
        href="/next-builder/project/abc/app/next-builder/template/B-01/visualize-builder?fullscreen=1"
      >
        tpl-test-1
      </a>,
    ],
    [
      "brick",
      Object.assign({}, baseProps, {
        nodeData: {
          [NODE_INFO]: {
            brick: "general-button",
            realParentId: "B-01",
            [symbolForNodeInstanceId]: "B-02",
          },
        },
      }),
      /* eslint-disable react/jsx-key */
      <a
        style={{ background: null }}
        href="/next-builder/project/abc/app/next-builder/visualize-builder?root=B-01&fullscreen=1&canvasIndex=0#brick,B-02"
      >
        general-button
      </a>,
    ],
    [
      "page",
      Object.assign({}, baseProps, {
        nodeData: {
          [NODE_INFO]: {
            alias: "pagetest",
            realParentId: "B-01",
          },
        },
      }),
      /* eslint-disable react/jsx-key */
      <a
        style={{ background: null }}
        href="/next-builder/project/abc/app/next-builder/visualize-builder?root=B-01&fullscreen=1&canvasIndex=0"
      >
        pagetest
      </a>,
    ],
    [
      "normal",
      Object.assign({}, baseProps, {
        nodeData: {
          title: "title-test",
          [NODE_INFO]: {},
        },
      }),
      /* eslint-disable react/jsx-key */
      <span style={{ background: null }}>title-test</span>,
    ],
    [
      "hight",
      Object.assign({}, baseProps, {
        nodeData: {
          title: "hightlighttest",
          [HIGHTLIGHT]: true,
          [NODE_INFO]: {},
        },
      }),
      /* eslint-disable react/jsx-key */
      <span style={{ background: "yellow" }}>hightlighttest</span>,
    ],
  ])("%s", (_condition, params, result) => {
    expect(titleRender(params)).toEqual(result);
  });
});
