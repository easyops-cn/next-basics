import {
  BrickLifeCycle,
  ContextConf,
  CustomTemplateProxy,
  CustomTemplateProxyBasicProperty,
  CustomTemplateProxyRefProperty,
  CustomTemplateProxyTransformableProperty,
  CustomTemplateProxyVariableProperty,
  GeneralTransform,
  SelectorProviderResolveConf,
  UseProviderResolveConf,
} from "@next-core/brick-types";
import { createProviderClass } from "@next-core/brick-utils";
import { isEmpty } from "lodash";
import walk from "../utils/walk";

interface NodeDetail {
  instanceId: string;
  properties?: string;
  events?: string;
  lifeCycle?: string;
  context?: Array<ContextConf>;
  mountPoint?: string;
  proxy?: string;
  children?: NodeDetail[];
  ref?: string;
  [key: string]: any;
}

let dataUid = 0;
export function updateRouteOrTemplate(route: Array<NodeDetail>) {
  dataUid = 0;
  const rootNode = route[0];
  const isRoute = rootNode["_object_id"] === "STORYBOARD_ROUTE";
  const list: Array<any> = [];
  let contextList: ContextConf[] = [];
  let refProxy: Record<string, any>;

  if (!isRoute) {
    const result = updateProxy(rootNode);
    if (result) {
      contextList = result.context.concat(contextList);
      refProxy = result.refProxy;
    }
  }

  function updateBricks(route: Array<NodeDetail>): Array<NodeDetail> {
    route.forEach((node) => {
      const newProperties: Record<string, any> = node.properties
        ? JSON.parse(node.properties)
        : {};
      const newEvents: Record<string, any> = node.events
        ? JSON.parse(node.events)
        : {};
      const newLifeCycle: Record<string, any> = node.lifeCycle
        ? JSON.parse(node.lifeCycle)
        : {};
      const mergeProperty = (
        properties: Record<string, any>,
        events: Record<string, any>,
        lifeCycle: Record<string, any>
      ): void => {
        Object.assign(newProperties, properties);
        Object.assign(newEvents, events);
        Object.assign(newLifeCycle, lifeCycle);

        node.properties = JSON.stringify(newProperties);
        node.events = JSON.stringify(newEvents);
        node.lifeCycle = JSON.stringify(newLifeCycle);
      };

      if (!isRoute && refProxy[node.ref]) {
        const result = updateTemplateRefAndAsVarible(node, refProxy);
        if (result) {
          const { properties, events, lifeCycle } = result;
          mergeProperty(properties, events, lifeCycle);
        }
      }

      const resolves = updateUseResolves(node, isRoute ? "CTX" : "STATE");
      if (resolves) {
        const { lifeCycle, context, properties } = resolves;
        mergeProperty(properties, {}, lifeCycle);
        contextList = contextList.concat(context);
      }

      const useBrickTransfromData = replaceUseBrickTransform(node);
      mergeProperty(
        useBrickTransfromData.properties,
        useBrickTransfromData.events,
        useBrickTransfromData.lifeCycle
      );

      if (node.context && node.context.length) {
        contextList = contextList.concat(node.context);
      }

      const newProperty = Object.fromEntries(
        Object.entries({
          properties: newProperties,
          events: newEvents,
          lifeCycle: newLifeCycle,
        })
          .filter(([_, v]) => !isEmpty(v))
          .map(([k, v]) => [k, JSON.stringify(v)])
      );
      list.push({
        objectId: node._object_id,
        instanceId: node.instanceId,
        ...newProperty,
        context: null,
      });

      if (node.children) {
        updateBricks(node.children);
      }
    });
    return route;
  }

  updateBricks(rootNode.children);

  if (contextList.length) {
    list.unshift({
      objectId: rootNode._object_id,
      instanceId: rootNode.instanceId,
      context: JSON.stringify(contextList.concat(rootNode.context ?? [])),
    });
  }
  return list;
}

export function updateProxy(node: NodeDetail): Record<string, any> | void {
  const context: ContextConf[] = [];
  const refProxy: Record<string, any> = {};
  const { proxy } = node;
  const parseProxy = JSON.parse(proxy) as CustomTemplateProxy;

  if (!parseProxy.properties) return;
  Object.entries(parseProxy.properties).map(([propsName, proxyItem]) => {
    if ((proxyItem as CustomTemplateProxyRefProperty).ref) {
      const { extraOneWayRefs } = proxyItem as CustomTemplateProxyRefProperty;
      const setRefProxyItem = (item: CustomTemplateProxyRefProperty): void => {
        const refProperty = (item as CustomTemplateProxyBasicProperty)
          .refProperty;
        const refTransform = (item as CustomTemplateProxyTransformableProperty)
          .refTransform;
        if (refProperty) {
          refProxy[item.ref] = {
            ...refProxy[item.ref],
            [refProperty]: `<% "track state", STATE.${propsName} %>`,
          };
        }
        if (refTransform) {
          refProxy[item.ref] = {
            ...refProxy[item.ref],
            ...replaceTransform(refTransform, "STATE", {
              autoInsertContext: false,
            }),
          };
        }
      };
      if (extraOneWayRefs) {
        extraOneWayRefs.forEach((item) => {
          setRefProxyItem(item);
        });
      }
      setRefProxyItem(proxyItem as CustomTemplateProxyRefProperty);
    }
    if ((proxyItem as CustomTemplateProxyVariableProperty).asVariable) {
      context.push({
        name: propsName,
      });
    }
  });
  return {
    context,
    refProxy,
  };
}

