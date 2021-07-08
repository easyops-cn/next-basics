import { getNameSpaceTree } from "./getNameSpaceTree";

jest.mock("@next-core/brick-kit", () => ({
  getRuntime: () => ({
    registerCustomProcessor: jest.fn(),
  }),
}));

describe("getNameSpaceTree", () => {
  const testCases: [
    {
      topic_vertices: any[];
      vertices: any[];
      edges: any[];
    },
    any
  ][] = [
    [
      {
        topic_vertices: [
          {
            id: "a.b1.c1",
            instanceId: "namespace1",
            _object_id: "FLOW_BUILDER_CONTRACT_NAMESPACE",
          },
          {
            id: "a.b1.c2",
            instanceId: "namespace2",
            _object_id: "FLOW_BUILDER_CONTRACT_NAMESPACE",
          },
          {
            id: "a.b2.c3",
            instanceId: "namespace3",
            _object_id: "FLOW_BUILDER_CONTRACT_NAMESPACE",
          },
          {
            id: "",
            instanceId: "",
          },
        ],
        vertices: [],
        edges: [],
      },
      {
        topic_vertices: [
          {
            id: "a",
            instanceId: "a",
            _object_id: "FLOW_BUILDER_CONTRACT_NAMESPACE",
          },
        ],
        vertices: [
          {
            id: "c1",
            instanceId: "namespace1",
            _object_id: "FLOW_BUILDER_CONTRACT_NAMESPACE",
          },
          {
            id: "c2",
            instanceId: "namespace2",
            _object_id: "FLOW_BUILDER_CONTRACT_NAMESPACE",
          },
          {
            id: "c3",
            instanceId: "namespace3",
            _object_id: "FLOW_BUILDER_CONTRACT_NAMESPACE",
          },
          {
            id: "b1",
            instanceId: "a.b1",
            _object_id: "FLOW_BUILDER_CONTRACT_NAMESPACE",
          },
          {
            id: "b2",
            instanceId: "a.b2",
            _object_id: "FLOW_BUILDER_CONTRACT_NAMESPACE",
          },
        ],
        edges: [
          {
            out: "a",
            in: "a.b1",
            out_name: "children",
            relation_id: "FLOW_BUILDER_CONTRACT_NAMESPACE",
          },
          {
            out: "a.b1",
            in: "namespace1",
            out_name: "children",
            relation_id: "FLOW_BUILDER_CONTRACT_NAMESPACE",
          },
          {
            out: "a.b1",
            in: "namespace2",
            out_name: "children",
            relation_id: "FLOW_BUILDER_CONTRACT_NAMESPACE",
          },
          {
            out: "a",
            in: "a.b2",
            out_name: "children",
            relation_id: "FLOW_BUILDER_CONTRACT_NAMESPACE",
          },
          {
            out: "a.b2",
            in: "namespace3",
            out_name: "children",
            relation_id: "FLOW_BUILDER_CONTRACT_NAMESPACE",
          },
        ],
      },
    ],
  ];
  test.each(testCases)("graphTree(...%j) should return %j", (input, output) => {
    expect(getNameSpaceTree(input)).toEqual(output);
    // console.log(input, "haha",output)
  });
});
