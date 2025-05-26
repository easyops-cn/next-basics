import {
  GetSuiteGraphBasePartCommit,
  GetSuiteGraphBasePartCommitParams,
} from "./GetSuiteGraphBasePartCommit";

describe("GetSuiteGraphBasePartCommit", () => {
  it.each<[GetSuiteGraphBasePartCommitParams, any]>([
    [
      {
        graphData: {
          topic_vertices: [
            {
              flag: null,
              instanceId: "635a094215a51",
              label: "new",
              modifier: "easyops",
              name: "new",

              params: null,
              readAuthorizers: [],
              sort: null,
              type: "suite",
              uuid: "4da23c5257c64bdf9dd0824b3fb69419",
            },
          ],
          vertices: [
            {
              flag: null,
              instanceId: "635a09423df3d",
              label: "new",
              modifier: null,
              mtime: null,
              name: "describe",
              org: 8888,
              params: null,
              sort: 0,
              source: null,
              type: "block",
              uuid: "8c598c5d0fe743ab993da4417a6ec5bb",
            },
            {
              flag: null,
              instanceId: "635a0942610f5",
              label: null,
              modifier: null,
              mtime: null,
              name: "beforeEach",
              params: null,
              sort: 0,
              source: null,
              type: "block",
              uuid: "17d704f47e594a0ab33d7de54b94cae9",
            },
            {
              flag: null,
              instanceId: "635c47c90bd45",
              label: "test",
              modifier: null,
              mtime: null,
              name: "it",
              org: 8888,
              params: null,
              sort: 1,
              source: null,
              type: "block",
              uuid: "eca0c1e82058403b87c55a1a64c78231",
            },
            {
              flag: null,
              instanceId: "635a094273fb1",
              label: null,
              modifier: "easyops",
              mtime: "2025-05-22 15:52:31",
              name: "login",
              org: 8888,
              params: null,
              sort: 1,
              source: null,
              type: "command",
              uuid: "b50ce24b3b6b4a0fb486f691cab82cf4",
            },
            {
              flag: null,
              instanceId: "635a094286a85",
              label: "test",
              modifier: "easyops",
              mtime: "2025-05-22 15:56:12",
              name: "setLanguage",
              params: ["en"],
              sort: 0,
              source: null,
              type: "command",
              uuid: "65ac833a103a48d5a2424d379ff907db",
            },
            {
              flag: null,
              instanceId: "635c47cf0cf05",
              label: null,
              modifier: null,
              mtime: null,
              name: "get",
              params: ["test"],
              sort: 0,
              source: null,
              type: "command",
              uuid: "5f2b7427d3b946d8a627887aef1bb7cc",
            },
          ],
          edges: [
            {
              out: "635a094215a51",
              in: "635a09423df3d",
              out_name: "children",
              properties: null,
            },
            {
              out: "635a09423df3d",
              in: "635a0942610f5",
              out_name: "children",
              properties: null,
            },
            {
              out: "635a09423df3d",
              in: "635c47c90bd45",
              out_name: "children",
              properties: null,
            },
            {
              out: "635a0942610f5",
              in: "635a094273fb1",
              out_name: "children",
              properties: null,
            },
            {
              out: "635a0942610f5",
              in: "635a094286a85",
              out_name: "children",
              properties: null,
            },
            {
              out: "635c47c90bd45",
              in: "635c47cf0cf05",
              out_name: "children",
              properties: null,
            },
          ],
        },
        diffs: {
          category: "ui_test",
          root: [
            {
              id: "4da23c5257c64bdf9dd0824b3fb69419",
              modifyInfo: [],
              actions: [
                {
                  action: "modify",
                  originRootInstanceId: "",
                  curRootInstanceId: "",
                },
              ],
              dataOfId: "",
              changeDetail: [
                {
                  operation: "delete",
                  content:
                    '{"_object_id":"UI_TEST_NODE@EASYOPS","ctime":"2025-05-21 15:47:36","flag":null,"label":"new","name":"new","params":null,"sort":null,"source":null,"type":"suite","uuid":"4da23c5257c64bdf9dd0824b3fb69419"}',
                },
                {
                  operation: "insert",
                  content:
                    '{"_object_id":"UI_TEST_NODE@EASYOPS","ctime":"2025-05-21 15:47:36","flag":null,"label":"new","name":"new","params":null,"sort":null,"source":"describe(\\"new\\",()=>{beforeEach(()=>{cy.setLanguage(\\"en\\");cy.login();});it(\\"test\\",()=>{cy.get(\\"test\\");});});","type":"suite","uuid":"4da23c5257c64bdf9dd0824b3fb69419"}',
                },
              ],
              children: [
                {
                  id: "8c598c5d0fe743ab993da4417a6ec5bb",
                  modifyInfo: [],
                  actions: [],
                  dataOfId:
                    '{"_object_id":"UI_TEST_NODE@EASYOPS","ctime":"2025-05-21 15:47:36","flag":null,"label":"new","name":"describe","params":null,"sort":0,"source":null,"type":"block","uuid":"8c598c5d0fe743ab993da4417a6ec5bb"}',
                  changeDetail: [],
                  children: [
                    {
                      id: "eca0c1e82058403b87c55a1a64c78231",
                      modifyInfo: [],
                      actions: [
                        {
                          action: "add",
                          originRootInstanceId: "",
                          curRootInstanceId: "",
                        },
                      ],
                      dataOfId: "",
                      changeDetail: [
                        {
                          operation: "insert",
                          content:
                            '{"_object_id":"UI_TEST_NODE@EASYOPS","ctime":"2025-05-23 10:37:59","flag":null,"label":"test","name":"it","params":null,"sort":1,"source":null,"type":"block","uuid":"eca0c1e82058403b87c55a1a64c78231"}',
                        },
                      ],
                      children: [
                        {
                          id: "5f2b7427d3b946d8a627887aef1bb7cc",
                          modifyInfo: [],
                          actions: [
                            {
                              action: "add",
                              originRootInstanceId: "",
                              curRootInstanceId: "",
                            },
                          ],
                          dataOfId: "",
                          changeDetail: [
                            {
                              operation: "insert",
                              content:
                                '{"_object_id":"UI_TEST_NODE@EASYOPS","ctime":"2025-05-23 10:38:06","flag":null,"label":null,"name":"get","params":["test"],"sort":0,"source":null,"type":"command","uuid":"5f2b7427d3b946d8a627887aef1bb7cc"}',
                            },
                          ],
                          children: [],
                        },
                      ],
                    },
                    {
                      id: "84a67c4993ff4fb58abab31d41c714e2",
                      modifyInfo: [],
                      actions: [
                        {
                          action: "delete",
                          originRootInstanceId: "",
                          curRootInstanceId: "",
                        },
                      ],
                      dataOfId: "",
                      changeDetail: [
                        {
                          operation: "delete",
                          content:
                            '{"_object_id":"UI_TEST_NODE@EASYOPS","ctime":"2025-05-22 15:53:46","flag":null,"label":"ss","name":"it","params":null,"sort":1,"source":null,"type":"block","uuid":"84a67c4993ff4fb58abab31d41c714e2"}',
                        },
                      ],
                      children: [
                        {
                          id: "c7b644d17dcf4a229735b301625456fe",
                          modifyInfo: [],
                          actions: [
                            {
                              action: "delete",
                              originRootInstanceId: "",
                              curRootInstanceId: "",
                            },
                          ],
                          dataOfId: "",
                          changeDetail: [
                            {
                              operation: "delete",
                              content:
                                '{"_object_id":"UI_TEST_NODE@EASYOPS","ctime":"2025-05-22 19:16:26","flag":null,"label":null,"name":"contains","params":["test"],"sort":1,"source":null,"type":"command","uuid":"c7b644d17dcf4a229735b301625456fe"}',
                            },
                          ],
                          children: [
                            {
                              id: "9030ac3f350e4a64a1f95fe98622a9f7",
                              modifyInfo: [],
                              actions: [
                                {
                                  action: "delete",
                                  originRootInstanceId: "",
                                  curRootInstanceId: "",
                                },
                              ],
                              dataOfId: "",
                              changeDetail: [
                                {
                                  operation: "delete",
                                  content:
                                    '{"_object_id":"UI_TEST_NODE@EASYOPS","ctime":"2025-05-22 19:17:29","flag":null,"label":null,"name":"click","params":[],"sort":0,"source":null,"type":"command","uuid":"9030ac3f350e4a64a1f95fe98622a9f7"}',
                                },
                              ],
                              children: [],
                            },
                          ],
                        },
                        {
                          id: "c15d170202304112aade70c836f15725",
                          modifyInfo: [],
                          actions: [
                            {
                              action: "delete",
                              originRootInstanceId: "",
                              curRootInstanceId: "",
                            },
                          ],
                          dataOfId: "",
                          changeDetail: [
                            {
                              operation: "delete",
                              content:
                                '{"_object_id":"UI_TEST_NODE@EASYOPS","ctime":"2025-05-22 15:55:32","flag":null,"label":null,"name":"get","params":["test"],"sort":0,"source":null,"type":"command","uuid":"c15d170202304112aade70c836f15725"}',
                            },
                          ],
                          children: [
                            {
                              id: "40f7f136fcca4c76925999aaa5ce7b0c",
                              modifyInfo: [],
                              actions: [
                                {
                                  action: "delete",
                                  originRootInstanceId: "",
                                  curRootInstanceId: "",
                                },
                              ],
                              dataOfId: "",
                              changeDetail: [
                                {
                                  operation: "delete",
                                  content:
                                    '{"_object_id":"UI_TEST_NODE@EASYOPS","ctime":"2025-05-22 15:55:46","flag":null,"label":null,"name":"click","params":[],"sort":0,"source":null,"type":"command","uuid":"40f7f136fcca4c76925999aaa5ce7b0c"}',
                                },
                              ],
                              children: [],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        selectedDiffs: [
          "9030ac3f350e4a64a1f95fe98622a9f7",
          "c7b644d17dcf4a229735b301625456fe",
          "40f7f136fcca4c76925999aaa5ce7b0c",
          "c15d170202304112aade70c836f15725",
          "84a67c4993ff4fb58abab31d41c714e2",
        ],
      },
      {
        topic_vertices: [
          {
            _object_id: "UI_TEST_NODE@EASYOPS",
            ctime: "2025-05-21 15:47:36",
            flag: null,
            label: "new",
            name: "new",
            params: null,
            sort: null,
            source: null,
            type: "suite",
            uuid: "4da23c5257c64bdf9dd0824b3fb69419",
          },
        ],
        vertices: [
          {
            flag: null,
            instanceId: "635a09423df3d",
            label: "new",
            modifier: null,
            mtime: null,
            name: "describe",
            org: 8888,
            params: null,
            sort: 0,
            source: null,
            type: "block",
            uuid: "8c598c5d0fe743ab993da4417a6ec5bb",
          },
          {
            flag: null,
            instanceId: "635a0942610f5",
            label: null,
            modifier: null,
            mtime: null,
            name: "beforeEach",
            params: null,
            sort: 0,
            source: null,
            type: "block",
            uuid: "17d704f47e594a0ab33d7de54b94cae9",
          },
          {
            flag: null,
            instanceId: "635a094273fb1",
            label: null,
            modifier: "easyops",
            mtime: "2025-05-22 15:52:31",
            name: "login",
            org: 8888,
            params: null,
            sort: 1,
            source: null,
            type: "command",
            uuid: "b50ce24b3b6b4a0fb486f691cab82cf4",
          },
          {
            flag: null,
            instanceId: "635a094286a85",
            label: "test",
            modifier: "easyops",
            mtime: "2025-05-22 15:56:12",
            name: "setLanguage",
            params: ["en"],
            sort: 0,
            source: null,
            type: "command",
            uuid: "65ac833a103a48d5a2424d379ff907db",
          },
        ],
        edges: [
          {
            out: "4da23c5257c64bdf9dd0824b3fb69419",
            in: "8c598c5d0fe743ab993da4417a6ec5bb",
            out_name: "children",
            properties: null,
          },
          {
            out: "8c598c5d0fe743ab993da4417a6ec5bb",
            in: "17d704f47e594a0ab33d7de54b94cae9",
            out_name: "children",
            properties: null,
          },
          {
            out: "17d704f47e594a0ab33d7de54b94cae9",
            in: "b50ce24b3b6b4a0fb486f691cab82cf4",
            out_name: "children",
            properties: null,
          },
          {
            out: "17d704f47e594a0ab33d7de54b94cae9",
            in: "65ac833a103a48d5a2424d379ff907db",
            out_name: "children",
            properties: null,
          },
        ],
      },
    ],
  ])("GetSuiteGraphBasePartCommit(%j) should work", async (params, result) => {
    expect(await GetSuiteGraphBasePartCommit(params)).toEqual(result);
  });
});
