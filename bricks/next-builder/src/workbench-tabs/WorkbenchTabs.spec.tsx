import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { WorkbenchTabConf, WorkbenchTabs } from "./WorkbenchTabs";

test("WorkbenchTabs with empty tabs", () => {
  render(<WorkbenchTabs />);
  expect(screen.queryAllByRole("menuitem")).toHaveLength(0);
});

test("WorkbenchTabs should work", () => {
  const onTabClick = jest.fn();
  const onTabClose = jest.fn();
  const tabs: WorkbenchTabConf[] = [
    {
      key: 1,
      name: "First",
      icon: {
        lib: "antd",
        theme: "outlined",
        icon: "file",
      },
    },
    {
      key: 2,
      name: "Second",
      icon: {
        lib: "text",
        icon: "TS",
        color: "cyan",
      },
    },
  ];
  const { rerender } = render(
    <WorkbenchTabs
      tabs={tabs}
      activeTabKey={1}
      onTabClick={onTabClick}
      onTabClose={onTabClose}
    />
  );

  expect(screen.queryAllByRole("menuitem")).toHaveLength(2);
  expect(screen.queryAllByRole("menuitem")[0]).toHaveClass("active");
  expect(screen.queryAllByRole("menuitem")[1]).not.toHaveClass("active");
  expect(screen.getByText("TS", { selector: ".textIcon" }).style.color).toBe(
    "cyan"
  );
  expect(document.querySelector(".modifiedIcon")).toBe(null);
  expect(screen.queryAllByRole("button")).toHaveLength(2);

  expect(onTabClick).toBeCalledTimes(0);
  fireEvent.click(screen.queryAllByRole("menuitem")[1]);
  expect(onTabClick).toBeCalledTimes(1);
  expect(onTabClick).toHaveBeenNthCalledWith(
    1,
    expect.objectContaining({ key: 2 })
  );

  expect(screen.queryAllByRole("menuitem")[0]).not.toHaveClass("active");
  expect(screen.queryAllByRole("menuitem")[1]).toHaveClass("active");

  expect(onTabClose).toBeCalledTimes(0);
  fireEvent.click(screen.queryAllByRole("button")[1]);
  expect(onTabClose).toBeCalledTimes(1);
  expect(onTabClose).toHaveBeenNthCalledWith(
    1,
    expect.objectContaining({ key: 2 })
  );

  // Mark history blocked.
  rerender(
    <WorkbenchTabs
      tabs={tabs}
      activeTabKey={1}
      onTabClick={onTabClick}
      onTabClose={onTabClose}
      historyBlocked
    />
  );

  expect(screen.queryAllByRole("menuitem")[0]).not.toHaveClass("active");
  expect(screen.queryAllByRole("menuitem")[1]).toHaveClass("active");
  expect(
    screen.queryAllByRole("menuitem")[0].querySelector(".modifiedIcon")
  ).toBe(null);
  expect(
    screen.queryAllByRole("menuitem")[1].querySelector(".modifiedIcon")
  ).not.toBe(null);

  expect(onTabClick).toBeCalledTimes(1);
  fireEvent.click(screen.queryAllByRole("menuitem")[0]);
  expect(onTabClick).toBeCalledTimes(2);

  // Active tab and modified icon are not changed when switching tab while history blocked.
  expect(screen.queryAllByRole("menuitem")[0]).not.toHaveClass("active");
  expect(screen.queryAllByRole("menuitem")[1]).toHaveClass("active");
  expect(
    screen.queryAllByRole("menuitem")[0].querySelector(".modifiedIcon")
  ).toBe(null);
  expect(
    screen.queryAllByRole("menuitem")[1].querySelector(".modifiedIcon")
  ).not.toBe(null);

  // Let `setTimeout` to work.
  jest.runAllTimers();
});
