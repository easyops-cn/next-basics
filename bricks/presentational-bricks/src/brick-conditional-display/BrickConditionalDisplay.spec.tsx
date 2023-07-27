import React from "react";
import { render } from "@testing-library/react";

import { BrickConditionalDisplay } from "./BrickConditionalDisplay";

describe("BrickConditionalDisplay", () => {
  it("should work", () => {
    const value = "130";
    const rules = [
      {
        condition: {
          $lt: 60
        },
        style: {
          backgroundColor: "rgba(252, 80, 67, 1)",
          color: "rgba(255, 255, 255, 1)"
        },
        label: "不及格"
      },
      {
        condition: {
          $gte: 60,
          $lt: 80
        },
        style: {
          backgroundColor: "rgba(255, 162, 53, 1)",
          color: "rgba(255, 255, 255, 1)"
        },
        label: "及格"
      },
      {
        condition: {
          $gte: 80,
          $lt: 90
        },
        style: {
          backgroundColor: "rgba(47, 194, 91, 1)",
          color: "rgba(255, 255, 255, 1)"
        },
        label: "良好"
      },
      {
        condition: {
          $gte: 90
        },
        style: {
          backgroundColor: "rgba(22, 123, 224, 1)",
          color: "rgba(255, 255, 255, 1)"
        },
        label: "优秀"
      }
    ];

    const result = render(
      <BrickConditionalDisplay
        data={100}
        value={value}
        rules={rules}
        type="label"
      />
    );
    const asFragment = result.asFragment;
    expect(asFragment()).toMatchSnapshot();
  });
});
