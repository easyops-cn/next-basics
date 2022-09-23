import React, {
  createRef,
  forwardRef,
  useEffect,
  useImperativeHandle,
} from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import {
  BuilderDataManager,
  BuilderProvider,
  BuilderRuntimeNode,
  useBuilderDataManager,
} from "@next-core/editor-bricks-helper";
import { WorkbenchBrickTree } from "./WorkbenchBrickTree";
import { act } from "react-dom/test-utils";
import { createHistory } from "@next-core/brick-kit";

createHistory();

interface ManagerAgentProps {
  dataSource: BuilderRuntimeNode;
  children?: React.ReactElement;
}

function LegacyManagerAgent(
  { children, dataSource }: ManagerAgentProps,
  ref: React.Ref<BuilderDataManager>
): React.ReactElement {
  const manager = useBuilderDataManager();
  useImperativeHandle(ref, () => manager);
  useEffect(() => {
    if (dataSource) {
      manager.dataInit(dataSource);
    }
  }, [dataSource, manager]);
  return children as React.ReactElement;
}

const ManagerAgent = forwardRef(LegacyManagerAgent);

/**
 * A custom render to setup providers. Extends regular
 * render options with `providerProps` to allow injecting
 * different scenarios to test with.
 *
 * @see https://testing-library.com/docs/react-testing-library/setup#custom-render
 */
const customRender = (
  ref: React.Ref<BuilderDataManager>,
  dataSource: BuilderRuntimeNode,
  ...args: Parameters<typeof render>
): ReturnType<typeof render> => {
  return render(
    <BuilderProvider>
      <ManagerAgent ref={ref} dataSource={dataSource}>
        {args[0]}
      </ManagerAgent>
    </BuilderProvider>,
    args[1]
  );
};

test("WorkbenchBrickTree with no nodes", () => {
  const { container } = customRender(null, null, <WorkbenchBrickTree />);
  expect(container.querySelector(".tree")).toBe(null);
});

test("WorkbenchBrickTree with route of redirect", () => {
  const { container } = customRender(
    null,
    {
      id: "B-001",
      type: "redirect",
      path: "/r",
      children: [
        {
          id: "B-002",
          type: "redirect",
          path: "invalid",
        },
      ],
    },
    <WorkbenchBrickTree />
  );
  expect(container.querySelectorAll(".tree").length).toBe(1);
  expect(container.querySelector(".tree").childElementCount).toBe(1);
});

