export async function getBroadcastChannelPolyfill(): Promise<
  typeof BroadcastChannel
> {
  if (window.BroadcastChannel) {
    return window.BroadcastChannel;
  }
  return (
    // `require("crypto").createHash("sha1").update(packageName).digest("hex").substr(0, 4)`
    // returns "d988" when `packageName` is "utils".
    (
      await import(
        /* webpackChunkName: "chunks/broadcast-channel.d988" */
        "broadcast-channel"
      )
    ).BroadcastChannel as unknown as typeof BroadcastChannel
  );
}
