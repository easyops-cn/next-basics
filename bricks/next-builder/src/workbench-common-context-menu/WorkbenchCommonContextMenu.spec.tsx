import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import {
  ContextMenuItem,
  WorkbenchCommonContextMenu,
} from "./WorkbenchCommonContextMenu";
import { BuilderContextMenuStatus } from "@next-core/editor-bricks-helper";

describe("WorkbenchCommonContextMenu", () => {
  it("should work", () => {
    const contextMenuStatus: BuilderContextMenuStatus = {
      active: true,
      node: {
        type: "brick",
        brick: "my-brick",
        id: "b-1",
      },
      x: 10,
      y: 20,
    };
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
    const { container, rerender } = render(
      <WorkbenchCommonContextMenu
        contextMenuStatus={contextMenuStatus}
        menu={menu}
      />
    );
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
  });
});