export function updateUseResolves(
  node: NodeDetail,
  dataKey: string
): {
  lifeCycle: BrickLifeCycle;
  properties: Record<string, any>;
  context: ContextConf[];
} | void {
  if (!node.lifeCycle) return;
  const lifeCycle = JSON.parse(node.lifeCycle) as BrickLifeCycle;
  const { useResolves } = lifeCycle;
  const context: ContextConf[] = [];
  let undealFlag: boolean;

  const properties: Record<string, any> = node.properties
    ? JSON.parse(node.properties)
    : {};
  if (useResolves?.length) {
    useResolves.forEach((item) => {
      const useProvider =
        (item as UseProviderResolveConf).useProvider ||
        (item as SelectorProviderResolveConf).provider;
      if (useProvider) {
        if (typeof item.transform === "string") {
          Object.assign(properties, {
            [item.transform]: `<% ${dataKey}.DATA${dataUid} %>`,
          });
        } else if (
          Object.prototype.toString.call(item.transform) === "[object Object]"
        ) {
          Object.assign(properties, replaceTransform(item.transform, dataKey));
        } else if (Array.isArray(item.transform)) {
          undealFlag = true;
          return;
        }
        context.push({
          name: `DATA${dataUid}`,
          resolve: {
            useProvider: useProvider.split("\\").join(""),
            args: (item as UseProviderResolveConf).args,
          },
        });
        dataUid++;
      } else {
        undealFlag = true;
      }
    });
    if (undealFlag) return;
    lifeCycle.useResolves = undefined;
    return {
      lifeCycle,
      properties,
      context,
    };
  }
  return;
}

export function updateTemplateRefAndAsVarible(
  node: NodeDetail,
  refProxy: Record<string, any>
): Record<string, any> | void {
  if (refProxy[node.ref]) {
    const newProperties = JSON.parse(
      node.properties?.replace(/(?<=\s)TPL(?!\w)/g, "STATE") ?? "{}"
    );
    const newEvents = JSON.parse(
      node.events?.replace(/(?<=\s)TPL(?!\w)/g, "STATE") ?? "{}"
    );
    const newLifeCycle = JSON.parse(
      node.lifeCycle?.replace(/(?<=\s)TPL(?!\w)/g, "STATE") ?? "{}"
    );

    return {
      properties: Object.assign(newProperties, {
        ...refProxy[node.ref],
      }),
      events: newEvents,
      lifeCycle: newLifeCycle,
    };
  }
  return;
}

export function replaceUseBrickTransform(
  node: NodeDetail
): Record<string, any> {
  const replaceSingleItem = (
    item: Record<string, any>
  ): Record<string, any> => {
    item.properties = Object.assign(
      item?.properties ?? {},
      replaceTransform(item.transform, "DATA", {
        autoInsertContext: false,
      })
    );
    item.transform = undefined;
    return item;
  };

  const walkItem = (item: Record<string, any>) => {
    return walk(item, (k: string, v: any) => {
      if (k === "useBrick") {
        if (Array.isArray(v)) {
          v = v.map((item) => replaceSingleItem(item));
        } else {
          replaceSingleItem(v);
        }
        return [k, v];
      }
    });
  };

  return {
    properties: node.properties ? walkItem(JSON.parse(node.properties)) : {},
    events: node.events ? walkItem(JSON.parse(node.events)) : {},
    lifeCycle: node.lifeCycle ? walkItem(JSON.parse(node.lifeCycle)) : {},
  };
}

function replaceTransform(
  transform: GeneralTransform,
  dataKey: string,
  options = {
    autoInsertContext: true,
  }
): Record<string, any> | void {
  let undealFlag = false;
  const result = Object.fromEntries(
    Object.entries(transform).map(([k, v]) => {
      const newValue = (typeof v === "string" ? v : JSON.stringify(v)).replace(
        /(?<=\s)DATA(?!\w)|(.*@{.*?}.*)/g,
        (_, match) => {
          const key = options.autoInsertContext
            ? `${dataKey}.DATA${dataUid}`
            : dataKey;
          if (match) {
            return (
              "<% " +
              match.replace(/"*@\{(.*?)\}"*/g, (_: string, $1: string) => {
                if ($1.includes("|")) {
                  undealFlag = true;
                  return "";
                }
                return $1 ? `${key}.${$1}` : key;
              }) +
              " %>"
            );
          }
          return key;
        }
      );
      return [k, newValue];
    })
  );
  if (undealFlag) return;
  return result;
}

customElements.define(
  "next-builder.provider-update-bricks",
  createProviderClass(updateRouteOrTemplate)
);
