import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { WorkbenchBrickContextMenu } from "./WorkbenchBrickContextMenu";
import { useCanPaste } from "../builder-container/BuilderContextMenu/useCanPaste";
import {
  useBuilderContextMenuStatus,
  useBuilderDataManager,
} from "@next-core/editor-bricks-helper";

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

describe("WorkbenchBrickContextMenu", () => {
  it("should work", () => {
    mockedUseBuilderContextMenuStatus.mockReturnValue({
      active: false,
    });
    const wrapper = render(<WorkbenchBrickContextMenu menu={[]} />);
    expect(wrapper).toBeTruthy();
  });
});