test("WorkbenchBrickTree with route of bricks", () => {
  const ref = createRef<BuilderDataManager>();
  const onNodeToggle = jest.fn();
  // Given a tree:
  //       1 <route>
  //      ↙ ↘
  //     2   3
  //       ↙   ↘
  // (content) (toolbar)
  //    ↙ ↘        ↓
  //   4   6       5
  const { container } = customRender(
    ref,
    {
      id: "B-001",
      instanceId: "i-1",
      type: "bricks",
      path: "/home",
      children: [
        {
          id: "B-002",
          instanceId: "i-2",
          type: "brick",
          brick: "brick-a",
          sort: 0,
          mountPoint: "bricks",
          alias: "alias-a",
        },
        {
          id: "B-003",
          instanceId: "i-3",
          type: "brick",
          brick: "brick-b",
          sort: 1,
          mountPoint: "undefined",
          properties: '{"quality":"good"}',
          portal: true,
          children: [
            {
              id: "B-004",
              instanceId: "i-4",
              type: "brick",
              brick: "brick-c",
              mountPoint: "content",
              bg: true,
            },
            {
              id: "B-006",
              instanceId: "i-6",
              type: "template",
              brick: "brick-e",
              sort: 1,
              mountPoint: "content",
            },
            {
              id: "B-005",
              instanceId: "i-5",
              type: "provider",
              brick: "brick-d",
              mountPoint: "toolbar",
            },
          ],
        },
      ],
    },
    <WorkbenchBrickTree
      searchPlaceholder="Search"
      activeInstanceId="i-2"
      onNodeToggle={onNodeToggle}
    />
  );

  const rootTree = container.querySelector(".tree");
  const firstLevelLinks = [...rootTree.children].map((child) =>
    child.querySelector(".nodeLabelRow")
  ) as HTMLElement[];
  expect(firstLevelLinks.length).toBe(1);

  expect(
    rootTree.firstElementChild.querySelector(".tree").childElementCount
  ).toBe(2);
  expect(
    rootTree.firstElementChild
      .querySelector(".tree")
      .firstElementChild.querySelector(".tree")
  ).toBe(null);
  expect(
    rootTree.firstElementChild
      .querySelector(".tree")
      .lastElementChild.querySelectorAll(".tree").length
  ).toBe(3);
  expect(container.querySelectorAll(".tree").length).toBe(5);
  expect(container.querySelectorAll(".nodeName").length).toBe(8);
  expect(container.querySelectorAll(".nodeLabelRow.matched").length).toBe(0);
  expect(container.querySelectorAll(".nodeLabelRow.active").length).toBe(1);
  expect(
    container.querySelector(".nodeLabelRow.active > .nodeLabel > .nodeName")
  ).toHaveTextContent("alias-a");

  // Collapse a mount-point.
  expect(onNodeToggle).not.toBeCalled();
  fireEvent.click(
    screen
      .getByText("toolbar", { selector: ".nodeName" })
      .parentElement.querySelector(".collapseIcon")
  );
  expect(onNodeToggle).toBeCalledTimes(1);
  expect(onNodeToggle).toHaveBeenNthCalledWith(1, "i-3:toolbar", true);

  // Collapse a brick.
  fireEvent.click(
    screen
      .getByText("brick-b", { selector: ".nodeName" })
      .parentElement.querySelector(".collapseIcon")
  );
  expect(onNodeToggle).toBeCalledTimes(2);
  expect(onNodeToggle).toHaveBeenNthCalledWith(2, "i-3", true);

  // Search by brick properties.
  fireEvent.change(screen.getByPlaceholderText("Search"), {
    target: { value: "good" },
  });

  expect(container.querySelectorAll(".tree").length).toBe(5);
  expect(container.querySelectorAll(".nodeName").length).toBe(8);
  expect(container.querySelectorAll(".matched").length).toBe(1);
  expect(
    container.querySelector(".matched > .nodeLabel > .nodeName")
  ).toHaveTextContent("brick-b");

  // Context-menu node as hover.
  expect(container.querySelector(".nodeLabelRow.hover")).toBe(null);
  act(() => {
    fireEvent.contextMenu(
      screen.getByText("brick-c", { selector: ".nodeName" }).parentElement
        .parentElement
    );
  });
  expect(container.querySelectorAll(".nodeLabelRow.hover").length).toBe(1);
  expect(
    container.querySelector(".nodeLabelRow.hover > .nodeLabel > .nodeName")
  ).toHaveTextContent("brick-c");

  // Reset context-menu.
  act(() => {
    ref.current.contextMenuChange({
      active: false,
    });
  });
  expect(container.querySelector(".nodeLabelRow.hover")).toBe(null);

  // Mouse-enter.
  act(() => {
    fireEvent.mouseEnter(
      screen.getByText("brick-e", { selector: ".nodeName" }).parentElement
        .parentElement
    );
  });
  expect(container.querySelectorAll(".nodeLabelRow.hover").length).toBe(1);
  expect(
    container.querySelector(".nodeLabelRow.hover > .nodeLabel > .nodeName")
  ).toHaveTextContent("brick-e");

  // Mouse-enter again.
  act(() => {
    fireEvent.mouseEnter(
      screen.getByText("brick-e", { selector: ".nodeName" }).parentElement
        .parentElement
    );
  });

  // Mouse-leave.
  act(() => {
    fireEvent.mouseLeave(
      screen.getByText("brick-e", { selector: ".nodeName" }).parentElement
        .parentElement
    );
  });
  expect(container.querySelector(".nodeLabelRow.hover")).toBe(null);

  // Mouse-leave again.
  act(() => {
    fireEvent.mouseLeave(
      screen.getByText("brick-e", { selector: ".nodeName" }).parentElement
        .parentElement
    );
  });

  // Click
  const onNodeClick = jest.fn();
  ref.current.onNodeClick(onNodeClick);
  act(() => {
    fireEvent.click(
      screen.getByText("brick-c", { selector: ".nodeName" }).parentElement
        .parentElement
    );
  });
  expect(onNodeClick.mock.calls[0][0].detail).toMatchObject({
    brick: "brick-c",
  });
});

test("WorkbenchBrickTree with routes", () => {
  const { container } = customRender(
    null,
    {
      id: "B-001",
      type: "routes",
      path: "/r",
      children: [
        {
          id: "B-002",
          type: "bricks",
          path: "/r/2",
        },
        {
          id: "B-003",
          type: "routes",
          path: "/r/3",
        },
        {
          id: "B-004",
          type: "redirect",
          path: "/r/4",
        },
      ],
    },
    <WorkbenchBrickTree />
  );
  expect(container.querySelectorAll(".tree").length).toBe(2);
  expect(container.querySelectorAll(".nodeName").length).toBe(4);
  expect(
    (container.querySelector(".nodeIcon").firstElementChild as HTMLElement)
      .dataset.icon
  ).toBe("branches");
});

test("WorkbenchBrickTree with template", () => {
  const { container } = customRender(
    null,
    {
      id: "T-001",
      type: "custom-template",
      templateId: "tpl-test",
      children: [
        {
          id: "B-001",
          type: "brick",
          brick: "my-brick",
        },
      ],
    },
    <WorkbenchBrickTree />
  );
  expect(container.querySelectorAll(".tree").length).toBe(2);
  expect(container.querySelectorAll(".nodeName").length).toBe(2);
  expect(
    (container.querySelector(".nodeIcon").firstElementChild as HTMLElement)
      .dataset.icon
  ).toBe("block");
});

test("WorkbenchBrickTree with snippet", () => {
  const { container } = customRender(
    null,
    {
      id: "T-001",
      type: "snippet",
      snippetId: "snippet-test",
      children: [
        {
          id: "B-001",
          type: "brick",
          brick: "my-brick",
          mountPoint: "bricks",
        },
      ],
    },
    <WorkbenchBrickTree searchPlaceholder="Search" />
  );
  expect(container.querySelectorAll(".tree").length).toBe(2);
  expect(container.querySelectorAll(".nodeName").length).toBe(2);
  expect(
    (container.querySelector(".nodeIcon").firstElementChild as HTMLElement)
      .dataset.icon
  ).toBe("snippets");

  // Search by snippet name.
  fireEvent.change(screen.getByPlaceholderText("Search"), {
    target: { value: "test" },
  });

  expect(
    container.querySelector(".matched > .nodeLabel > .nodeName")
  ).toHaveTextContent("snippet-test");
});
