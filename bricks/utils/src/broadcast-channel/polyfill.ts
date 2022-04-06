export async function getBroadcastChannelPolyfill(): Promise<
  typeof BroadcastChannel
> {
  if (window.BroadcastChannel) {
    return window.BroadcastChannel;
  }
  return (
    await import(
      /* webpackChunkName: "chunks/broadcast-channel.d988" */
      "broadcast-channel"
    )
  ).BroadcastChannel as unknown as typeof BroadcastChannel;
}
