import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { wrapperWorkflowDataItem } from "./wrapperWorkflowDataItem";

describe("wrapperWorkflowDataItem", () => {
  it("should work", () => {
    const TestComponent = (props: any): React.ReactElement => {
      return <div>{props.content}</div>;
    };

    const WrapperComponent = wrapperWorkflowDataItem(TestComponent);

    render(<WrapperComponent name="name" label="名称" content="test" />);

    expect(screen.getByText("test")).toBeInTheDocument();
  });
});
