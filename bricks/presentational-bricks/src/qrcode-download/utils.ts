/**
 *  转换成 Base64 字符串
 * @param dataUrl
 * @returns  string
 */
export function transformToBase64(dataUrl: string): string {
  if (typeof dataUrl !== "string") return "";
  const idx = dataUrl.indexOf("base64,") + "base64,".length;
  return dataUrl.substring(idx);
}
