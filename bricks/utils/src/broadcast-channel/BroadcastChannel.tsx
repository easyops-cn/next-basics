import React, {
  forwardRef,
  Ref,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import { getBroadcastChannelPolyfill } from "./polyfill";

export interface BroadcastChannelProps {
  channelName: string;
  onMessage: (data: unknown) => void;
}

export function LegacyBroadcastChannel(
  { channelName, onMessage }: BroadcastChannelProps,
  ref: Ref<Pick<BroadcastChannel, "postMessage">>
): React.ReactElement {
  const channelRef = useRef<BroadcastChannel>();
  const polyfillRef = useRef<typeof BroadcastChannel>();

  useImperativeHandle(ref, () => ({
    postMessage(message: unknown) {
      return channelRef.current?.postMessage(message);
    },
  }));

  useEffect(() => {
    const handleMessage = (event: MessageEvent): void => {
      // When using polyfill, the message event is the message data itself.
      onMessage(window.BroadcastChannel ? event.data : event);
    };
    (async () => {
      polyfillRef.current = await getBroadcastChannelPolyfill();
      channelRef.current = channelName
        ? new polyfillRef.current(channelName)
        : null;
      channelRef.current?.addEventListener("message", handleMessage);
    })();
    return () => {
      channelRef.current?.close();
      channelRef.current?.removeEventListener("message", handleMessage);
    };
  }, [channelName, onMessage]);

  return null;
}

export const BroadcastChannelComponent = forwardRef(LegacyBroadcastChannel);
