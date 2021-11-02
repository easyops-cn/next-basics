import { ItemProps, TimeType } from "./BrickTimeline";
import { groupBy } from "lodash";
import moment from "moment";

export function groupByMoth(
  list: ItemProps[] = [],
  timeType?: TimeType
): Array<{ groupName: string; list: ItemProps[] }> {
  const category = groupBy(list, (item) =>
    moment(timeType === "second" ? item.time * 1000 : item.time).format(
      "YYYY-MM"
    )
  );

  return Object.entries(category).map(([key, list]) => ({
    groupName: key,
    list,
  }));
}
