import { createProviderClass } from "@next-core/brick-utils";
import { saveAs } from "file-saver";

export function CustomDownloadFile(
  dataURI: string,
  filename: string,
  options: Record<string, any> = {}
): void {
  const { mediaType } = options;

  const byteString = window.atob(dataURI);
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);

  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  const blob = new Blob([ia], { type: mediaType });

  saveAs(blob, filename);
}

customElements.define(
  "flow-builder.provider-custom-download-file",
  createProviderClass(CustomDownloadFile)
);
