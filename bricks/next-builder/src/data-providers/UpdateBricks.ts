import {
  BrickLifeCycle,
  ContextConf,
  CustomTemplateProxy,
  CustomTemplateProxyBasicProperty,
  CustomTemplateProxyRefProperty,
  CustomTemplateProxyTransformableProperty,
  CustomTemplateProxyVariableProperty,
  SelectorProviderResolveConf,
  UseProviderResolveConf,
} from "@next-core/brick-types";
import { Identifier } from "@babel/types";
import {
  PreevaluateResult,
  createProviderClass,
  isEvaluable,
  isObject,
  preevaluate,
} from "@next-core/brick-utils";
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

interface UpdateOptions {
  updateProxy?: boolean;
  updateUseResolves?: boolean;
  updateUseBrickTransform?: boolean;
  updateChildContext?: boolean;
}

let dataUid = 0;
export function updateRouteOrTemplate(
  route: Array<NodeDetail>,
  options: UpdateOptions
) {
  dataUid = 0;
  const rootNode = route[0];
  const isRoute = rootNode["_object_id"] === "STORYBOARD_ROUTE";
  const list: Array<NodeDetail> = [];
  let contextList: ContextConf[] = [];
  let refProxy: Record<string, any> = {};

  if (!isRoute && options?.updateProxy) {
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

      if (options?.updateUseResolves) {
        const resolves = updateUseResolves(node, isRoute ? "CTX" : "STATE");
        if (resolves) {
          const { lifeCycle, context, properties } = resolves;
          mergeProperty(properties, {}, lifeCycle);
          contextList = contextList.concat(context);
        }
      }

      if (options?.updateUseBrickTransform) {
        const useBrickTransfromData = replaceUseBrickTransform(node);
        mergeProperty(
          useBrickTransfromData.properties,
          useBrickTransfromData.events,
          useBrickTransfromData.lifeCycle
        );
      }

      if (options.updateChildContext && node.context && node.context.length) {
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
      context: contextList.concat(rootNode.context ?? []),
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
            ...replace(refTransform as Record<string, any>, {
              dataKey: "STATE",
              isTrack: true,
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

  let properties: Record<string, any> = node.properties
    ? JSON.parse(node.properties)
    : {};
  if (useResolves?.length) {
    useResolves.forEach((item) => {
      const useProvider =
        (item as UseProviderResolveConf).useProvider ||
        (item as SelectorProviderResolveConf).provider;
      if (useProvider) {
        const key = `${dataKey}.data_${dataUid}`;
        if (typeof item.transform === "string") {
          Object.assign(properties, {
            [item.transform]: `<% ${key} %>`,
          });
        } else if (
          Object.prototype.toString.call(item.transform) === "[object Object]"
        ) {
          properties = Object.assign(
            properties,
            replace(item.transform, {
              dataKey: key,
              isTrack: false,
            })
          );
        } else if (Array.isArray(item.transform)) {
          undealFlag = true;
          return;
        }
        context.push({
          name: `data_${dataUid}`,
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

export function replaceInjectOrTranformRawToEvaluteRaw(
  raw: string,
  dataKey = "DATA"
): string {
  if (!isEvaluable(raw) && /[@|$]{(.*?)}/g.test(raw)) {
    return raw.replace(/[@|$]{(.*?)}/g, (match, $1) => {
      let word = $1;
      if (/@{.*}/.test(match)) {
        word = $1 ? `${dataKey}.${$1}` : dataKey;
      }
      if (word && (word as string).includes("|")) {
        const waitTransformArray = word
          .split("|")
          .map((item: string) => item.trim())
          .reverse();
        word = waitTransformArray
          .map((item: string, index: number) => {
            if (index === waitTransformArray.length - 1) {
              return item.replace("=", "??");
            }
            return `PIPES.${item}`;
          })
          .reduce((a: string, b: string, index: number) => {
            if (index === waitTransformArray.length - 1) {
              let i = 0;
              let suffix = "";
              while (i < waitTransformArray.length - 1) {
                i++;
                suffix += ")";
              }
              return `${a}${b}${suffix}`;
            }
            return `${a}${b}(`;
          }, "");
      }
      return `<% ${word} %>`;
    });
  }
  return raw;
}

export function replace<T>(
  value: T,
  options = {
    dataKey: "DATA",
    isTrack: false,
  }
): T {
  if (typeof value === "string") {
    let transformValue = replaceInjectOrTranformRawToEvaluteRaw(
      value,
      options.dataKey
    );

    if (isEvaluable(transformValue)) {
      const replacements: Identifier[] = [];
      const patterns = new Map<string, string>([["TPL", `STATE`]]);
      options.dataKey && patterns.set("DATA", options.dataKey);
      let result: PreevaluateResult;
      try {
        result = preevaluate(transformValue, {
          hooks: {
            beforeVisitGlobal(node) {
              if (patterns.has(node.name)) {
                replacements.push(node);
              }
            },
          },
        });
      } catch (e) {
        const message = `${e.message}, in "${transformValue}"`;
        // eslint-disable-next-line no-console
        console.log(message);
      }
      if (replacements.length > 0) {
        const { prefix, source, suffix } = result;
        const chunks: string[] = [];
        let prevStart = 0;
        for (let i = 0; i < replacements.length; i++) {
          const { name, start, end } = replacements[i];
          chunks.push(source.substring(prevStart, start), patterns.get(name));
          prevStart = end;
        }
        chunks.push(source.substring(prevStart));
        transformValue = `${prefix}${chunks.join("")}${suffix}` as T & string;
      }
    }
    transformValue = options.isTrack
      ? transformValue.replace(/<%(.*)%>/, (match, $1) => {
          if ($1.trim().startsWith("track")) return match;
          return `<% "track state",${$1}%>`;
        })
      : transformValue;
    return transformValue as T & string;
  }

  if (Array.isArray(value)) {
    return value.map((item) => replace(item, options)) as T & unknown[];
  }

  if (isObject(value)) {
    return Object.fromEntries(
      Object.entries(value).map(([k, v]) => [k, replace(v, options)])
    ) as T & Record<string, unknown>;
  }

  return value;
}

export function updateTemplateRefAndAsVarible(
  node: NodeDetail,
  refProxy: Record<string, any>
): Record<string, any> | void {
  if (refProxy[node.ref]) {
    return {
      properties: replace(
        Object.assign(JSON.parse(node.properties ?? "{}"), {
          ...refProxy[node.ref],
        })
      ),
      events: replace(JSON.parse(node.events ?? "{}")),
      lifeCycle: replace(JSON.parse(node.lifeCycle ?? "{}")),
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
    item.properties = replace(
      Object.assign(item?.properties ?? {}, item.transform)
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

customElements.define(
  "next-builder.provider-update-bricks",
  createProviderClass(updateRouteOrTemplate)
);
