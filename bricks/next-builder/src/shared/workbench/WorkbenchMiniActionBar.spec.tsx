import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { WorkbenchMiniActionBar } from "./WorkbenchMiniActionBar";
import { WorkbenchActionsContext } from "./WorkbenchActionsContext";

test("WorkbenchMiniActionBar with no actions", () => {
  const { container } = render(<WorkbenchMiniActionBar />);
  expect(container.children.length).toBe(0);
});

test("WorkbenchMiniActionBar with actions", () => {
  const onActionClick = jest.fn();
  render(
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

  expect(screen.getAllByRole("button").length).toBe(2);

  expect(onActionClick).toBeCalledTimes(0);
  fireEvent.click(screen.getAllByRole("button")[0]);
  expect(onActionClick).toHaveBeenNthCalledWith(1, {
    action: "add",
    data: { type: "production" },
  });

  expect(onActionClick).toBeCalledTimes(1);
  fireEvent.click(screen.getAllByRole("button")[1]);
  expect(onActionClick).toHaveBeenNthCalledWith(2, {
    action: "move-up",
    data: { type: "production" },
  });

  fireEvent.mouseDown(screen.getAllByRole("button")[0]);
});

test("WorkbenchMiniActionBar with actions for moving first node", () => {
  const onActionClick = jest.fn();
  render(
    <WorkbenchActionsContext.Provider
      value={{
        actions: [
          {
            action: "move-up",
            icon: {
              lib: "antd",
              theme: "outlined",
              icon: "arrow-up",
            },
          },
          {
            action: "move-down",
            icon: {
              lib: "antd",
              theme: "outlined",
              icon: "arrow-down",
            },
          },
        ],
        onActionClick,
      }}
    >
      <WorkbenchMiniActionBar data={{ type: "production" }} isFirst />
    </WorkbenchActionsContext.Provider>
  );

  expect(screen.getAllByRole("button")[0].classList.contains("disabled")).toBe(
    true
  );
  expect(screen.getAllByRole("button")[1].classList.contains("disabled")).toBe(
    false
  );

  fireEvent.click(screen.getAllByRole("button")[0]);
  expect(onActionClick).toBeCalledTimes(0);

  fireEvent.click(screen.getAllByRole("button")[1]);
  expect(onActionClick).toBeCalledTimes(1);
});

test("WorkbenchMiniActionBar with actions for moving last node", () => {
  const onActionClick = jest.fn();
  render(
    <WorkbenchActionsContext.Provider
      value={{
        actions: [
          {
            action: "move-up",
            icon: {
              lib: "antd",
              theme: "outlined",
              icon: "arrow-up",
            },
          },
          {
            action: "move-down",
            icon: {
              lib: "antd",
              theme: "outlined",
              icon: "arrow-down",
            },
          },
        ],
        onActionClick,
      }}
    >
      <WorkbenchMiniActionBar data={{ type: "production" }} isLast />
    </WorkbenchActionsContext.Provider>
  );

  expect(screen.getAllByRole("button")[0].classList.contains("disabled")).toBe(
    false
  );
  expect(screen.getAllByRole("button")[1].classList.contains("disabled")).toBe(
    true
  );

  fireEvent.click(screen.getAllByRole("button")[0]);
  expect(onActionClick).toBeCalledTimes(1);

  fireEvent.click(screen.getAllByRole("button")[1]);
  expect(onActionClick).toBeCalledTimes(1);
});

test("WorkbenchMiniActionBar with hidden actions", () => {
  render(
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
        ],
        actionsHidden: true,
      }}
    >
      <WorkbenchMiniActionBar />
    </WorkbenchActionsContext.Provider>
  );
  expect(screen.queryByRole("button")).toBe(null);
});
