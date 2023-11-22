import {
  find,
  forEach,
  get,
  groupBy,
  isEmpty,
  keyBy,
  map,
  orderBy,
  uniq,
} from "lodash";
import { pipes } from "@next-core/brick-utils";
import {
  GitApi_CodeDiffResponseBody_diffs_item,
  NextBuilderModels,
} from "@next-sdk/next-builder-sdk";

type ModelGitDiffTree = Partial<NextBuilderModels.ModelGitDiffTree>;

function walkTree(
  data: ModelGitDiffTree[] | ModelGitDiffTree,
  parent: ModelGitDiffTree | undefined,
  callback: (
    data: ModelGitDiffTree,
    parent: ModelGitDiffTree | undefined
  ) => void
): void {
  if (!data) return;
  if (Array.isArray(data)) {
    data.forEach((item) => {
      callback(item, parent);
      item.children && walkTree(item.children, item, callback);
    });
  } else {
    callback(data, parent);
    data.children && walkTree(data.children, data, callback);
  }
}

/**
 * add: dataOfId 为空，insert.change 存最新值
 * modify：dataOfId 为空，insert.change 存最新值 delete.change 存旧值
 * delete dataOfId 为空，delete.change 存旧值
 * move：dataOfId 存当前值
 */
function getPreviousNodeData(node: ModelGitDiffTree): pipes.GraphVertex {
  const deleteChange = node.changeDetail.find(
    (change) => change.operation === "delete"
  );
  if (deleteChange) {
    return JSON.parse(deleteChange.content || "null");
  }
  return JSON.parse(node.dataOfId || "null");
}

export function processGraphDataWithDiff(
  graphData: pipes.GraphData,
  diffItem: GitApi_CodeDiffResponseBody_diffs_item,
  selectedDiffSet: Set<string>
): pipes.GraphData {
  // diffTree use uuid instead of instanceId
  const verticesMap = keyBy(
    [...graphData.topic_vertices, ...graphData.vertices],
    "instanceId"
  );
  const edgesWithUuid = graphData.edges.map((e) => {
    return {
      ...e,
      out: verticesMap[e.out].uuid,
      in: verticesMap[e.in].uuid,
    };
  });

  const removedTopicVertices: string[] = [];
  const addedTopicVertices: pipes.GraphVertex[] = [];
  const modifiedTopicVertices: pipes.GraphVertex[] = [];
  const removedVertices: string[] = [];
  const addedVertices: pipes.GraphVertex[] = [];
  const modifiedVertices: pipes.GraphVertex[] = [];
  const removedEdges: pipes.GraphEdge[] = [];
  const addedEdges: pipes.GraphEdge[] = [];
  const modifiedEdges: [pipes.GraphEdge, pipes.GraphEdge][] = [];

  walkTree(diffItem?.root, null, (node, parent) => {
    if (node.actions.length && !selectedDiffSet.has(node.id)) {
      let actionType: "add" | "modify" | "delete" | "move" | "moveAndModify";
      if (node.actions.length === 1) {
        if (node.actions[0].action === "add") {
          actionType = "add";
        } else if (node.actions[0].action === "modify") {
          actionType = "modify";
        } else if (node.actions[0].action === "delete") {
          actionType = "delete";
        } else if (
          node.actions[0].action === "move" &&
          node.actions[0].curRootInstanceId === (parent?.id || "")
        ) {
          // 移入和移出必须同时选择，这里只处理移入的即可
          actionType = "move";
        }
      } else if (node.actions.length === 2) {
        const moveAction = node.actions.find((ac) => ac.action === "move");
        const modifyAction = node.actions.find((ac) => ac.action === "modify");
        if (
          moveAction &&
          modifyAction &&
          moveAction.curRootInstanceId === (parent?.id || "")
        ) {
          actionType = "moveAndModify";
        }
      }

      // cmdb 是最新的，对于没有选择的更改，要进行逆操作
      switch (actionType) {
        case "add": {
          // 没有选择的要删掉
          if (!parent) {
            // 删掉 topic_vertices
            removedTopicVertices.push(node.id);
          } else {
            // 删掉 vertices 和 edges
            removedVertices.push(node.id);
            removedEdges.push({
              out: parent.id,
              in: node.id,
              out_name: "children",
            });
          }
          break;
        }
        case "modify": {
          // 没有选择的要改回去
          if (!parent) {
            // 改 topic_vertices
            modifiedTopicVertices.push(getPreviousNodeData(node));
          } else {
            // 改 vertices
            modifiedVertices.push(getPreviousNodeData(node));
          }
          break;
        }
        case "delete": {
          // 没有选择的要加回去
          if (!parent) {
            // 加 topic_vertices
            addedTopicVertices.push(getPreviousNodeData(node));
          } else {
            // 加 vertices 和 edges
            addedVertices.push(getPreviousNodeData(node));
            addedEdges.push({
              out: parent.id,
              in: node.id,
              out_name: "children",
            });
          }
          break;
        }
        case "move":
        case "moveAndModify": {
          // 没有选择的要移回原位
          const moveAction = node.actions.find((ac) => ac.action === "move");
          if (moveAction.curRootInstanceId && moveAction.originRootInstanceId) {
            // 内部移动，只需要改 edges
            modifiedEdges.push([
              {
                out: moveAction.curRootInstanceId,
                in: node.id,
                out_name: "children",
              },
              {
                out: moveAction.originRootInstanceId,
                in: node.id,
                out_name: "children",
              },
            ]);
            if (actionType === "moveAndModify") {
              modifiedVertices.push(getPreviousNodeData(node));
            }
          }
          if (
            !moveAction.curRootInstanceId &&
            moveAction.originRootInstanceId
          ) {
            // 原操作为移动到根，需要改 edges 且删 topic_vertices 和加 vertices
            modifiedEdges.push([
              {
                out: moveAction.curRootInstanceId,
                in: node.id,
                out_name: "children",
              },
              {
                out: moveAction.originRootInstanceId,
                in: node.id,
                out_name: "children",
              },
            ]);
            removedTopicVertices.push(node.id);
            addedVertices.push(getPreviousNodeData(node));
          }
          if (
            moveAction.curRootInstanceId &&
            !moveAction.originRootInstanceId
          ) {
            // 原操作为从根移到内部，需要改 edges 且删 vertices 和加 topic_vertices
            modifiedEdges.push([
              {
                out: moveAction.curRootInstanceId,
                in: node.id,
                out_name: "children",
              },
              {
                out: moveAction.originRootInstanceId,
                in: node.id,
                out_name: "children",
              },
            ]);
            removedVertices.push(node.id);
            addedTopicVertices.push(getPreviousNodeData(node));
          }
          break;
        }
      }
    }
  });

  const removedTopicVerticesSet = new Set(removedTopicVertices);
  const modifiedTopicVerticesMap = keyBy(modifiedTopicVertices, "uuid");
  const topic_vertices = graphData.topic_vertices.reduce((pre, cur) => {
    if (removedTopicVerticesSet.has(cur.uuid)) {
      return pre;
    }
    const modified = modifiedTopicVerticesMap[cur.uuid];
    if (modified) {
      return [...pre, modified];
    }
    return [...pre, cur];
  }, addedTopicVertices);

  const removedVerticesSet = new Set(removedVertices);
  const modifiedVerticesMap = keyBy(modifiedVertices, "uuid");
  const vertices = graphData.vertices.reduce((pre, cur) => {
    if (removedVerticesSet.has(cur.uuid)) {
      return pre;
    }
    const modified = modifiedVerticesMap[cur.uuid];
    if (modified) {
      return [...pre, modified];
    }
    return [...pre, cur];
  }, addedVertices);

  const edges = edgesWithUuid.reduce((pre, cur) => {
    if (removedEdges.find((v) => v.out === cur.out && v.in === cur.in)) {
      return pre;
    }
    const modified = modifiedEdges.find(
      (v) => v[0].out === cur.out && v[0].in === cur.in
    );
    if (modified) {
      return [...pre, modified[1]];
    }
    return [...pre, cur];
  }, addedEdges);

  return { topic_vertices, vertices, edges };
}

