import React, { createRef, useRef } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MultipleFilesForm, processFileData } from "./MultipleFilesForm";

describe("MultipleFilesForm", () => {
  it("should work", async () => {
    render(<MultipleFilesForm fieldList={[{ name: "file", type: "file" }]} />);

    expect(screen.getByText("upload")).toBeInTheDocument();
  });

  it("should work with files array", async () => {
    const mockFinishFn = jest.fn();
    const ref = createRef();
    render(
      <MultipleFilesForm
        fieldList={[{ name: "file", type: "file[]" }]}
        onFinish={mockFinishFn}
        ref={ref}
      />
    );
    fireEvent.submit(screen.getByTestId("files-form"));
    await (global as any).flushPromises();

    expect(mockFinishFn).toHaveBeenCalled();
  });
});

describe("processFileData", () => {
  it.each([
    [
      {
        files: undefined,
      },
      {},
    ],
    [
      {
        files: {
          fileList: [
            {
              name: "2.jpg",
            },
          ],
        },
      },
      {
        files: [
          {
            name: "2.jpg",
          },
        ],
      },
    ],
  ])("should work", (data, result) => {
    expect(processFileData(data)).toEqual(result);
  });
});
