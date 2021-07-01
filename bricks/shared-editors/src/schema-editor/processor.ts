import { EditorTitleProps } from "./interfaces";

export function getGridTemplateColumns(titleList: EditorTitleProps[]): string {
  return titleList.reduce(
    (str, item) => (str += (item.width ?? "1fr") + " "),
    ""
  );
}

export function calcItemPosition(arr: string[]): string[] {
  const path: string[] = [];

  arr?.forEach((e) => {
    path.push(e);
    path.push("fields");
  });

  path.pop();

  return path;
}
