import { brickMap } from "./brickMap";
import { omit, isEmpty } from "lodash";
import walk from "../utils/walk";
import { pipes } from "@next-core/pipes";
import { NodeDetail } from "./UpdateBricksArrange";

export function UpdateBricksToV3(graphData: pipes.GraphData): NodeDetail[] {
  const list: Array<NodeDetail> = [];
  const mountPointMap = new Map<string, string>();
  function update(route: Array<NodeDetail>): NodeDetail[] {
    route.forEach((node) => {
      const matchV3Brick: Record<string, any> = brickMap[node.brick];
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
            ? Object.fromEntries(
                Object.entries(data).map(([k, v]) => {
                  if (typeof matchV3Brick[key]?.[k] === "string") {
                    return [matchV3Brick[key][k], v];
                  } else if (typeof matchV3Brick[key]?.[k] === "function") {
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
          const matchV3Brick: Record<string, any> = brickMap[node.brick];
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

        const newData = replaceSingleNode(
          omit(
            {
              ...node,
              properties,
              events,
              lifeCycle,
            },
            ["children"]
          )
        );

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
        const obj = Object.fromEntries(
          Object.entries(newData)
            .filter(([_, v]) => !isEmpty(v))
            .map(([k, v]) => {
              if (["properties", "events", "lifeCycle"].includes(k)) {
                return [k, JSON.stringify(v)];
              }
              return [k, v];
            })
        );
        list.push({
          _object_id: node._object_id,
          instanceId: node.instanceId,
          brick: matchV3Brick?.brick,
          ...obj,
          mountPoint: mountPointMap.get(node.instanceId) ?? node.mountPoint,
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
