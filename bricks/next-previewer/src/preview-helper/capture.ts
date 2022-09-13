// istanbul ignore file: nothing logical except calling html2canvas.
import { resizeScreenshot } from "./resizeScreenshot";

function getCanvasBlob(canvas: HTMLCanvasElement): Promise<Blob> {
  return new Promise(function (resolve) {
    canvas.toBlob(function (blob: Blob) {
      resolve(blob);
    });
  });
}

export async function capture(
  maxWidth: number,
  maxHeight: number
): Promise<Blob> {
  // `require("crypto").createHash("sha1").update(packageName).digest("hex").substr(0, 4)`
  // returns "a39e" when `packageName` is "next-previewer".
  const html2canvas = (
    await import(
      /* webpackChunkName: "chunks/html2canvas.a39e" */
      "html2canvas"
    )
  ).default;
  const sourceCanvas = await html2canvas(document.body, {
    logging: false,
    scale: 1,
    width: window.innerWidth,
    height: window.innerHeight,
    foreignObjectRendering: true,
  });
  const targetCanvas = document.createElement("canvas");
  resizeScreenshot(sourceCanvas, targetCanvas, maxWidth, maxHeight);
  const blob = await getCanvasBlob(targetCanvas);
  return blob;
}
