import { brickMap } from "./brickMap";
import { isEmpty, omit } from "lodash";
import walk from "../utils/walk";
import { pipes } from "@next-core/pipes";
import { NodeDetail } from "./UpdateBricksArrange";
import { hasOwnProperty } from "@next-core/brick-utils";

export function UpdateBricksToV3(graphData: pipes.GraphData): NodeDetail[] {
  const list: Array<NodeDetail> = [];
  const mountPointMap = new Map<string, string>();
  const getBrick = (brick: string) =>
    hasOwnProperty(brickMap, brick) ? brickMap[brick] : null;
  function update(route: Array<NodeDetail>): NodeDetail[] {
    route.forEach((node) => {
      const matchV3Brick = getBrick(node.brick);
      if (matchV3Brick) {
        const properties = node.properties ? JSON.parse(node.properties) : {};
        const events = node.events ? JSON.parse(node.events) : {};
        const lifeCycle = node.lifeCycle ? JSON.parse(node.lifeCycle) : {};

        const replaceNode = (
          data: Record<string, unknown>,
          key: string,
          matchV3Brick: Record<string, any>
        ): Record<string, unknown> => {
          return data
            ? mergeFromEntries(
                Object.entries(data).map(([k, v]) => {
                  const matchItem = hasOwnProperty(matchV3Brick, key)
                    ? matchV3Brick[key]?.[k]
                    : null;
                  if (typeof matchItem === "string") {
                    return [matchV3Brick[key][k], v];
                  } else if (typeof matchItem === "function") {
                    return matchV3Brick[key][k](v);
                  }
                  // eslint-disable-next-line @typescript-eslint/no-use-before-define
                  typeof v === "object" && (v = replace(v));
                  return [k, v];
                })
              )
            : undefined;
        };

        const replaceSingleNode = (node: Record<string, any>) => {
          const matchV3Brick = getBrick(node.brick);
          if (matchV3Brick) {
            const properties = Object.assign(
              replaceNode(node.properties, "properties", matchV3Brick) || {},
              replaceNode(node.transform, "properties", matchV3Brick) || {}
            );
            return {
              ...node,
              brick: matchV3Brick.brick,
              properties: properties,
              events: replaceNode(node.events, "events", matchV3Brick),
              lifeCycle: replaceNode(node.lifeCycle, "lifeCycle", matchV3Brick),
              transfrom: undefined,
              // UseBrick slots not change
              // slots: {}
            };
          }
          return node;
        };

        const replace = (data: Record<string, any>) => {
          return walk(data, (k, v) => {
            if (k === "useBrick") {
              if (Array.isArray(v)) {
                v.map(replaceSingleNode);
              } else {
                return [k, replaceSingleNode(v)];
              }
            }
          });
        };

        const newData = replaceSingleNode({
          brick: node.brick,
          properties,
          events,
          lifeCycle,
        });

        if (matchV3Brick.slots && node.children?.length) {
          Object.entries(matchV3Brick.slots).forEach(([k, v]) => {
            const slotChild = (
              node.children as Array<Record<string, any>>
            ).filter((child) => child.mountPoint === k);
            slotChild.forEach((slot, index) => {
              let mountPoint;
              if (typeof v === "string") {
                mountPoint = v;
              } else if (typeof v === "function") {
                mountPoint = v(index, newData.properties);
              }
              mountPointMap.set(slot.instanceId, mountPoint);
            });
          });
        }

        const getValue = (data: any, key: string) =>
          hasOwnProperty(newData, key)
            ? isEmpty(data[key])
              ? {}
              : { [key]: JSON.stringify(newData[key]) }
            : "";
        list.push({
          _object_id: node._object_id,
          instanceId: node.instanceId,
          brick: matchV3Brick?.brick,
          mountPoint: mountPointMap.get(node.instanceId) ?? node.mountPoint,
          ...getValue(newData, "properties"),
          ...getValue(newData, "events"),
          ...getValue(newData, "lifeCycle"),
        });
      } else if (mountPointMap.get(node.instanceId)) {
        list.push({
          _object_id: node._object_id,
          instanceId: node.instanceId,
          mountPoint: mountPointMap.get(node.instanceId),
        });
      }

      if (node.children) {
        update(node.children);
      }
    });
    return route;
  }

  const tree = pipes.graphTree(graphData);
  update(tree[0].children);

  return list;
}

function mergeFromEntries(list: Array<[string, any]>) {
  const obj: Record<string, any> = {};
  list.forEach(([key, value]) => {
    if (obj[key]) {
      if (Array.isArray(obj[key])) {
        obj[key] = obj[key].concat(Array.isArray(value) ? value : [value]);
      } else if (typeof obj[key] === "object") {
        Object.assign(obj[key], value);
      } else {
        obj[key] = value;
      }
    } else {
      obj[key] = value;
    }
  });
  return obj;
}
