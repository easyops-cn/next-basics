import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { WorkbenchMiniActionBar } from "./WorkbenchMiniActionBar";
import { WorkbenchActionsContext } from "./WorkbenchActionsContext";

test("WorkbenchMiniActionBar with no actions", () => {
  const { container } = render(<WorkbenchMiniActionBar />);
  expect(container.children.length).toBe(0);
});

test("WorkbenchMiniActionBar with actions", () => {
  const onActionClick = jest.fn();
  const { getAllByRole } = render(
    <WorkbenchActionsContext.Provider
      value={{
        actions: [
          {
            action: "add",
            icon: {
              lib: "antd",
              theme: "outlined",
              icon: "plus",
            },
          },
          {
            action: "delete",
            icon: {
              lib: "antd",
              theme: "outlined",
              icon: "minus",
            },
            if: "<% DATA.type === 'testing' %>",
          },
          {
            action: "move-up",
            icon: {
              lib: "antd",
              theme: "outlined",
              icon: "arrow-up",
            },
            if: "<% DATA.type !== 'testing' %>",
          },
        ],
        onActionClick,
      }}
    >
      <WorkbenchMiniActionBar data={{ type: "production" }} />
    </WorkbenchActionsContext.Provider>
  );

  expect(getAllByRole("button").length).toBe(2);

  expect(onActionClick).toBeCalledTimes(0);
  fireEvent.click(getAllByRole("button")[0]);
  expect(onActionClick).toHaveBeenNthCalledWith(1, {
    action: "add",
    data: { type: "production" },
  });

  expect(onActionClick).toBeCalledTimes(1);
  fireEvent.click(getAllByRole("button")[1]);
  expect(onActionClick).toHaveBeenNthCalledWith(2, {
    action: "move-up",
    data: { type: "production" },
  });

  fireEvent.mouseDown(getAllByRole("button")[0]);
});
