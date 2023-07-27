import { pick } from "lodash";

export function arrayPick<T, P extends keyof T>(
  list: T[],
  props: P[]
): Pick<T, P>[] {
  return list?.map<Pick<T, P>>((item) => pick(item, props) as Pick<T, P>);
}
