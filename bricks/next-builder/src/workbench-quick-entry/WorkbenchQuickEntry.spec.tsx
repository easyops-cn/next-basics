import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { createHistory } from "@next-core/brick-kit";
import { WorkbenchQuickEntry } from "./WorkbenchQuickEntry";

createHistory();

const mockData = [
  {
    id: "1",
    name: "访问记录1",
    count: 2,
    visitedAt: "2019-05-17T11:06:20+08:00",
  },
  {
    id: "2",
    name: "访问记录2",
    count: 2,
    visitedAt: "2019-05-17T11:06:20+08:00",
  },
];
jest.mock("@next-libs/visit-history", () => {
  return {
    VisitHistory: jest.fn(() => ({
      latest: jest.fn(() => mockData),
      all: jest.fn(() => mockData),
      remove: jest.fn(() => mockData.splice(0, 1)),
    })),
  };
});

const mockMoreClickFn = jest.fn();

describe("WorkbenchQuickEntry", () => {
  it("should work", () => {
    render(
      <WorkbenchQuickEntry
        entryTitle="快速入口"
        entryList={[
          {
            text: "入口一",
            to: "/page-1",
          },
          {
            text: "入口二",
            to: "/page-2",
            icon: {
              lib: "antd",
              icon: "copy",
              theme: "outlined",
            },
          },
        ]}
      />
    );

    expect(document.querySelector(".title")).toHaveTextContent("快速入口");
    expect(document.querySelectorAll("a").length).toBe(2);
    expect(document.querySelectorAll("a")[0]).toHaveTextContent("入口一");
    expect(document.querySelectorAll("a")[1]).toHaveTextContent("入口二");

    expect(screen.queryByRole("img").dataset.icon).toEqual("copy");
  });

  it("should hidden more button", () => {
    render(
      <WorkbenchQuickEntry
        entryTitle="最近访问"
        showMoreButton
        moreButtonText="更多"
        onMoreButtonClick={mockMoreClickFn}
        history={{
          namespace: "myspace",
          property: "id",
          fields: {
            label: "name",
          },
        }}
      />
    );

    expect(document.querySelectorAll("a").length).toBe(2);
    expect(document.querySelectorAll("a")[0]).toHaveTextContent("访问记录1");
    expect(document.querySelectorAll("a")[1]).toHaveTextContent("访问记录2");

    expect(screen.queryByRole("button")).toHaveTextContent("更多");
    expect(mockMoreClickFn).toBeCalledTimes(0);
    fireEvent.click(screen.queryByRole("button"));
    expect(mockMoreClickFn).toBeCalledTimes(1);
  });

  it("should delete item", () => {
    render(
      <WorkbenchQuickEntry
        entryTitle="最近访问"
        history={{
          namespace: "myspace",
          property: "id",
          fields: {
            label: "name",
            compareSourceProperty: "id",
          },
          compareSource: [
            {
              id: "2",
            },
          ],
        }}
      />
    );

    expect(document.querySelectorAll("a").length).toBe(1);
    expect(document.querySelectorAll("a")[0]).toHaveTextContent("访问记录2");
  });

  it("should show thumbnails", () => {
    render(
      <WorkbenchQuickEntry
        entryTitle="最近"
        showThumbnails
        entryList={[
          {
            text: "一",
            to: "/1",
          },
          {
            text: "二",
            to: "/2",
            thumbnail: "data:image/png;base64",
          },
        ]}
      />
    );

    expect(document.querySelector(".quickEntryWrapper").classList).toContain(
      "showThumbnails"
    );
    expect(screen.queryAllByRole("img")[0].dataset.icon).toEqual("picture");
    expect((screen.queryAllByRole("img")[1] as HTMLImageElement).src).toEqual(
      "data:image/png;base64"
    );
  });
});
