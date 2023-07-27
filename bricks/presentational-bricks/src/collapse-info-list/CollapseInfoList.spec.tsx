import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { CollapseInfoList } from "./CollapseInfoList";

describe("CollapseInfoList", () => {
  it("should work", () => {
    render(
      <CollapseInfoList
        dataSource={[
          {
            title: "info1",
            key: "key1",
            detail: "detail",
          },
          {
            title: "info2",
            key: "key2",
            detail: "detail2",
          },
        ]}
        titleBrick={{
          useBrick: {
            brick: "span",
            properties: {
              textContent: "info-brick-title",
            },
          },
        }}
      />
    );
    expect(screen.getByText("info1")).toBeTruthy();
  });
});