export function processFlattenDataWithDiff(
  list: Record<string, any>[],
  diffItem: GitApi_CodeDiffResponseBody_diffs_item,
  selectedDiffSet: Set<string>
): Record<string, any>[] {
  const addedList: Record<string, any>[] = [];
  const modifiedList: Record<string, any>[] = [];
  const removedList: string[] = [];

  diffItem?.root?.map((node) => {
    if (node.actions.length && !selectedDiffSet.has(node.id)) {
      node.actions.forEach((ac) => {
        switch (ac.action) {
          case "add": {
            removedList.push(node.id);
            break;
          }
          case "modify": {
            modifiedList.push(getPreviousNodeData(node));
            break;
          }
          case "delete": {
            addedList.push(getPreviousNodeData(node));
            break;
          }
        }
      });
    }
  });

  const removedListSet = new Set(removedList);
  const modifiedListMap = keyBy(modifiedList, "uuid");
  return list.reduce<Record<string, any>[]>((pre, cur) => {
    if (removedListSet.has(cur.uuid)) {
      return pre;
    }
    const modified = modifiedListMap[cur.uuid];
    if (modified) {
      return [...pre, modified];
    }
    return [...pre, cur];
  }, addedList);
}

interface Sort {
  key: string;
  order: 1 | -1;
}

export function graphTree(
  value: pipes.GraphData,
  query?: {
    sort?: Sort | Sort[];
  }
): pipes.GraphVertex[] {
  if (!value) {
    return [];
  }
  const sort = [].concat(query?.sort || []);
  const groupByEdgeOut = groupBy(value.edges, "out");
  const findChildren = (node: pipes.GraphVertex): pipes.GraphVertex => {
    const relationEdges = groupByEdgeOut[node.uuid];
    forEach(relationEdges, (edge) => {
      const key = edge.out_name;
      const foundInstance = find(value.vertices, ["uuid", edge.in]);
      if (foundInstance) {
        const resultInstance = findChildren(foundInstance);
        if (node[key]) {
          node[key].push(resultInstance);
        } else {
          node[key] = [resultInstance];
        }
      }
    });
    if (sort.length) {
      const keyList = uniq(map(relationEdges, "out_name"));
      forEach(keyList, (key) => {
        if (!isEmpty(node[key])) {
          node[key] = orderBy(
            node[key],
            sort.map((s) => (item) => get(item, s.key) ?? -Infinity),
            sort.map((s) => (s.order === -1 ? "desc" : "asc"))
          );
        }
      });
    }
    return node;
  };
  const result =
    value.topic_vertices?.map((root) => {
      return findChildren(root);
    }) ?? [];
  if (sort.length) {
    return orderBy(
      result,
      sort.map((s) => (item) => get(item, s.key) ?? -Infinity),
      sort.map((s) => (s.order === -1 ? "desc" : "asc"))
    );
  }
  return result;
}
