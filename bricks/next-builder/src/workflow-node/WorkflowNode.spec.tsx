import React, { createRef } from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { prettyDOM } from "@testing-library/dom";
import "@testing-library/jest-dom";
import { WorkflowNode, WorkFlowNodeRef } from "./WorkflowNode";
import { MenuIcon } from "@next-core/brick-types";

describe("WorkflowNode", () => {
  it("should work", async () => {
    const props = {
      header: "start",
      icon: {
        lib: "antd",
        icon: "run",
        theme: "outlined",
      } as MenuIcon,
      statusStyle: {
        hover: {
          background: "red",
        },
        active: {
          background: "blue",
        },
      },
      descUseBrick: {
        useBrick: [
          {
            brick: "div",
            properties: {
              textContent: "test",
            },
          },
        ],
      },
      contentItemActions: {
        useBrick: [
          {
            brick: "presentational-bricks.general-label",
            properties: {
              text: "添加",
            },
          },
        ],
      },
    };

    const ref = createRef<WorkFlowNodeRef>();
    const { container } = render(<WorkflowNode {...props} ref={ref} />);

    expect(screen.getByText("start")).toBeInTheDocument();

    const node = container.getElementsByClassName("container")[0];

    expect(node).toHaveClass("hasDesc");

    fireEvent.mouseEnter(node);

    expect(node).toHaveStyle({ background: "red" });

    fireEvent.mouseLeave(node);

    expect(node).not.toHaveStyle({ background: "red" });

    ref.current.setActive(true);
    expect(node).toHaveStyle({ background: "blue" });
  });
});
