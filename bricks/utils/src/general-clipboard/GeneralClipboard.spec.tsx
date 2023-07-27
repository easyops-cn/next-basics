import React, { Ref } from "react";
import { mount } from "enzyme";
import { JsonStorage } from "@next-core/brick-utils";
import { GeneralClipboard } from "./GeneralClipboard";
import { act } from "react-dom/test-utils";

jest.mock("@next-core/brick-utils");

const storageKey = "next-builder:visualization";
const items = new Map<string, unknown>([
  [
    storageKey,
    {
      type: "COPY",
      sourceId: "node-1",
    },
  ],
]);

(JsonStorage as jest.Mock).mockImplementation(() => {
  return {
    getItem(key: string) {
      return items.get(key) ?? null;
    },
    setItem(key: string, value: unknown) {
      items.set(key, value);
    },
  };
});

describe("GeneralClipboard", () => {
  it("should work", () => {
    const onClipboardChange = jest.fn();
    const ref: Ref<{ setClipboardImmediately(clipboard: unknown): void }> = {
      current: null,
    };
    mount(
      <GeneralClipboard
        storageKey={storageKey}
        onClipboardChange={onClipboardChange}
        ref={ref}
      />
    );
    expect(onClipboardChange).toBeCalledTimes(1);
    expect(onClipboardChange).toBeCalledWith({
      type: "COPY",
      sourceId: "node-1",
    });

    // Set clipboard to the same data.
    act(() => {
      ref.current.setClipboardImmediately({
        type: "COPY",
        sourceId: "node-1",
      });
    });
    expect(onClipboardChange).toBeCalledTimes(1);

    // Set clipboard to another data.
    act(() => {
      ref.current.setClipboardImmediately({
        type: "CUT",
        sourceInstanceId: "node-1",
      });
    });
    expect(onClipboardChange).toBeCalledTimes(2);
    expect(onClipboardChange).toHaveBeenNthCalledWith(2, {
      type: "CUT",
      sourceInstanceId: "node-1",
    });

    // Set clipboard to undefined.
    act(() => {
      ref.current.setClipboardImmediately(undefined);
    });
    expect(onClipboardChange).toBeCalledTimes(3);
    expect(onClipboardChange).toHaveBeenNthCalledWith(3, null);
  });

  it("should work without storageKey", () => {
    const onClipboardChange = jest.fn();
    const ref: Ref<{ setClipboardImmediately(clipboard: unknown): void }> = {
      current: null,
    };
    mount(
      <GeneralClipboard
        storageKey={null}
        onClipboardChange={onClipboardChange}
        ref={ref}
      />
    );
    expect(onClipboardChange).not.toBeCalled();

    act(() => {
      ref.current.setClipboardImmediately({
        type: "COPY",
        sourceId: "node-1",
      });
    });
    expect(onClipboardChange).toBeCalledTimes(1);
    expect(onClipboardChange).toBeCalledWith({
      type: "COPY",
      sourceId: "node-1",
    });
  });
});
