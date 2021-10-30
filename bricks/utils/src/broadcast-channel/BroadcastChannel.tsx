import React, {
  forwardRef,
  Ref,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";

export interface BroadcastChannelProps {
  channelName: string;
  onMessage: (data: unknown) => void;
}

export function LegacyBroadcastChannel(
  { channelName, onMessage }: BroadcastChannelProps,
  ref: Ref<Pick<BroadcastChannel, "postMessage">>
): React.ReactElement {
  const channelRef = useRef<BroadcastChannel>();

  useImperativeHandle(ref, () => ({
    postMessage(message: unknown) {
      channelRef.current?.postMessage(message);
    },
  }));

  useEffect(() => {
    const currentChannel = (channelRef.current = channelName
      ? new BroadcastChannel(channelName)
      : null);
    return () => {
      currentChannel?.close();
    };
  }, [channelName]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent): void => {
      if (event.origin === location.origin) {
        onMessage(event.data);
      }
    };
    const currentChannel = channelRef.current;
    currentChannel?.addEventListener("message", handleMessage);
    return () => {
      currentChannel?.removeEventListener("message", handleMessage);
    };
  }, [onMessage]);

  return null;
}

export const BroadcastChannelComponent = forwardRef(LegacyBroadcastChannel);
