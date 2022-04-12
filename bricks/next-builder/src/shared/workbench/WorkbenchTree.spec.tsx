import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { WorkbenchTree } from "./WorkbenchTree";
import {
  ContextOfWorkbenchTree,
  WorkbenchTreeContext,
} from "./WorkbenchTreeContext";

test("WorkbenchTree with no nodes", () => {
  const { container } = render(
    <WorkbenchTree
      nodes={[]}
      placeholder="No nodes"
      searchPlaceholder="Search"
    />
  );
  expect(container.querySelector(".placeholder")?.textContent).toBe("No nodes");
  expect(container.querySelector(".searchBox")).toBe(null);
});

test("WorkbenchTree with nodes", async () => {
  const onMouseEnter = jest.fn();
  const onMouseLeave = jest.fn();
  const onContextMenu = jest.fn();
  const mouseEnterFactory: ContextOfWorkbenchTree["mouseEnterFactory"] =
    (node) => () =>
      onMouseEnter(node.key);
  const mouseLeaveFactory: ContextOfWorkbenchTree["mouseLeaveFactory"] =
    (node) => () =>
      onMouseLeave(node.key);
  const contextMenuFactory: ContextOfWorkbenchTree["contextMenuFactory"] =
    (node) => (e) =>
      onContextMenu(node.key, e);
  const { container, getByPlaceholderText } = render(
    <WorkbenchTreeContext.Provider
      value={{
        activeKey: 1,
        hoverKey: 2,
        basePaddingLeft: 5,
        matchNode(node, q) {
          return node.name.includes(q);
        },
        showMatchedNodeOnly: true,
        mouseEnterFactory,
        mouseLeaveFactory,
        contextMenuFactory,
      }}
    >
      <WorkbenchTree
        nodes={[
          {
            key: 1,
            name: "n-1",
          },
          {
            key: 2,
            name: "n-2",
          },
          {
            key: 3,
            name: "n-3",
            children: [
              {
                key: "4",
                name: "n-4",
              },
            ],
          },
        ]}
        placeholder="No nodes"
        searchPlaceholder="Search"
      />
    </WorkbenchTreeContext.Provider>
  );
  expect(container.querySelector(".placeholder")).toBe(null);
  expect(container.querySelector(".searchBox")).toBeTruthy();

  const rootTree = container.querySelector(".tree");
  const firstLevelLinks = [...rootTree.children].map((child) =>
    child.querySelector(".nodeLabelRow")
  ) as HTMLElement[];
  expect(firstLevelLinks.length).toBe(3);
  expect(firstLevelLinks[0].classList.contains("active")).toBe(true);
  expect(firstLevelLinks[0].classList.contains("hover")).toBe(false);
  expect(firstLevelLinks[1].classList.contains("active")).toBe(false);
  expect(firstLevelLinks[1].classList.contains("hover")).toBe(true);
  expect(firstLevelLinks[2].classList.contains("active")).toBe(false);
  expect(firstLevelLinks[2].classList.contains("hover")).toBe(false);
  expect(
    (firstLevelLinks[2].querySelector(".nodeLabel") as HTMLElement).style
      .paddingLeft
  ).toEqual("15px");
  expect(
    (
      (firstLevelLinks[2].nextSibling as HTMLElement).querySelector(
        ".nodeLabel"
      ) as HTMLElement
    ).style.paddingLeft
  ).toEqual("25px");

  expect(onMouseEnter).not.toBeCalled();
  fireEvent.mouseEnter(firstLevelLinks[1]);
  expect(onMouseEnter).toBeCalledWith(2);

  expect(onMouseLeave).not.toBeCalled();
  fireEvent.mouseLeave(firstLevelLinks[1]);
  expect(onMouseLeave).toBeCalledWith(2);

  expect(onContextMenu).not.toBeCalled();
  fireEvent.contextMenu(
    firstLevelLinks[1],
    new MouseEvent("contextmenu", { clientX: 10, clientY: 20 })
  );
  expect(onContextMenu).toBeCalledWith(2, expect.anything());

  fireEvent.change(getByPlaceholderText("Search"), { target: { value: "4" } });
  expect(rootTree.children.length).toBe(1);
  expect(
    (rootTree.firstChild as HTMLElement).querySelector(".nodeName").textContent
  ).toBe("n-3");
  expect(
    (rootTree.firstChild as HTMLElement)
      .querySelector(".nodeLabelRow")
      .classList.contains("matched")
  ).toBe(false);
  expect(
    (rootTree.firstChild as HTMLElement)
      .querySelector(".tree")
      .querySelector(".nodeName").textContent
  ).toBe("n-4");
  expect(
    (rootTree.firstChild as HTMLElement)
      .querySelector(".tree")
      .querySelector(".nodeLabelRow")
      .classList.contains("matched")
  ).toBe(false);
});
