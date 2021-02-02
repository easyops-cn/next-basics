import { ItemProps } from "./BrickTimeline";
import { groupBy } from "lodash";
import moment from "moment";

export function groupByMoth(
  list: ItemProps[] = []
): Array<{ groupName: string; list: ItemProps[] }> {
  const category = groupBy(list, item => moment(item.time).format("YYYY-MM"));

  return Object.entries(category).map(([key, list]) => ({
    groupName: key,
    list
  }));
}
