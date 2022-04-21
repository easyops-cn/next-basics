import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import {
  useBuilderContextMenuStatus,
  useBuilderDataManager,
} from "@next-core/editor-bricks-helper";
import { ContextMenuItem, WorkbenchContextMenu } from "./WorkbenchContextMenu";
import { useCanPaste } from "../builder-container/BuilderContextMenu/useCanPaste";

jest.mock("@next-core/editor-bricks-helper");
jest.mock("../builder-container/BuilderContextMenu/useCanPaste");

const mockedUseBuilderContextMenuStatus =
  useBuilderContextMenuStatus as jest.MockedFunction<
    typeof useBuilderContextMenuStatus
  >;
const manager = {
  contextMenuChange: jest.fn(),
};
(useBuilderDataManager as jest.Mock).mockReturnValue(manager);

(useCanPaste as jest.MockedFunction<typeof useCanPaste>).mockReturnValue(
  (clipboard, node) => node?.id === "b-2"
);

// Antd <Menu> produces errors too many.
jest.spyOn(console, "error").mockImplementation();

test("WorkbenchTree with no menu", () => {
  mockedUseBuilderContextMenuStatus.mockReturnValue({
    active: false,
  });
  const { container } = render(<WorkbenchContextMenu menu={[]} />);
  expect(
    (container.querySelector(".menuWrapper") as HTMLElement).style.display
  ).toBe("none");
  expect(screen.queryByRole("menu")).toBe(null);
});

test("WorkbenchTree with menu", () => {
  mockedUseBuilderContextMenuStatus.mockReturnValue({
    active: true,
    node: {
      type: "brick",
      brick: "my-brick",
      id: "b-1",
    },
    x: 10,
    y: 20,
  });
  const menu: ContextMenuItem[] = [
    {
      action: "add",
      text: "Add",
      disabled: false,
    },
    {
      divider: true,
    },
    {
      action: "paste",
      text: "Paste",
    },
    {
      action: "clear-clipboard",
      text: "Clear clipboard",
    },
    {
      action: "delete",
      text: "Delete",
      if: "<% DATA.type === 'template' %>",
    },
    {
      action: "remove",
      text: "Remove",
      if: "<% DATA.type !== 'template' %>",
    },
  ];
  const { container, rerender } = render(<WorkbenchContextMenu menu={menu} />);
  expect(
    (container.querySelector(".menuWrapper") as HTMLElement).style.display
  ).toBe("block");
  expect(screen.getAllByRole("menu")).toHaveLength(1);
  expect(screen.getAllByRole("menuitem")).toHaveLength(4);
  expect(screen.getAllByRole("separator")).toHaveLength(1);
  expect(screen.getByRole("menu").children[1]).toBe(
    screen.getByRole("separator")
  );
  expect(screen.getByRole("menu").style.left).toBe("10px");
  expect(screen.getByRole("menu").style.top).toBe("20px");

  expect(screen.getAllByRole("menuitem")[0]).toHaveTextContent("Add");
  expect(screen.getAllByRole("menuitem")[0]).not.toHaveAttribute(
    "aria-disabled",
    "true"
  );

  expect(screen.getAllByRole("menuitem")[1]).toHaveTextContent("Paste");
  expect(screen.getAllByRole("menuitem")[1]).toHaveAttribute(
    "aria-disabled",
    "true"
  );

  expect(screen.getAllByRole("menuitem")[2]).toHaveTextContent(
    "Clear clipboard"
  );
  expect(screen.getAllByRole("menuitem")[2]).toHaveAttribute(
    "aria-disabled",
    "true"
  );

  expect(screen.getAllByRole("menuitem")[3]).toHaveTextContent("Remove");
  expect(screen.getAllByRole("menuitem")[3]).not.toHaveAttribute(
    "aria-disabled",
    "true"
  );

  mockedUseBuilderContextMenuStatus.mockReturnValue({
    active: true,
    node: {
      type: "brick",
      brick: "my-brick",
      id: "b-2",
    },
    x: -10,
    y: -20,
  });

  const onActionClick = jest.fn();
  rerender(
    <WorkbenchContextMenu
      menu={menu}
      clipboard={{ nodeAlias: "another-brick" } as any}
      onActionClick={onActionClick}
    />
  );

  expect(screen.getByRole("menu").style.left).toBe("-10px");
  expect(screen.getByRole("menu").style.top).toBe("-20px");

  expect(screen.getAllByRole("menuitem")[1]).toHaveTextContent(
    "Paste(another-brick)"
  );
  expect(screen.getAllByRole("menuitem")[1]).not.toHaveAttribute(
    "aria-disabled",
    "true"
  );

  expect(screen.getAllByRole("menuitem")[2]).toHaveTextContent(
    "Clear clipboard"
  );
  expect(screen.getAllByRole("menuitem")[2]).not.toHaveAttribute(
    "aria-disabled",
    "true"
  );

  fireEvent.click(screen.getAllByRole("menuitem")[0]);
  expect(onActionClick).toBeCalledTimes(1);
  expect(onActionClick).toHaveBeenNthCalledWith(1, {
    action: "add",
    data: {
      type: "brick",
      brick: "my-brick",
      id: "b-2",
    },
  });
  expect(manager.contextMenuChange).toBeCalledTimes(1);
  expect(manager.contextMenuChange).toHaveBeenNthCalledWith(1, {
    active: false,
  });

  fireEvent.click(screen.getAllByRole("menuitem")[1]);
  expect(onActionClick).toBeCalledTimes(2);
  expect(onActionClick).toHaveBeenNthCalledWith(2, {
    action: "paste",
    data: {
      type: "brick",
      brick: "my-brick",
      id: "b-2",
    },
    clipboard: {
      nodeAlias: "another-brick",
    },
  });
  expect(manager.contextMenuChange).toBeCalledTimes(2);
});
