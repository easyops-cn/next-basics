// istanbul ignore file: nothing logical except calling html2canvas.
import { resizeScreenshot } from "./resizeScreenshot";

export async function capture(
  maxWidth: number,
  maxHeight: number
): Promise<string> {
  // `require("crypto").createHash("sha1").update(packageName).digest("hex").substr(0, 4)`
  // returns "a39e" when `packageName` is "next-previewer".
  const html2canvas = (
    await import(
      /* webpackChunkName: "chunks/html2canvas.a39e" */
      "html2canvas"
    )
  ).default;
  const sourceCanvas = await html2canvas(document.body, {
    logging: true,
    scale: 1,
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const targetCanvas = document.createElement("canvas");
  return resizeScreenshot(sourceCanvas, targetCanvas, maxWidth, maxHeight);
}
