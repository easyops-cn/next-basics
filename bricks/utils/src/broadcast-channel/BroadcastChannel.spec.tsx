import React, { Ref } from "react";
import { mount } from "enzyme";
import { SimpleFunction } from "@next-core/brick-types";
import { BroadcastChannelComponent } from "./BroadcastChannel";

jest.mock("./polyfill", () => {
  const channels = new Map<string, Set<any>>();
  class BroadcastChannel {
    messageListeners = new Set<SimpleFunction>();
    private channelName: string;
    constructor(channelName: string) {
      this.channelName = channelName;
      let list = channels.get(channelName);
      if (!list) {
        channels.set(channelName, (list = new Set()));
      }
      list.add(this);
    }
    addEventListener(eventType: string, fn: SimpleFunction): void {
      if (eventType === "message") {
        this.messageListeners.add(fn);
      }
    }
    removeEventListener(eventType: string, fn: SimpleFunction): void {
      if (eventType === "message") {
        this.messageListeners.delete(fn);
      }
    }
    postMessage(data: unknown): void {
      for (const channel of channels.get(this.channelName) ?? []) {
        if (channel !== this) {
          for (const fn of channel.messageListeners) {
            fn({ data });
          }
        }
      }
    }
    close(): void {
      this.messageListeners.clear();
      channels.get(this.channelName).delete(this);
    }
  }
  return {
    getBroadcastChannelPolyfill: () => Promise.resolve(BroadcastChannel),
  };
});

describe("BroadcastChannelComponent", () => {
  it("should work", async () => {
    const channelName = "my-channel";

    const onMessageA = jest.fn();
    const refA: Ref<Pick<BroadcastChannel, "postMessage">> = { current: null };
    mount(
      <BroadcastChannelComponent
        channelName={channelName}
        onMessage={onMessageA}
        ref={refA}
      />
    );

    const onMessageB = jest.fn();
    const refB: Ref<Pick<BroadcastChannel, "postMessage">> = { current: null };
    const wrapperB = mount(
      <BroadcastChannelComponent
        channelName={channelName}
        onMessage={onMessageB}
        ref={refB}
      />
    );

    const onMessageC = jest.fn();
    const refC: Ref<Pick<BroadcastChannel, "postMessage">> = { current: null };
    mount(
      <BroadcastChannelComponent
        channelName="another-channel"
        onMessage={onMessageC}
        ref={refC}
      />
    );

    const onMessageD = jest.fn();
    const refD: Ref<Pick<BroadcastChannel, "postMessage">> = { current: null };
    mount(
      <BroadcastChannelComponent
        channelName={null}
        onMessage={onMessageD}
        ref={refD}
      />
    );

    await (global as any).flushPromises();

    refA.current.postMessage({
      hello: "world",
    });
    expect(onMessageA).not.toBeCalled();
    expect(onMessageB).toBeCalledTimes(1);
    expect(onMessageC).not.toBeCalled();
    expect(onMessageD).not.toBeCalled();

    refA.current.postMessage({
      hello: "better world",
    });
    expect(onMessageB).toBeCalledTimes(2);

    wrapperB.unmount();
    refA.current.postMessage({
      hello: "empty world",
    });
    expect(onMessageB).toBeCalledTimes(2);
  });
});
